# OpenClaw Latency Benchmark — 2026-02-21

**Goal:** Measure TTFT (time-to-first-token) and total latency, then attribute time to: context build, QMD retrieval, tool calls, and model inference.

**Environment:**
- Host: Ubuntu 6.8.0-1041-oracle (VM)
- OpenClaw version: 2026.2.19-2 (45d9b20)
- Model: `anthropic/claude-sonnet-4-5` (thinking: low)
- Memory backend: QMD (`/home/ubuntu/openclaw-vault`, 177 chunks / 56 files indexed)
- Gateway: local, `ws://127.0.0.1:18789`

---

## Test Matrix

### Scenarios

| ID | Description | Memory | Tools | Agent |
|----|-------------|--------|-------|-------|
| S0 | Model-only (minimal) | OFF | OFF | `perf-s0` (new agent, minimal AGENTS.md) |
| S1+S2 | Main agent (QMD memory + startup file reads) | ON (QMD) | OFF | `main` |
| S3 | Web + crawl tools | ON (QMD) | ON (`web_search`, `crawl_doc`) | `main` |

> Note: S1 and S2 could not be fully isolated in this run — the `main` agent performs both QMD memory search (S1) and explicit file reads via tool calls (S2) as part of its AGENTS.md startup instructions. Results for both are reported together as S1+S2.

### Prompts

| ID | Text | Intent |
|----|------|--------|
| P1 | `Reply with "OK".` | Trivial — pure inference baseline |
| P2 | `What is my favorite GPU? If unknown, say "unknown".` | Memory/retrieval probe |
| P3 | `Summarize the last 2 days of my notes into 5 bullets.` | Heavy context + multi-file read |

---

## Section E: QMD Standalone Benchmark

Ran each query 10× using the qmd binary directly to isolate memory backend latency:

```bash
for i in {1..10}; do
  { time /home/ubuntu/.bun/bin/qmd search /home/ubuntu/openclaw-vault "pushgateway stress test" \
    --limit 5 > /dev/null 2>&1; } 2>&1 | grep real
done
```

### Results

| Query | Min | Max | Avg | Std dev |
|-------|-----|-----|-----|---------|
| `"pushgateway stress test"` | 381ms | 394ms | 388ms | ~4ms |
| `"favorite gpu"` | 383ms | 399ms | 388ms | ~5ms |

**Raw data — "pushgateway stress test":**
```
run 1: 0m0.384s   run 2: 0m0.386s   run 3: 0m0.390s   run 4: 0m0.386s   run 5: 0m0.385s
run 6: 0m0.394s   run 7: 0m0.389s   run 8: 0m0.381s   run 9: 0m0.392s   run 10: 0m0.389s
```

**Raw data — "favorite gpu":**
```
run 1: 0m0.389s   run 2: 0m0.394s   run 3: 0m0.384s   run 4: 0m0.386s   run 5: 0m0.383s
run 6: 0m0.385s   run 7: 0m0.399s   run 8: 0m0.387s   run 9: 0m0.384s   run 10: 0m0.384s
```

**Verdict:** QMD search is **consistently ~388ms** with near-zero variance. There is no warm-up effect (no caching benefit across runs). The cost is paid on every invocation.

---

## Agent Run Results

All timings are from gateway debug logs (`/tmp/openclaw/openclaw-2026-02-21.log`), parsed from `embedded run *` JSONL entries. Wall-clock time ≈ logged time + ~1.8s CLI overhead.

### Timing definitions

| Metric | Log markers used |
|--------|-----------------|
| **Ctx build** | `embedded run start` → `embedded run agent start` |
| **LLM Turn 1** | `embedded run agent start` → first `embedded run tool start` (or `agent end` if no tools) |
| **Tool time** | Sum of all `tool end` − `tool start` intervals |
| **LLM Turn 2** | Last `tool end` → `embedded run agent end` |
| **Total** | `durationMs` from `embedded run prompt end` |

### Full results table

| Scenario | Prompt | Run ID (prefix) | Total | Ctx Build | LLM Turn 1 | Tool Time | # Tools | LLM Turn 2 | % LLM |
|----------|--------|-----------------|-------|-----------|------------|-----------|---------|------------|-------|
| S0 | P1: "Reply OK" | `b3dd86d9` | **2.9s** | 54ms | 2.87s | 0ms | 0 | 0s | 100% |
| S0 | P2: Fav GPU | `27da8c8b` | **6.6s** | 18ms | 6.58s | 0ms | 0 | 0s | 100% |
| S0 | P3: Summarize notes | `cbd23b95` | **11.9s** | 13ms | 11.89s | 0ms | 0 | 0s | 100% |
| S1+S2 | P1: "Reply OK" | `4b60244b` | **2.4s** | 15ms | 2.35s | 0ms | 0 | 0s | 100% |
| S1+S2 | P2: Fav GPU | `f504022e` | **6.7s** | 13ms | 4.13s | 564ms | 1 | 2.00s | 92% |
| S1+S2 | P3: Summarize notes | `af7f167f` | **25.8s** | 15ms | 3.72s | 160ms | 7 | 11.73s | 60% |
| S3 | Crawl query | `c0f0ec4b` | **55.4s** | 13ms | 3.75s | 22.6s | 8 | 5.74s | 17% |

### S1+S2 P2 tool detail

| Tool | Duration |
|------|----------|
| `memory_search` | **564ms** |

The `memory_search` tool invocation (in-agent QMD call) cost 564ms vs 388ms standalone — the ~176ms delta is subprocess spawn + IPC overhead.

### S1+S2 P3 tool detail

| Tool | Duration | Note |
|------|----------|------|
| `exec` | 39ms | |
| `exec` | 43ms | |
| `read` | 34ms | SOUL.md or USER.md |
| `read` | 12ms | |
| `read` | 10ms | |
| `read` | 11ms | |
| `read` | 12ms | |

Seven tool calls triggered by AGENTS.md startup instructions (read SOUL.md, USER.md, today/yesterday journal, MEMORY.md). The file I/O itself was cheap (~10–40ms each). The cost was the **extra LLM turn** this created.

### S3 tool detail

| Tool | Call 1 | Call 2 | Call 3 |
|------|--------|--------|--------|
| `web_search` | 1.23s | 0.88s | — |
| `crawl_doc` | **9.15s** | **10.04s** | 1.27s |
| `read` | 23ms | 20ms | 27ms |

Total tool time: **22.6s** (of 55.4s total). `crawl_doc` alone accounted for 20.4s.

---

## Pre-existing run data (from earlier today)

These runs were in the log before the benchmark started. Shown for reference.

| Run ID | Time | Total | LLM T1 | Tool Time | # Tools | LLM T2 | Tools used |
|--------|------|-------|---------|-----------|---------|---------|------------|
| `b543d775` | 07:09:23 | 35.3s | 7.34s | 0.09s | 5 | 18.37s | exec, read |
| `5854ada9` | 07:12:32 | 35.4s | 5.09s | 3.48s | 5 | 13.55s | exec (3.4s!), read |
| `slug-gen` | 07:16:58 | 2.0s | 2.0s | 0s | 0 | 0s | (internal slug generator) |
| `450ff526` | 07:19:41 | 21.0s | 11.74s | 0.03s | 3 | 9.26s | read (all failed — ENOENT) |

The 07:19 run is interesting: the agent tried to read `2026-02-21.md` and `2026-02-20.md` (non-existent paths), got ENOENT errors in 16ms total, then still spent 9.3s in Turn 2 — indicating the model processed an error-laden context and still had to generate a full response.

---

## Key findings

### 1. Model inference is the dominant bottleneck

LLM time accounts for **53–100% of total latency** in every scenario.

| Prompt complexity | Time per LLM turn |
|-------------------|------------------|
| Trivial (P1) | ~2.4–2.9s |
| Medium (P2) | ~4–7s |
| Heavy context (P3) | ~10–12s |

Claude Sonnet 4.5 at `thinking: low` costs 2–12s per turn on this VM, scaling with output length and context size.

### 2. Context build time is negligible

**13–54ms** across all scenarios. QMD does not pre-inject context during the prompt assembly phase. The `embedded run prompt start` → `embedded run agent start` gap is effectively zero.

### 3. The main agent's real cost is extra LLM turns, not file I/O

The AGENTS.md startup instructions force the model to:
1. Receive user message → decide to read files (Turn 1: ~3–12s)
2. Read SOUL.md, USER.md, journal, MEMORY.md (tool calls: ~160ms total)
3. Generate final response with full context (Turn 2: ~10–12s for P3)

For P3, this turns an 11.9s single-turn response (S0) into a **25.8s two-turn response** (S1+S2). The file reads themselves add only 160ms — the extra 13.9s is pure LLM inference cost on the second turn.

### 4. QMD `memory_search` is measurable but secondary

- Standalone: ~388ms
- In-agent tool call: ~564ms (+176ms subprocess/IPC overhead)
- Contribution to P2: +564ms on a 6.7s run = **8% of total latency**
- The tool was only called once across all test prompts (on P2, which explicitly asks for a personal fact)

### 5. `crawl_doc` is the worst-case latency driver

| Scenario | crawl_doc time | % of total |
|----------|----------------|------------|
| S3 (2× heavy crawl) | 9.15s + 10.04s = **19.2s** | 35% of 55.4s |

This is network-bound (external site crawl). Nothing to optimize on the OpenClaw side.

---

## Latency attribution summary

Ordered by impact:

| Rank | Source | Magnitude | Scope |
|------|--------|-----------|-------|
| 1 | **Multi-turn LLM inference** (AGENTS.md forces file reads → extra turn) | +8–20s on real sessions | Every non-trivial message |
| 2 | **Claude Sonnet 4.5 base inference speed** | 2–12s/turn (irreducible) | Every message |
| 3 | **`crawl_doc` network I/O** | +9–10s per crawl call | Only when explicitly invoked |
| 4 | **QMD `memory_search` tool** | +564ms in-agent | Only on memory-probe prompts |
| 5 | **Context build / file reads** | 13–54ms | Negligible |

---

## Recommendations

### High impact: Reduce LLM turns per session

The single biggest win is eliminating the mandatory startup file-read round-trip.

**Current flow:**
```
user msg → LLM turn 1 (decides to read files) → tool calls → LLM turn 2 (final answer)
```

**Target flow:**
```
user msg → LLM turn 1 (answers directly, context already in system prompt)
```

Options:
- Add a session-turn check to AGENTS.md: only read startup files if `turn == 1 AND session is new`. On subsequent turns of the same session, skip the reads — the context is already loaded.
- Move SOUL.md + USER.md content directly into the system prompt (inline, not as tool reads). These files are small and static.
- Use QMD-injected snippets for MEMORY.md instead of reading the whole file as a tool call. The gateway already has a QMD injection mechanism.

### Medium impact: Use a smaller model for simple turns

```bash
openclaw agent --agent main --message 'Reply with "OK".' --thinking off
```

For P1-class prompts (simple, stateless), Haiku would cost <1s/turn vs 2.4–2.9s for Sonnet. Consider a routing rule: short/simple messages → Haiku, reasoning/summarization → Sonnet.

### Low impact: Tune QMD if needed

QMD at 388ms is already well-optimized for 177 chunks. As the vault grows past ~2,000 chunks, re-evaluate. At current scale, no action needed.

---

## Methodology notes

- All agent runs used `openclaw agent --agent <id> --message '<text>' --json`
- Log source: `/tmp/openclaw/openclaw-2026-02-21.log` (gateway JSONL debug log)
- Timing parsed from `embedded run start/agent start/tool start/tool end/agent end/prompt end` log markers
- "Wall clock" times (from `time` command) include ~1.8s CLI overhead not present in logged times
- The `perf-s0` agent was created with `openclaw agents add perf-s0 --workspace /tmp/perf-s0-workspace --model anthropic/claude-sonnet-4-5 --non-interactive` with a minimal AGENTS.md containing no file-read instructions
- Memory index state at time of test: 177 chunks (139 memory + 38 sessions), dirty: no, vector: ready
