# Crawler Tool Update - 2026-02-20

## Task
Update crawler tool and skill to work with new workspace structure.

## Changes Made

### 1. Updated Crawler Script
**File:** `/home/ubuntu/openclaw-workspace/extensions/crawler-tool/openclaw-crawl-doc`
- Changed `DEFAULT_OUT_DIR` from:
  - OLD: `/home/ubuntu/openclaw-knowledge/inbox/dropzone`
  - NEW: `/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/dropzone`

### 2. Created SKILL.md
**File:** `/home/ubuntu/openclaw-workspace/extensions/crawler-tool/SKILL.md`
- Documented full workflow and processing pipeline
- Added usage examples (single, batch, custom filename)
- Critical rules (no outDir override, only crawl requested URLs)
- Processing steps: dropzone → processing → Knowledge → _done

### 3. Updated TOOLS.md
**File:** `/home/ubuntu/.openclaw/workspace/TOOLS.md`
- Updated default path documentation
- Added workflow documentation:
  - Dropzone: `00 - Inbox/Docs/dropzone/`
  - Processing: `00 - Inbox/Docs/processing/`
  - Reference: `20 - Knowledge/Reference/`
  - Done: `00 - Inbox/Docs/_done/`

### 4. Added Pipeline README
**File:** `/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/README.md`
- Documented the 4-stage pipeline
- Command examples
- File naming patterns
- Daily review workflow

## New Workflow

```
crawl_doc(url)
    ↓
00 - Inbox/Docs/dropzone/     (automatic)
    ↓
00 - Inbox/Docs/processing/   (Claw working)
    ↓
20 - Knowledge/Reference/     (filed)
    ↓
00 - Inbox/Docs/_done/        (archived)
```

## Existing Files in Dropzone

2 OCI documentation files ready for processing:
1. `20260219T213428Z__docs-oracle-com__set-up-api-authentication-for-oci.md`
2. `20260219T215847Z__docs-oracle-com__add-a-function-tool-to-an-agent-using-the-adk.md`

## Git Commits

1. `66c352c` - Update crawler tool for new workspace structure
2. `134e47f` - Update TOOLS.md with new crawler paths
3. `663eb00` - Add document processing pipeline README

---

**Status:** ✅ Complete
**Next:** Process the 2 existing files in dropzone
