# Playbooks Migration - 2026-02-20

## Task
Reorganize human-instruction folder to fit the new numbered workspace structure.

## Decision
Moved to `20 - Knowledge/Playbooks/` - the right semantic fit for reusable workflows and task instructions.

## Changes Made

### 1. Files Moved
From: `/home/ubuntu/openclaw-workspace/human-instruction/`
To: `/home/ubuntu/openclaw-workspace/20 - Knowledge/Playbooks/`

Files migrated:
- `daily-reflection.md`
- `ai-daily-briefing.md`
- `market-intelligence.md`

### 2. Updated References

**AGENTS.md:**
- OLD: `~/openclaw-workspace/human-instruction/`
- NEW: `~/openclaw-workspace/20 - Knowledge/Playbooks/`

**README.md (workspace):**
- OLD: Human instructions: `/home/ubuntu/.openclaw/workspace/human-instruction/`
- NEW: Playbooks (task instructions): `/home/ubuntu/openclaw-workspace/20 - Knowledge/Playbooks/`

### 3. Enhanced Documentation
Created comprehensive `20 - Knowledge/Playbooks/README.md`:
- Purpose and priority of playbooks
- Current playbooks listed
- Guidelines for creating new playbooks
- Organization structure

### 4. Cleanup
Deleted empty `human-instruction/` folder

## Final Structure

```
20 - Knowledge/Playbooks/
├── README.md
├── daily-reflection.md
├── ai-daily-briefing.md
└── market-intelligence.md
```

## Git Commits

**openclaw-workspace:**
1. `24d6bb8` - Move human-instruction → Playbooks
2. `46d6d1f` - Update README.md reference

**system config (.openclaw/workspace):**
1. `8c7555f` - Update AGENTS.md reference

## Impact

- Better semantic organization (workflows = playbooks)
- Fits numbered folder structure
- No functional changes (still referenced in AGENTS.md)
- All existing playbooks preserved

---

**Status:** ✅ Complete
**Next:** Continue using Playbooks for task-specific instructions
