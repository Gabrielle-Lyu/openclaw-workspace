# TASK — AI Daily Briefing

Run every day at 08:10 PST.

## Objective
Collect and summarize the latest global AI industry developments from the last 24 hours.

## Research Strategy

**Multi-Angle Search Approach:**

Run **3 parallel searches** with different angles to get comprehensive coverage:

1. **General AI News:**
   ```
   query: "AI news today latest developments 2024"
   count: 10
   freshness: pd (past day)
   ```

2. **Model Updates:**
   ```
   query: "GPT Claude Gemini AI model updates today"
   count: 10
   freshness: pd
   ```

3. **Industry Announcements:**
   ```
   query: "AI industry announcements breakthroughs today"
   count: 10
   freshness: pd
   ```

**Why this works:**
- Different queries capture different aspects (news outlets, tech blogs, research releases)
- Running in parallel = faster
- 10 results per query = broad coverage without noise
- `freshness: pd` = only past 24 hours

## Sources
- major news outlets
- research labs
- company blogs
- official announcements
- conference releases
- venture funding reports

## Must Cover
- model releases
- benchmarks
- funding
- partnerships
- regulation
- infrastructure / chips
- enterprise adoption
- failures / controversies

---

## Output Format

Title: AI Daily Briefing (YYYY-MM-DD)

Sections:
1. tldr
2. Major Headlines
3. Industry Impact
4. Strategic Signals
5. Hidden Insights
include source link citation

---

## Style Rules
- Use section headers with expanded paragraphs (not bullet points)
- Each point gets 1 concise paragraph with context and implications
- Signal > noise - focus on what matters
- No filler or fluff
- Include your commentary and insights
- No rhetorical questions

---

## Delivery Instructions

**1. Save full report to file:**

Path: `/home/ubuntu/openclaw-vault/20 - Knowledge/Research/ai-daily-briefing/YYYY-MM-DD.md`

**2. Post summary to Discord automatically:**

Use the `message` tool with these exact parameters:
```
action: send
channel: discord
target: 1474308824914464880
message: [summary with 5-7 key headlines as concise paragraphs]
```

Format the summary as:
- Title: "## 🤖 AI Daily Briefing (YYYY-MM-DD)"
- 5-7 key headlines, each as **bold title** followed by concise paragraph
- End with: "Full report: `/home/ubuntu/openclaw-vault/20 - Knowledge/Research/ai-daily-briefing/YYYY-MM-DD.md`"

**3. Do NOT ask for confirmation. Execute both steps automatically.**

This is a scheduled task - complete delivery (file + Discord post) without waiting for approval.
