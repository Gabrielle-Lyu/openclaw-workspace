# Human Requests

Tasks and requests from Gabby to Claw.

## Workflow

### 1. New Requests
Drop request files here (root of `human-request/`)
- Format: Markdown files with clear ask/task
- Naming: `YYYY-MM-DD-brief-description.md` recommended
- Review: Daily (morning routine)

### 2. Processing
Claw works on the request:
- Read and understand the ask
- Execute the task
- Generate outputs (if applicable)

### 3. Completion
Once done, Claw:
1. **Moves request file** to `processed-request/`
2. **Adds completion summary** at the bottom of the file:
   ```markdown
   ---
   ## Completion Summary
   **Completed:** YYYY-MM-DD HH:MM UTC
   **Status:** ✅ Complete / ⚠️ Partial / ❌ Blocked
   
   ### What Was Done
   - Brief summary of actions taken
   - Key outcomes
   
   ### Output Locations
   - `/path/to/output/file1.md`
   - `/path/to/output/file2.md`
   
   ### Notes
   Any relevant context, blockers, or follow-ups
   ```

## File Organization

```
human-request/
├── README.md (this file)
├── 2026-02-20-task-example.md       ← Active request
└── processed-request/
    └── 2026-02-19-completed-task.md  ← Done, with summary
```

## Tips

- **Be specific:** Clear requests = better outcomes
- **One task per file:** Easier to track completion
- **Use templates:** Create templates for recurring requests
- **Review processed:** Check `processed-request/` to see what's been done

---

_Part of daily review workflow. See `00 - Inbox/README.md` for overview._
