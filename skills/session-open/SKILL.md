---
name: session-open
description: >
  Restart-safe session starter that restores context, validates readiness,
  and creates a focused execution plan for the current development session.
updated: 2026-06-08
version: 2.0
last-reviewed: 2026-06-08
---

# session-open (v2.0)

Open a development session with enough structure that work can resume quickly
without re-discovery overhead.

## Trigger Signals
Use when user asks to:
- start today’s coding session
- continue from where we stopped
- recover context after interruption
- define focus for current session

## Inputs
- optional: previous checkpoint file (`SESSION_CHECKPOINT.md` or equivalent)
- optional: current branch / open PR / issue ID
- optional: available work window (e.g., 30m, 2h)

## Workflow
1. Load latest checkpoint or reconstruct from recent changes/tasks.
2. Summarize restored context (what, why, current state).
3. Validate context completeness (missing details, blockers, assumptions).
4. Define session objective + done criteria.
5. Create prioritized plan (P0/P1/P2) with first 3 executable actions.
6. Produce restart artifact for current session start.

## Context Completeness Score
Score 0–5 and explain missing pieces:
- 0–1: missing critical context
- 2–3: partial context, proceed with caution
- 4–5: ready to execute

## Output Contract
Return exactly:
1. Restored context summary
2. Context completeness score + missing info
3. Session objective + done criteria
4. Prioritized tasks (P0/P1/P2)
5. Immediate next 3 actions
6. Risks/blockers

## Fail Conditions
Mark result as `blocked` if:
- no clear objective can be defined
- critical dependency/access/context is missing
- conflicting priorities cannot be resolved

## Templates
Use `templates/session-open-template.md` for consistent output.

## Guardrails
- Keep scope realistic for one session
- Prefer concrete actions over broad planning
- State assumptions explicitly
- Never fabricate restored context
