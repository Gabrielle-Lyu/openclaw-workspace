# Document Processing Pipeline

Automated workflow for ingesting and organizing web content.

## Flow

```
1. dropzone/        ← crawl_doc lands files here
       ↓
2. processing/      ← Claw moves here while organizing
       ↓
3. Knowledge/       ← Renamed & filed to appropriate Reference/Research folder
       ↓
4. _done/           ← Processing reports only (no file duplicates)
```

## How It Works

### 1. Dropzone
- **Purpose:** Landing zone for `crawl_doc` tool
- **Source:** Web pages converted to markdown
- **Format:** Timestamped filenames with frontmatter metadata
- **Action:** Claw reviews daily or on-demand

### 2. Processing
- **Purpose:** Active workspace while organizing
- **Action:** Claw reads, categorizes, determines destination
- **Duration:** Temporary (minutes to hours)

### 3. Knowledge
- **Destinations:**
  - `20 - Knowledge/Reference/external/{topic}/` - External docs
  - `20 - Knowledge/Reference/openclaw/` - OpenClaw docs
  - `20 - Knowledge/Research/{topic}/` - Articles/research
  - `20 - Knowledge/Playbooks/` - Guides/tutorials

### 4. Done
- **Purpose:** Processing reports and logs only
- **Content:** Summary reports of what was filed where
- **No duplicates:** Original files are renamed/moved to Knowledge, not copied

## Commands

### Crawl a webpage
```bash
openclaw-crawl-doc "https://example.com/page"
```

### Crawl multiple pages
```bash
openclaw-crawl-doc "https://example.com/page1" "https://example.com/page2"
```

### Custom filename
```bash
openclaw-crawl-doc --filename "custom-name.md" "https://example.com"
```

## File Naming

Auto-generated pattern:
```
YYYYMMDDTHHMMSSz__domain-name__title-slug.md
```

Example:
```
20260220T063000Z__docs-oracle-com__api-authentication.md
```

## Frontmatter

Every crawled file includes:
```yaml
---
title: "Page Title"
source: "https://original-url.com"
fetched: "20260220T063000Z"
---
```

## Daily Review

Part of morning routine:
1. Check dropzone for new files
2. Move to processing
3. Read and categorize
4. File to appropriate Knowledge location
5. Move original to _done

---

_See `extensions/crawler-tool/SKILL.md` for full documentation._
