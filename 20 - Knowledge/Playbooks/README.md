# Playbooks

Reusable procedures, workflows, and how-to guides for recurring tasks.

## Purpose

This folder contains **executable instructions** for tasks that Claw performs regularly or on-demand. These are your custom workflows and processes.

**Priority:** Instructions in playbooks override default behavior - if a playbook exists for a task, follow it exactly.

## Current Playbooks

### Daily Routines
- **`daily-reflection.md`** - How to conduct daily reflections
- **`ai-daily-briefing.md`** - AI news and updates briefing workflow
- **`market-intelligence.md`** - Market intelligence gathering process

## Creating New Playbooks

When adding a new playbook:
1. Use clear, descriptive filename (e.g., `weekly-report-generation.md`)
2. Include:
   - **Purpose:** What this playbook does
   - **Trigger:** When to run (daily, on-demand, etc.)
   - **Steps:** Clear, numbered instructions
   - **Outputs:** Where results go
   - **Notes:** Any special considerations

## Organization

```
Playbooks/
├── README.md (this file)
├── daily-reflection.md
├── ai-daily-briefing.md
├── market-intelligence.md
└── [future playbooks]
```

For complex workflows, consider subfolders:
```
Playbooks/
├── daily-routines/
├── reports/
└── automation/
```

---

_Referenced in AGENTS.md as the source for task-specific instructions._
