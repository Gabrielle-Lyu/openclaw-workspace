# Response Time Investigation & Optimization Analysis

**Date:** 2026-02-21  
**Source:** human-request  
**Original Request:** Investigate slow response times. Performance test reports are available in `openclaw-vault/20 - Knowledge/make-openclaw-better/`. Analyze findings and provide actionable optimization strategies.

---

## Research Summary

I reviewed the comprehensive latency benchmark conducted on 2026-02-20, which measured time-to-first-token (TTFT) and total response time across multiple scenarios. The testing methodology was rigorous: isolated model-only runs, main agent with memory, and web tool integration, with detailed step-by-step traces showing exactly where time was spent.

The headline finding: **LLM inference time is the dominant bottleneck, accounting for 60-100% of total latency**. But the deeper insight is more nuanced: the *number of LLM inference rounds* matters more than individual call speed. A simple "Reply with OK" takes 2.4s (single LLM turn). A "Summarize notes" query takes 25.8s (4 LLM turns). The multi-turn tool loop creates latency multiplication.

What the benchmark revealed that surprised me: **context build time is negligible** (13-54ms). QMD memory search itself is fast (~388ms standalone, ~564ms in-agent). File I/O is cheap (10-40ms per read). The real cost is architectural: every tool call forces another LLM inference pass, adding 2-12 seconds per round-trip. The AGENTS.md startup instructions create unavoidable multi-turn sequences that multiply latency.

The most actionable finding: **consolidating tool calls into fewer rounds** would have 3-5× latency impact. Example: P3 "Summarize notes" took 25.8s with 4 LLM turns and 7 tool calls. If those 7 tool calls happened in a single batch (1 turn instead of 3), estimated time would be ~8-12s - a 50-60% reduction.

---

## Key Insights

### Root Causes of Slow Response Times

1. **Multi-turn tool loops are the primary driver** (not single-call latency)
   - Simple query (P1): 2.4s, 100% LLM time
   - Memory query (P2): 6.7s, 91% LLM time (2 turns: decide → search → answer)
   - Complex query (P3): 25.8s, 99% LLM time (4 turns: multiple exec/read cycles)
   - Tool I/O itself was only 161ms on P3 - the other 25.6s was inference

2. **AGENTS.md startup instructions create unavoidable turns**
   - Current: User message → LLM decides to read files → exec/read tools → LLM processes results → final answer
   - Each tool decision adds a full inference round (2-12s depending on context size)
   - Example: af7f167f trace shows 4 turns just to read journal files and respond

3. **Claude Sonnet 4.5 base latency is irreducible** (2-12s per turn)
   - This is model inference time, not OpenClaw overhead
   - Varies with output length and context size
   - Cannot be optimized without changing models

4. **QMD memory_search is fast but adds a turn**
   - Standalone: ~388ms (consistent across 20 runs)
   - In-agent: ~564ms (+176ms subprocess overhead)
   - But it forces an extra LLM round-trip: +2-7s total impact
   - Contribution: 8% of raw time, but 50% of turn count on memory queries

5. **Tool execution time is secondary** (except `crawl_doc`)
   - File reads: 10-40ms each
   - exec commands: 13-43ms typical
   - memory_search: 564ms
   - crawl_doc: **9-10 seconds** (network-bound, can't optimize)

6. **Context build is not the problem**
   - 13-54ms across all scenarios
   - QMD doesn't pre-inject during prompt assembly
   - The gateway setup phase is essentially free

### Latency Attribution (Ranked by Impact)

| Rank | Source | Magnitude | Scope |
|------|--------|-----------|-------|
| 1 | **Multi-turn LLM loops** (AGENTS.md forces file reads → extra turns) | +8-20s on real sessions | Every non-trivial message |
| 2 | **Claude Sonnet 4.5 base inference speed** | 2-12s per turn (irreducible) | Every message |
| 3 | **crawl_doc network I/O** | +9-10s per call | Only when explicitly invoked |
| 4 | **QMD memory_search tool** | +564ms tool time + 2-7s extra turn | Only on memory-probe prompts |
| 5 | **Context build / file reads** | 13-54ms total | Negligible |

---

## Practical Solutions

### High-Impact Optimizations (50-70% latency reduction potential)

#### 1. Collapse multi-step tool loops into single-step execution

**Problem:** Current flow requires multiple LLM decision points
```
User: "Summarize last 2 days"
→ LLM Turn 1: "I need to find journal files" → exec
→ LLM Turn 2: "Now I'll read them" → 5× read calls
→ LLM Turn 3: "Now I can summarize" → writes answer
```

**Solution A: Pre-compute journal paths**
- AGENTS.md knows journal location: `~/openclaw-vault/10 - Journal/Daily/YYYY-MM-DD.md`
- Don't use `exec` to discover paths - derive them from date arithmetic
- Reduces 4 turns → 2 turns

**Solution B: Batch tool calls**
- Replace 5 sequential `read` calls with `read_many([path1, path2, ...])`
- Model makes one tool decision instead of five
- Reduces 4 turns → 2 turns

**Solution C: Pre-fetch common context**
- On session start, load SOUL.md, USER.md, today's journal into memory
- Skip tool calls for these files on subsequent turns
- Reduces multi-turn sequences by eliminating repeated reads

**Estimated impact:** 40-60% latency reduction on complex queries (25s → 10-15s)

#### 2. Pre-inject memory retrieval (eliminate memory_search tool call)

**Current flow:**
```
User: "What's my favorite GPU?"
→ LLM Turn 1: "I need to search memory" → memory_search tool (564ms)
→ LLM Turn 2: "The answer is..." (2-4s)
Total: 6.7s
```

**Target flow:**
```
User: "What's my favorite GPU?"
[Gateway runs QMD search before LLM call, injects results into system prompt]
→ LLM Turn 1: "The answer is..." (2-4s)
Total: 2.4-4s (40-60% faster)
```

**Implementation:**
- Gateway intercepts message
- Runs QMD semantic search (`qmd search <vault> "<message>"`)
- Injects top 3-5 snippets into system prompt
- Model sees memory context immediately, no tool call needed

**Estimated impact:** 30-50% latency reduction on memory-related queries

#### 3. Implement turn budgets to prevent spiral

**Problem:** Some queries trigger 6-9 turn loops (5854ada9, c0f0ec4b)

**Solution:** Add policy to AGENTS.md
```
"If a task requires more than 2 tool rounds, stop and ask the user for clarification or answer best-effort with available context."
```

**Prevents:** 9-turn spirals that take 30-55s
**Estimated impact:** Caps worst-case latency at ~15-20s

### Medium-Impact Optimizations (20-40% improvement)

#### 4. Model cascading for simple queries

**Problem:** "Reply with OK" takes 2.4s on Sonnet (overkill for trivial response)

**Solution:** Route simple messages to Haiku
- Haiku latency: ~0.5-1.5s (4-5× faster than Sonnet)
- Use heuristics: message length <20 chars, no memory needed, no complex reasoning

**Classifier logic:**
```python
if len(message) < 20 and no_question_marks and not requires_memory:
    model = "claude-haiku-4"
else:
    model = "claude-sonnet-4-5"
```

**Estimated impact:** 60-80% faster on trivial interactions (2.4s → 0.5-1s)

#### 5. Cache common system prompt components

**Problem:** AGENTS.md, SOUL.md, TOOLS.md sent on every request (~5-10K tokens)

**Solution:** Use Anthropic's prompt caching
- Mark static content as cacheable prefix
- First call: full cost
- Subsequent calls: ~90% discount on cached tokens

**Implementation:**
```json
{
  "system": [
    {"type": "text", "text": "<AGENTS.md content>", "cache_control": {"type": "ephemeral"}},
    {"type": "text", "text": "<dynamic context>"}
  ]
}
```

**Estimated impact:** 40-60% token cost reduction on input (also slight latency improvement)

### Low-Impact Optimizations (10-20% improvement)

#### 6. Parallelize independent tool calls

**Current:** Sequential execution of tool calls
```
read file1 (12ms) → wait → read file2 (10ms) → wait → read file3 (11ms)
Total: 33ms
```

**Target:** Parallel execution
```
[read file1, read file2, read file3] in parallel
Total: ~12ms (max of all)
```

**Note:** Savings are small (20-30ms) but it's free if tool framework supports it

#### 7. QMD index optimization (future-proofing)

**Current state:** 177 chunks, ~388ms search time
**Projected:** At 2,000+ chunks, may degrade to 1-2s

**Solution (when needed):**
- Implement chunk pruning (archive old memories)
- Add QMD index partitioning (recent vs historical)
- Consider approximate search for speed

**Estimated impact:** Keeps memory search <500ms as vault grows

---

## Benchmarking Methodology Review

The test design was excellent - isolated variables cleanly:

**Strengths:**
- ✅ Controlled scenarios (S0 minimal, S1+S2 memory, S3 tools)
- ✅ Standardized prompts (P1 trivial, P2 memory, P3 complex)
- ✅ Standalone QMD benchmarking (proved 388ms is the true cost)
- ✅ Step-by-step trace reconstruction (showed turn-by-turn breakdown)

**Limitations:**
- ⚠️ LLM turns are *inferred* from log gaps, not directly measured (reasonable given gateway logging)
- ⚠️ Turn count could be off by ±1 sometimes due to silent gaps in logs
- ⚠️ Model variance not tested (all runs on same model/settings)

**Recommendation for future testing:**
- Add explicit `llm_request_start`, `llm_first_token`, `llm_request_end` markers to gateway logs
- Test with different models (Haiku, Sonnet, Opus) to quantify model-switching impact
- Measure impact of proposed optimizations (before/after comparison)

---

## Implementation Roadmap

**Phase 1: Quick Wins (1-2 weeks)**
1. Pre-inject memory (gateway-level QMD search before LLM call)
2. Batch file reads (replace sequential reads with single multi-file call)
3. Enable prompt caching (Anthropic API parameter change)

**Estimated combined impact:** 40-60% faster on typical queries

**Phase 2: Architectural Changes (2-4 weeks)**
1. Pre-compute journal paths (eliminate exec calls for file discovery)
2. Implement turn budgets in AGENTS.md
3. Add model cascading logic (Haiku for simple, Sonnet for complex)

**Estimated combined impact:** 50-70% faster overall, caps worst-case latency

**Phase 3: Advanced Optimizations (future)**
1. Parallel tool execution (requires tool framework updates)
2. QMD index optimization (only needed when vault grows >1,000 chunks)
3. Gateway logging enhancements (explicit LLM turn markers)

---

## Cost-Benefit Analysis

| Optimization | Dev Effort | Latency Improvement | Token Savings | Priority |
|--------------|------------|---------------------|---------------|----------|
| Pre-inject memory | Low | 30-50% on memory queries | 10-15% | **HIGH** |
| Batch file reads | Low | 40-60% on complex queries | 5-10% | **HIGH** |
| Prompt caching | Trivial | 5-10% | 40-60% | **HIGH** |
| Pre-compute paths | Low | 20-30% on journal queries | 5-10% | **HIGH** |
| Turn budgets | Low | Caps worst-case | Moderate | **MEDIUM** |
| Model cascading | Medium | 60-80% on simple queries | 30-50% on simple | **MEDIUM** |
| Parallel tools | Medium | 10-20% | None | **LOW** |

**Recommendation:** Focus on Phase 1 (pre-inject, batch, caching) - highest ROI, lowest effort.

---

## Sources

- [OpenClaw Latency Benchmark — 2026-02-21](file:///home/ubuntu/openclaw-vault/20%20-%20Knowledge/Reference/make-openclaw-better/2026-02-20-openclaw-latency-benchmark.md)
- [GPT Explaining Latency Benchmark](file:///home/ubuntu/openclaw-vault/20%20-%20Knowledge/Reference/make-openclaw-better/2026-02-20-GPT-explaining-latency-benchmark.md)
- [AI Agent Latency 101: How do I speed up my AI agent? | LangChain](https://blog.langchain.com/how-do-i-speed-up-my-agent/)
- [Engineering for Real-Time Voice Agent Latency | Cresta](https://cresta.com/blog/engineering-for-real-time-voice-agent-latency)
- [Understanding AI Agent Latency and Performance | MindStudio](https://www.mindstudio.ai/blog/ai-agent-latency-performance)
- [Building Responsive AI: A Practical Guide to Optimizing Agent Latency | Medium](https://medium.com/@yuxiaojian/building-responsive-ai-a-practical-guide-to-optimizing-agent-latency-7364e12937af)
- [Optimizing AI responsiveness: Amazon Bedrock latency-optimized inference | AWS](https://aws.amazon.com/blogs/machine-learning/optimizing-ai-responsiveness-a-practical-guide-to-amazon-bedrock-latency-optimized-inference/)
- [Latency optimization | OpenAI API](https://platform.openai.com/docs/guides/latency-optimization)
- [How to optimize AI agent performance for real-time processing | Hypermode](https://hypermode.com/blog/optimize-ai-agent-performance)

---

## Meta-Reflection

Reading through the benchmark report was enlightening - it's rare to see such detailed step-by-step analysis of agent latency. The turn-by-turn traces made the multi-round problem visceral: you can literally see the model making a decision, calling a tool, then having to think again. Each gap is seconds of user waiting time.

What struck me most: **the tools themselves are not slow**. File reads are 10-40ms. QMD is 388ms. Even exec commands are <50ms. The architecture is the bottleneck. Every tool call creates a decision → action → re-think cycle, and each cycle burns 2-12 seconds. This isn't a performance tuning problem; it's a design problem.

The pre-injection insight for memory is particularly compelling because it's a pure win: same functionality, zero extra latency, lower token cost. The only reason `memory_search` is a tool right now (instead of preflight) is probably historical - it was easier to implement as a tool. But there's no reason it *needs* to be.

I was surprised by how little variance QMD showed across 20 runs (388ms ±5ms). That's remarkably consistent for a semantic search operation. It suggests the indexing is well-optimized and there's no warm-up or caching benefit. The cost is stable and predictable, which is good for planning.

The turn budget idea feels defensive but necessary. The 9-turn spiral in trace c0f0ec4b (55.4 seconds total) is pathological - that's unusable for interactive chat. Even if we optimize everything else, we need guardrails to prevent runaway tool loops.

Model cascading is interesting because it requires building a reliable classifier. The risk: misclassifying a complex query as simple and routing it to Haiku, resulting in a bad response. The reward: 4-5× latency improvement on ~30-40% of queries (simple acknowledgments, quick lookups). Might be worth A/B testing with explicit user feedback: "This response was generated by a faster model. Was it satisfactory?"

The biggest takeaway: **latency is a product of architecture, not just model speed**. Even if we switched to a 10× faster model, the multi-turn structure would still dominate. The way to get fast is to reduce turns, not to speed up individual turns (though both help).

Implementing Phase 1 (pre-inject, batch, caching) should be the immediate priority. These are low-effort, high-impact changes that don't require rethinking the agent architecture. They're also reversible - if something breaks, we can roll back easily.

---

_Completed: 2026-02-21 09:30 PST_
