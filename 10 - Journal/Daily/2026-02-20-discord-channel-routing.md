# Discord Channel Routing Configuration

**Date:** 2026-02-20
**Goal:** Route automated summaries to ClawValley Discord server channels instead of DMs

---

## Target Channels on ClawValley Server

Need to configure delivery to:

1. **#ai-news** → AI Daily Briefing (8:10 AM PST)
2. **#market-insights** → Stock Market Intelligence (8:00 AM PST)
3. **#bulletin-board** → Personal reminders and notifications

**Current:** All three send Discord DMs
**New:** Send to respective channels on ClawValley server

---

## Channel IDs ✅

| Channel | Name | Channel ID | Status |
|---------|------|------------|--------|
| AI News | #ai-news | 1474308824914464880 | ✅ Captured |
| Market Insights | #market-insights | 1474308765682499666 | ✅ Captured |
| Bulletin Board | #bulletin-board | 1474306898785337397 | ✅ Captured |

**Known from ClawValley:**
- Guild (Server): ClawValley
- Example channel: #random-stuff-qa (ID: 1474310117938954300)

---

## Files to Update

### 1. Playbooks
- `/home/ubuntu/openclaw-vault/20 - Knowledge/Playbooks/market-intelligence.md`
- `/home/ubuntu/openclaw-vault/20 - Knowledge/Playbooks/ai-daily-briefing.md`
- `/home/ubuntu/openclaw-vault/20 - Knowledge/Playbooks/daily-research-summary.md` (if exists)

### 2. Cron Jobs
- `stock-market-insight-daily` (cfd6d4a2) → #market-insights
- `ai-daily-briefing` (3af239cb) → #ai-news
- `daily-research-summary-combined` (ab0aa22d) → Remove or redirect
- Personal reminders → #bulletin-board

---

## Next Steps

1. ✅ Identify target channels
2. ⏳ Get channel IDs (need user to message in each channel)
3. ⏳ Update playbooks with Discord channel targets
4. ⏳ Update/recreate cron jobs
5. ⏳ Test delivery tomorrow morning

---

## Notes

- User wants NO DMs for these three categories
- All automated updates go to ClawValley server channels
- Individual reports (AI/market) should post to their respective channels
- Combined summary might be redundant if both post separately
