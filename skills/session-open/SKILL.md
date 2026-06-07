---
name: session-open
description: >
  Start a development session with clear scope, context restore, priorities,
  and an actionable execution plan so work can continue seamlessly.
updated: 2026-06-08
version: 1.0
---

# session-open

Open a work session in a restart-safe way.

## Trigger Signals
Use when user asks to:
- start today’s coding session
- continue from where we left off
- restore context after interruption
- set focus and priorities for this session

## Workflow
1. Restore recent context (latest notes/tasks/changes if available).
2. Define session goal and success criteria.
3. List top priorities (P0/P1/P2).
4. Create a short execution plan (first 3 concrete actions).
5. Identify blockers/unknowns and assumptions.

## Output Contract
Return exactly:
1. Restored context summary
2. Session objective
3. Prioritized task list (P0/P1/P2)
4. Immediate next 3 actions
5. Risks/blockers

## Guardrails
- Keep scope realistic for one session
- Surface missing context explicitly
- Prefer actionable steps over long plans
