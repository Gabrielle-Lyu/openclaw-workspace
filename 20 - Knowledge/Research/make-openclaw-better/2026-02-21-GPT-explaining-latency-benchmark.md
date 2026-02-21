1) Is it “actually having 2 turns”?

Sometimes yes, often no. Your traces clearly show:

f504022e (Fav GPU): 2 turns (LLM → memory_search → LLM)

af7f167f (Summarize notes): 4 turns

b543d775: 4 turns

5854ada9: 6 turns

c0f0ec4b: 9 turns

So the correct summary is:

The main agent is a multi-step tool-using agent, and each “step” costs another LLM inference gap.

This is consistent with how tool loops usually work: model chooses tools → tools run → model rethinks.

2) Your turn-counting method is reasonable, but here’s the nuance

You’re inferring turns from “silent gaps” because the gateway doesn’t log “LLM request start/end”. That’s a smart workaround, but there are two caveats:

Caveat A — a “gap” is not guaranteed to equal “one API call”

A silent gap could include:

prompt assembly inside the gateway

tool planning logic

retries/backoff

stream buffering

That said, in your traces the pattern is very canonical:
agent_start → (gap) → tool_start and tool_end → (gap) → tool_start/agent_end.

This strongly suggests those gaps correspond to actual LLM invocations, or at least LLM-blocking compute time (which is what matters for latency anyway).

Caveat B — the 50ms merge heuristic can under/over merge

Your “<50ms = same tool-execution block” rule is fine for grouping fast parallel reads, but it doesn’t really affect the core conclusion because your “inference” gaps are seconds long, not milliseconds.

Bottom line: even if the exact “turn count” were off by ±1 sometimes, your main conclusion still holds: LLM-blocking time dominates and increases with each tool step.

3) The main conclusion is now sharper: “turn explosion” is the bottleneck

Your updated report shows something bigger than “two turns”:

Example: af7f167f (P3 summarize)

Tools total: 161ms

LLM time: 25.59s

Turns: 4

So your “startup reads are cheap” statement is correct for I/O, but the real issue is:

the agent is doing multiple decision loops (LLM → exec → LLM → exec → LLM → reads → LLM)

Even though the tools are fast, the extra LLM rethinking passes are expensive.

4) Re-check a couple report statements (small corrections)
“The cost was the extra LLM turn”

For P3, it’s not “an extra turn”, it’s extra turns (4 total).
Same for some earlier runs (6, 9 turns). So I’d rewrite that section as:

“The cost was additional LLM inference rounds caused by multi-step tool planning and repeated tool loops.”

“QMD does not pre-inject context”

Your evidence supports: QMD is invoked as a tool (memory_search) rather than pre-injection at prompt build time. That’s why you pay +1 LLM round-trip when memory is needed.

If you can redesign so retrieval happens before the model call, you can remove that extra inference pass.

5) What to do next (highest ROI fixes, aligned to your data)
A) Collapse multi-step tool loops into one step

Right now the model is doing “exec to find files” then “exec again” then “read many”. Two big wins:

Stop using exec to discover journal paths
Make journal paths deterministic in config (or passed as variables).
If the agent already knows the repo root + naming convention, it should not be shelling out to ls.

Batch reads in a single tool call
Replace 5 separate reads with read_many([paths]) or make read accept multiple paths.

This converts:

4 turns → typically 2 turns (plan+fetch → answer)

or even 1 turn if you prefetch

B) Add a “max tool rounds” policy

Add a rule like:

“At most one tool round per user message; if more is needed, ask a clarifying question or answer best-effort.”

This prevents 6–9 turn spirals.

C) Prefer “retrieve first, then call model once”

For memory:

Today: LLM → memory_search → LLM

Target: memory_search (gateway) → LLM

You measured QMD is only ~0.4s; doing it before the model call is usually worth it.

D) Routing to faster model for low-value turns

Your P1 baseline is ~2.4–2.9s even for “OK”. That’s just the model’s baseline + streaming overhead.

If you want it to feel snappy:

route trivial prompts to a faster/cheaper model

keep Sonnet for summaries / complex tasks

6) One methodological improvement that will remove all ambiguity

If you can change the gateway logging, add explicit markers:

llm_request_start

llm_first_token

llm_request_end

Then you’ll have:

true TTFT

true number of model calls

model-only latency vs gateway overhead

Right now you can infer, but explicit markers will make your report bulletproof.

7) Updated root-cause summary (based on your updated report)

Ranked by impact:

Multi-round tool loop (4–9 inference gaps per message in real sessions)

Sonnet base latency per call (2–12s depending on context/output)

crawl_doc network time (when used)

QMD tool-call overhead (+0.4–0.6s and +1 LLM round-trip)

Context build and file I/O (negligible)