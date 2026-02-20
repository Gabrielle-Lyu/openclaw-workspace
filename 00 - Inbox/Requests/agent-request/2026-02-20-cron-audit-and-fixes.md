# Cron Jobs Audit & Required Fixes

**Created:** 2026-02-20 07:06 UTC  
**Status:** ⚠️ Requires Action

## Summary

Found **7 active cron jobs**, **5 need updating** for new workspace structure.  
**3 are showing errors** from last run.

---

## ✅ Jobs That Are OK

### 1. Friday Demo Prep Reminder
- **ID:** `b85b8d8e-6134-497f-b0e5-67848fd906bf`
- **Schedule:** One-time at 2026-02-20 16:00 UTC (Today at 4 PM)
- **Status:** ✅ Idle (will delete after run)
- **Action:** None needed - this is a one-time reminder

---

## ⚠️ Jobs That Need Fixes

### 2. daily-inbox-processing
- **ID:** `f9132717-9597-4f8a-8549-61cf1fdfa9d4`
- **Schedule:** Daily at 9:00 AM PST
- **Status:** ❌ Error (last run 22h ago)
- **Error:** "cron delivery target is missing"

**Current paths (WRONG):**
```
/home/ubuntu/openclaw-knowledge/inbox/dropzone
/home/ubuntu/openclaw-knowledge/inbox/_done
/home/ubuntu/openclaw-knowledge/inbox/processing
/home/ubuntu/openclaw-knowledge/{reference,projects,decisions,context,playbooks,memory}
```

**Should be:**
```
/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/dropzone
/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/processing
/home/ubuntu/openclaw-workspace/00 - Inbox/Docs/_done
/home/ubuntu/openclaw-workspace/20 - Knowledge/{Reference,Projects,Decisions,Context,Playbooks}
```

---

### 3. daily-reflection
- **ID:** `118a0e35-7a72-465d-85c7-58ddcb0dd75c`
- **Schedule:** Daily at 11:00 PM PST
- **Status:** ❌ Error (last run 6m ago)
- **Error:** "Unsupported channel: whatsapp"

**Current message (WRONG paths):**
```
Read: /home/ubuntu/openclaw-workspace/human-instruction/daily-reflection.md
Read: /home/ubuntu/openclaw-workspace/memory/YYYY-MM-DD.md
Save: /home/ubuntu/openclaw-workspace/daily-reflections/YYYY-MM-DD-reflection.md
```

**Should be:**
```
Read: /home/ubuntu/openclaw-workspace/20 - Knowledge/Playbooks/daily-reflection.md
Read: /home/ubuntu/openclaw-workspace/10 - Journal/Daily/YYYY-MM-DD.md
Save: /home/ubuntu/openclaw-workspace/10 - Journal/Reflections/YYYY-MM-DD-reflection.md
```

**Note:** We already updated the playbook itself, but the cron job message still has old paths.

---

### 4. Daily Market & AI Reports
- **ID:** `bd1b0fa0-ba59-4658-a97a-62ea8ee8da50`
- **Schedule:** Daily at 8:00 AM PST
- **Status:** ❌ Error (last run 15h ago, 2 consecutive errors)
- **Error:** "cron announce delivery failed"
- **Delivery:** Slack thread

**Current paths (WRONG - folder doesn't exist):**
```
~/openclaw-workspace/reports/stock-market/YYYY-MM-DD.md
~/openclaw-workspace/reports/ai-news/YYYY-MM-DD.md
```

**Should be:**
```
~/openclaw-workspace/20 - Knowledge/Research/stock-market/YYYY-MM-DD.md
~/openclaw-workspace/20 - Knowledge/Research/ai-news/YYYY-MM-DD.md
```

**Question:** Do you want stock market and AI news reports, or do you prefer the separate market-intelligence and ai-daily-briefing jobs below? This seems like a duplicate.

---

### 5. market-intelligence-daily
- **ID:** `dec46e4b-6bf0-4785-aee5-cbf6da013e65`
- **Schedule:** Daily at 8:00 AM PST
- **Status:** ✅ Idle (hasn't run yet)

**Current message (WRONG path):**
```
Read: ~/openclaw-workspace/human-instruction/market-intelligence.md
```

**Should be:**
```
Read: ~/openclaw-workspace/20 - Knowledge/Playbooks/market-intelligence.md
```

**Additional fix needed in playbook:**
```diff
- Save: openclaw-workspace/research/market-intelligence/YYYY-MM-DD.md
+ Save: ~/openclaw-workspace/20 - Knowledge/Research/market-intelligence/YYYY-MM-DD.md
```

---

### 6. ai-daily-briefing
- **ID:** `39139e61-0578-4670-bbe9-4b8591daac7a`
- **Schedule:** Daily at 8:10 AM PST
- **Status:** ✅ Idle (hasn't run yet)

**Current message (WRONG path):**
```
Read: ~/openclaw-workspace/human-instruction/ai-daily-briefing.md
```

**Should be:**
```
Read: ~/openclaw-workspace/20 - Knowledge/Playbooks/ai-daily-briefing.md
```

**Additional fix needed in playbook:**
```diff
- Save: openclaw-workspace/research/ai-daily-briefing/YYYY-MM-DD.md
+ Save: ~/openclaw-workspace/20 - Knowledge/Research/ai-daily-briefing/YYYY-MM-DD.md
```

---

### 7. daily-research-summary-discord
- **ID:** `08c12871-0c1b-49b1-8335-53e48cbe0c0a`
- **Schedule:** Daily at 8:30 AM PST
- **Status:** ✅ Idle (hasn't run yet)

**Current message (WRONG paths):**
```
Read: ~/openclaw-workspace/research/market-intelligence/
Read: ~/openclaw-workspace/research/ai-daily-briefing/
```

**Should be:**
```
Read: ~/openclaw-workspace/20 - Knowledge/Research/market-intelligence/
Read: ~/openclaw-workspace/20 - Knowledge/Research/ai-daily-briefing/
```

---

## Recommended Actions

### Option 1: Manual Updates (More Control)
I can help you update each cron job one by one using `openclaw cron edit` commands.

### Option 2: Delete and Recreate
Delete the broken ones and recreate with correct paths. Cleaner but loses history.

### Option 3: Let Me Fix Them
I can prepare the exact commands needed to update each job.

---

## Questions for You

1. **Duplicate job?** Job #4 (Daily Market & AI Reports) vs Jobs #5+#6 - keep both or remove the duplicate?

2. **Delivery preferences?** 
   - daily-reflection: Currently tries to announce but failing - where should it deliver?
   - market/AI reports: Discord DM (user 276969555014975488) - still want this?

3. **Should I proceed with fixes?** Which option above do you prefer?

---

## File Location

This audit saved to: `00 - Inbox/Requests/agent-request/2026-02-20-cron-audit-and-fixes.md`
