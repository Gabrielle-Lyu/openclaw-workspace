# Morning Request Processing - Automatic Daily Research

**Run at:** 09:30 PST daily

**IMPORTANT:** "Today" means the PST calendar day (00:00-23:59 PST), NOT UTC.

---

## Objective

Process all pending requests from both agent-generated and human-submitted folders automatically. Research topics deeply and document findings.

---

## Process

### Step 1: Find All Pending Requests

Check both folders:
- `~/openclaw-vault/00 - Inbox/Requests/agent-request/*.md` (excluding processed-request subfolder)
- `~/openclaw-vault/00 - Inbox/Requests/human-request/*.md` (excluding processed-request subfolder)

If no requests found → exit silently (nothing to process)

---

### Step 2: For Each Request File

#### A. Read the Request

Parse the file to understand:
- What needs to be researched or done
- Why it matters
- Suggested approach (if any)

#### B. Execute / Research

**For research requests:**
- **Use web_search tool** to find current information online
- Search multiple queries to gather diverse perspectives
- Read relevant documentation, articles, and sources
- Crawl detailed pages when needed (crawl_doc tool)
- Synthesize information from multiple sources
- Form informed opinions and insights

**For action requests:**
- Execute the requested task
- Document the outcome
- Note any blockers or issues

**Available tools:**
- `web_search` - Search the web (use liberally for research)
- `crawl_doc` - Fetch full page content when needed
- `exec` - Run shell commands for technical tasks
- `read`/`write` - File operations

#### C. Document Findings

Create a research document in:

`~/openclaw-vault/20 - Knowledge/Research/Daily Research/YYYY-MM-DD-<topic-slug>.md`

Use today's PST date. Create a short slug from the topic title (lowercase, hyphens, no spaces).

**Format:**

```markdown
# [Topic Title]

**Date:** YYYY-MM-DD  
**Source:** [agent-request | human-request]  
**Original Request:** [Brief quote or summary of request]

---

## Research Summary

[2-4 paragraphs covering what you learned, discovered, or accomplished]

Write in clear, thoughtful prose. Show your thinking process.

---

## Key Insights

- [Important takeaway 1]
- [Important takeaway 2]
- [Important takeaway 3]
- [...]

---

## Practical Application

[How this knowledge is useful or changes your approach. What can be done with this information.]

---

## Sources

- [Link 1 - Title]
- [Link 2 - Title]
- [...]

---

## Meta-Reflection

[Optional: 1-2 paragraphs on the research process - what worked, what surprised you, what was challenging]

---

_Completed: YYYY-MM-DD HH:MM PST_
```

---

### Step 3: Mark Request as Processed

After documenting findings, move the original request file to:

**Agent requests:**  
`~/openclaw-vault/00 - Inbox/Requests/agent-request/processed-request/YYYY-MM-DD-<original-filename>.md`

**Human requests:**  
`~/openclaw-vault/00 - Inbox/Requests/human-request/processed-request/YYYY-MM-DD-<original-filename>.md`

Prepend today's date to the filename to track when it was processed.

---

## Output Summary

After processing all requests, create a brief summary:

`~/openclaw-vault/10 - Journal/Daily/YYYY-MM-DD.md`

**APPEND** to today's journal (do not overwrite):

```markdown
---

## Morning Request Processing (9:30 AM PST)

Processed [N] request(s):

### [Topic 1 Title]
- **Type:** [agent-request | human-request]
- **Research file:** `20 - Knowledge/Research/Daily Research/YYYY-MM-DD-<slug>.md`
- **Status:** ✅ Complete

### [Topic 2 Title]
- **Type:** [agent-request | human-request]
- **Research file:** `20 - Knowledge/Research/Daily Research/YYYY-MM-DD-<slug>.md`
- **Status:** ✅ Complete

[...]

---

_Processed: YYYY-MM-DD 09:30 PST_
```

---

## Delivery Instructions

1. **Automatic execution** - no confirmation needed
2. **Silent operation** - no notifications to user
3. **Quality over speed** - take time to research properly
4. **Be thorough** - don't just summarize search results, form real opinions and insights
5. **Multiple requests** - process all pending requests in one run
6. **Use all available tools** - web_search for online research, crawl_doc for detailed pages, exec for technical tasks

---

## Style Guidelines

- Conversational but substantial
- Show your thinking process
- Don't be afraid to say "I was wrong" or "This surprised me"
- Genuine curiosity, not performative learning
- Like explaining what you learned to a colleague
- Connect findings to actual work when relevant

---

## Edge Cases

**If a request is unclear:**
- Do your best to interpret intent
- Note uncertainties in the research doc
- Still process it (don't skip)

**If a request is outdated:**
- Process it anyway for completeness
- Note that context may have changed

**If no requests exist:**
- Exit silently
- Do not create placeholder files

---

## Notes

- All times are PST unless explicitly stated otherwise
- "Today" = current PST calendar day (00:00-23:59 PST)
- Process BOTH agent-request and human-request folders
- Each request gets its own research file in Daily Research
- Original request files get moved to processed-request with date prefix
- This is genuine research work, not busywork - aim for quality
- **Web research is essential** - use web_search tool liberally to gather current information
- Research should be comprehensive - multiple searches, diverse sources, informed synthesis
