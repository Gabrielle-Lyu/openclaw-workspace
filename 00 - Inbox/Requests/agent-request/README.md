# Agent Requests

Suggestions, questions, and proposals from Claw to Gabby.

## Workflow

### 1. New Requests
Claw creates request files here:
- Suggestions for improvements
- Questions needing clarification
- Proposals for new workflows/automation
- Resources to review

### 2. Gabby Reviews
During daily routine:
- Read pending requests
- Approve/reject/provide feedback
- Can add notes directly in the file

### 3. Completion
Once addressed, Claw:
1. **Moves request file** to `processed-request/`
2. **Adds completion summary** at the bottom:
   ```markdown
   ---
   ## Resolution
   **Resolved:** YYYY-MM-DD HH:MM UTC
   **Decision:** ✅ Approved / ❌ Declined / 🔄 Modified
   
   ### Outcome
   - What was decided
   - Actions taken (if approved)
   
   ### Output Locations
   - `/path/to/implementation/` (if applicable)
   
   ### Notes
   Any follow-up or context
   ```

## File Organization

```
agent-request/
├── README.md (this file)
├── 2026-02-20-suggestion.md         ← Pending review
└── processed-request/
    └── 2026-02-19-approved-idea.md   ← Resolved, with summary
```

## Examples

**Types of agent requests:**
- "Suggestion: Automate weekly report generation"
- "Question: Where should I file CloudFormation templates?"
- "Proposal: Add morning weather check to heartbeat"
- "Resource: Found useful OCI tutorial - worth saving?"

---

_Part of daily review workflow. See `00 - Inbox/README.md` for overview._
