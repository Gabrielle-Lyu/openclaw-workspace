---
name: crawler-tool
description: "Crawl webpages to markdown and process them into the knowledge base. Use when user asks to save/crawl/document a webpage."
---

# Crawler Tool Skill

Fetch webpages, convert to clean markdown, and file them into the knowledge base.

## How It Works

The `crawl_doc` tool:
1. Fetches HTML from URL(s)
2. Strips boilerplate/navigation with readability algorithm
3. Converts to clean markdown using pandoc
4. Saves to dropzone with metadata frontmatter
5. Returns file path(s)

## Workflow

```
crawl_doc(url) 
  ↓ 
00 - Inbox/Docs/dropzone/
  ↓ (move to processing while working)
00 - Inbox/Docs/processing/
  ↓ (rename & move to appropriate Knowledge subfolder)
20 - Knowledge/Reference/
  ↓ (log processing report)
00 - Inbox/Docs/_done/ (reports only, no file duplicates)
```

## Usage

### Single URL

```typescript
crawl_doc({ url: "https://example.com/article" })
```

### Batch URLs

```typescript
crawl_doc({ 
  urls: [
    "https://example.com/page1",
    "https://example.com/page2"
  ]
})
```

### Custom Filename (single URL only)

```typescript
crawl_doc({ 
  url: "https://example.com/guide",
  filename: "custom-name.md"
})
```

## Critical Rules

**NEVER override `outDir`** — the tool's default is already correct:
- `/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/dropzone/`

**Only crawl URLs explicitly mentioned in the current request:**
- ❌ Don't crawl URLs from earlier in the conversation
- ❌ Don't infer related URLs
- ✅ Only crawl what user just asked for

**Single vs batch:**
- Use `url` (singular) for one URL
- Use `urls` (array) for multiple URLs
- Never mix both

## Processing Crawled Files

After crawling:

1. **Review the file** in dropzone
2. **Move to processing/** while working
3. **Determine destination:**
   - External docs → `20 - Knowledge/Reference/external/{topic}/`
   - OpenClaw docs → `20 - Knowledge/Reference/openclaw/`
   - Research/learning → `20 - Knowledge/Research/{topic}/`
   - Tutorial/guide → `20 - Knowledge/Playbooks/`
4. **Rename & move to destination** (clean filename, no timestamp prefix)
5. **Create processing report** in _done/ (optional, for batch processing)

## Output Format

Files are saved with this naming pattern:
```
YYYYMMDDTHHMMSSz__domain-name__page-title-slug.md
```

Example:
```
20260220T063000Z__docs-oracle-com__oci-authentication-guide.md
```

Frontmatter includes:
```yaml
---
title: "Page Title"
source: "https://original-url.com"
fetched: "20260220T063000Z"
---
```

## Common Scenarios

**User asks: "Save this page for later"**
```typescript
// Crawl it
crawl_doc({ url: "<url from context>" })
// Then immediately move to processing and file it
```

**User asks: "Document these 3 OCI pages"**
```typescript
crawl_doc({ 
  urls: [
    "https://docs.oracle.com/page1",
    "https://docs.oracle.com/page2",
    "https://docs.oracle.com/page3"
  ]
})
// Process and file to 20 - Knowledge/Reference/external/oci/
```

**User shares article link in chat**
Ask: "Want me to save this to your knowledge base?"

## Troubleshooting

**Failed to fetch:**
- Check URL is valid and accessible
- Some sites block crawlers (User-Agent checks)
- Try web_fetch tool as alternative

**Markdown messy:**
- readability + pandoc do their best
- Some sites have complex layouts
- May need manual cleanup in processing

**Where to file?**
- External docs → Reference/external/{provider|topic}
- Tutorials → Playbooks
- Research/articles → Research/{topic}
- When uncertain → ask Gabby

---

_This skill works with the `crawl_doc` tool defined in `openclaw-workspace/extensions/crawler-tool/`_
