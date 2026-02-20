# Request Workflow Setup - 2026-02-20

## Task
Add processed-request workflow to Inbox/Requests for tracking completed tasks.

## Changes Made

### 1. Created Subfolders
- `00 - Inbox/Requests/human-request/processed-request/`
- `00 - Inbox/Requests/agent-request/processed-request/`

### 2. Workflow Pattern

**Active Requests:**
- Drop in root folder (`human-request/` or `agent-request/`)
- Review daily during morning routine

**Completion:**
1. Complete the task/resolve the request
2. Add completion summary to the request file
3. Move file to `processed-request/` subfolder

### 3. Completion Summary Template

For human requests:
```markdown
---
## Completion Summary
**Completed:** YYYY-MM-DD HH:MM UTC
**Status:** ✅ Complete / ⚠️ Partial / ❌ Blocked

### What Was Done
- Actions taken
- Key outcomes

### Output Locations
- File paths to outputs

### Notes
Context, blockers, follow-ups
```

For agent requests:
```markdown
---
## Resolution
**Resolved:** YYYY-MM-DD HH:MM UTC
**Decision:** ✅ Approved / ❌ Declined / 🔄 Modified

### Outcome
- What was decided
- Actions taken

### Output Locations
- Implementation paths

### Notes
Follow-up or context
```

### 4. Documentation Added
- README.md in both human-request and agent-request
- Example completed request
- Example resolved suggestion

## Purpose

**Tracking:**
- Clear separation of active vs completed requests
- Audit trail of what was done and where
- Easy to review past work

**Organization:**
- Root folder = pending/active
- processed-request/ = completed with summaries
- No lost requests or forgotten tasks

## Integration with Daily Workflow

**Morning routine:**
1. Check `human-request/` for new tasks
2. Check `agent-request/` for pending suggestions
3. Process urgent items

**After completion:**
1. Add summary to request file
2. Move to processed-request/
3. Update daily log if significant

## Git Commit
- Committed as: Latest commit
- Includes: subfolders, READMEs, examples

---

**Status:** ✅ Complete
**Next:** Start using this pattern for all requests
