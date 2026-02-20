# Suggestion: Add Morning Weather Check

**Created:** 2026-02-19  
**Type:** Automation Proposal

## Suggestion

Add a morning weather check to the heartbeat routine:
- Check weather for Gabby's location (PST timezone)
- Only notify if:
  - Significant temperature change (>20°F from yesterday)
  - Rain/snow expected
  - Extreme weather alerts

## Rationale

- Helps plan outdoor activities
- Proactive vs reactive (check before asking)
- Low noise (only notify when relevant)

## Implementation Approach

1. Use weather skill (wttr.in or Open-Meteo)
2. Add to HEARTBEAT.md as daily check
3. Store last notification in heartbeat-state.json
4. Simple text notification (no TTS needed)

---

## Resolution

**Resolved:** 2026-02-19 18:30 UTC  
**Decision:** ✅ Approved with modifications

### Outcome

Approved but with different trigger criteria:
- Check weather in morning (8:00 AM PST)
- Only notify if rain/snow OR temp <40°F OR >85°F
- No daily temp change comparison (too noisy)

### Implementation

Added to `HEARTBEAT.md`:
```markdown
- Weather check (8:00-9:00 AM PST only)
  - Rain/snow expected today
  - Temperature extremes (<40°F or >85°F)
```

### Output Locations

- Configuration: `/home/ubuntu/.openclaw/workspace/HEARTBEAT.md` (updated)
- Skill used: `~/.npm-global/lib/node_modules/openclaw/skills/weather/`

### Notes

First notification expected tomorrow morning. Will refine based on feedback.
