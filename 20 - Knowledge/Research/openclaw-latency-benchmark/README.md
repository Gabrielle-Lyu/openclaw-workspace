# OpenClaw Latency Benchmark — Scripts

Companion scripts for the benchmark write-up:
[`../2026-02-21-openclaw-latency-benchmark.md`](../2026-02-21-openclaw-latency-benchmark.md)

Three scripts, meant to be run in order:

```
qmd-benchmark.sh   →   run-scenarios.sh   →   parse-logs.py
(QMD baseline)         (agent scenarios)       (log analysis)
```

---

## Prerequisites

- OpenClaw gateway running (`openclaw health` should return OK)
- `openclaw` CLI in `$PATH`
- Python 3.10+ (for `parse-logs.py`)
- `qmd` binary at `/home/ubuntu/.bun/bin/qmd` (or override with `QMD_BIN=`)

---

## Step 1 — QMD standalone baseline

**File:** `qmd-benchmark.sh`

Measures raw QMD search latency with zero agent overhead. Run this first to
establish whether QMD itself is a bottleneck.

```bash
chmod +x qmd-benchmark.sh
./qmd-benchmark.sh
```

**Override defaults via environment variables:**

```bash
QMD_BIN=/path/to/qmd \
VAULT=/home/ubuntu/openclaw-vault \
RUNS=10 \
LIMIT=5 \
  ./qmd-benchmark.sh
```

**What it does:**
- Runs 3 representative queries 10 times each against the vault
- Reports min/max/avg per query
- Prints an interpretation guide at the end

**Expected output on this machine (~388ms avg):**
```
Query: "pushgateway stress test"
  run  1: 384ms
  ...
  → min=381ms  max=394ms  avg=388ms
```

**Interpretation:**

| Result | Meaning |
|--------|---------|
| < 200ms | QMD is not your bottleneck |
| 200–500ms | Noticeable; monitor as vault grows |
| > 500ms | QMD is adding meaningful TTFT overhead |

---

## Step 2 — Run the scenario matrix

**File:** `run-scenarios.sh`

Runs all (Scenario × Prompt) combinations and prints wall-clock times.
Creates the `perf-s0` minimal agent automatically if it doesn't exist.

```bash
chmod +x run-scenarios.sh
./run-scenarios.sh
```

**Override agent names:**

```bash
MAIN_AGENT=main S0_AGENT=perf-s0 ./run-scenarios.sh
```

**Scenarios covered:**

| Scenario | Agent | Memory | Tools |
|----------|-------|--------|-------|
| S0 | `perf-s0` (minimal AGENTS.md) | OFF | OFF |
| S1+S2 | `main` | ON (QMD + file reads) | OFF |
| S3 | `main` | ON | ON (`web_search`, `crawl_doc`) |

**Prompts used:**

| ID | Text |
|----|------|
| P1 | `Reply with "OK".` |
| P2 | `What is my favorite GPU? If unknown, say "unknown".` |
| P3 | `Summarize the last 2 days of my notes into 5 bullets.` |
| P_CRAWL | Web crawl query (S3 only) |

**Note:** Wall-clock times include ~1.8s CLI startup overhead. Use `parse-logs.py`
for gateway-internal timings that exclude this overhead.

---

## Step 3 — Parse the gateway log

**File:** `parse-logs.py`

Reads the gateway JSONL log and produces a per-phase timing table for every run,
plus a per-run tool breakdown and summary statistics.

```bash
# Parse today's log (auto-detects date)
python3 parse-logs.py

# Parse a specific log file
python3 parse-logs.py --log /tmp/openclaw/openclaw-2026-02-21.log

# Only show runs from the last test session (e.g. started at 07:28 UTC)
python3 parse-logs.py --since 07:28:00

# Export as CSV
python3 parse-logs.py --since 07:28:00 --csv > results.csv

# Skip per-run tool breakdown (cleaner output)
python3 parse-logs.py --no-tools
```

**Column definitions:**

| Column | Description |
|--------|-------------|
| `Total` | Full run duration from gateway log (`durationMs`) |
| `CtxBld` | `run start` → `agent start` — context/prompt assembly |
| `LLM-T1` | `agent start` → first tool call (or `agent end` if no tools) |
| `Tools` | Sum of all tool call durations |
| `#T` | Number of tool calls in this run |
| `LLM-T2` | Last tool end → `agent end` |
| `%LLM` | Percentage of total time spent in LLM inference |

**Example output:**
```
RunID                  Time(UTC)   Total  CtxBld  LLM-T1  Tools   #T  LLM-T2  %LLM
──────────────────────────────────────────────────────────────────────────────────
b3dd86d9-b525-4cbe-a   07:28:47   2.88s    54ms   2.87s  0.00s    0   0.00s 100.0%
27da8c8b-88fa-4b79-b   07:29:16   6.58s    18ms   6.58s  0.00s    0   0.00s 100.0%
f504022e-ee72-4990-a   07:29:54   6.69s    13ms   4.13s  0.56s    1   2.00s  92.2%

═══ Tool Breakdown ═══
  f504022e-ee72-4990-a @ 07:29:54
    memory_search          564ms
```

**Log file locations:**

```bash
/tmp/openclaw/openclaw-YYYY-MM-DD.log    # today's log
~/.openclaw/logs/                         # persistent logs (commands, auto-embed, etc.)
```

---

## Running everything end-to-end

```bash
cd "/home/ubuntu/openclaw-vault/20 - Knowledge/Research/openclaw-latency-benchmark"

# 1. QMD baseline (takes ~60s)
./qmd-benchmark.sh

# 2. Agent scenarios (takes 3–10 min depending on crawl)
./run-scenarios.sh

# 3. Parse the results, filtered to this test session
START_TIME=$(date -u +%H:%M:%S)
python3 parse-logs.py --since "$START_TIME"

# Or export to CSV
python3 parse-logs.py --since "$START_TIME" --csv > results.csv
```

---

## Findings from the 2026-02-21 run

| Scenario | Prompt | Total | Dominant cost |
|----------|--------|-------|---------------|
| S0 | P1 "Reply OK" | 2.9s | LLM inference (100%) |
| S0 | P2 Fav GPU | 6.6s | LLM inference (100%) |
| S0 | P3 Summarize | 11.9s | LLM inference (100%) |
| S1+S2 | P1 | 2.4s | LLM inference (100%) |
| S1+S2 | P2 | 6.7s | LLM (92%) + memory_search 564ms |
| S1+S2 | P3 | 25.8s | LLM multi-turn (60%) + context overhead |
| S3 | Crawl | 55.4s | `crawl_doc` (20.4s, 37%) + LLM (17%) |

Full analysis: [`../2026-02-21-openclaw-latency-benchmark.md`](../2026-02-21-openclaw-latency-benchmark.md)
