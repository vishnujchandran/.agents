---
name: session-close
description: >
  Restart-safe session closer that captures completed work, pending priorities,
  blockers, and a copy-paste resume prompt for the next session.
updated: 2026-06-08
version: 2.0
last-reviewed: 2026-06-08
---

# session-close (v2.0)

Close a development session with a complete, actionable handoff.

## Trigger Signals
Use when user asks to:
- end today’s session
- checkpoint current progress
- prepare tomorrow restart notes
- create a resume prompt

## Inputs
- session objective (from open)
- completed tasks and validation results
- changed files / branches / pending PR notes

## Workflow
1. Summarize completed outcomes against session objective.
2. Capture changed files and rationale.
3. Record verification status (tests/lint/build run or not run).
4. List remaining work with P0/P1/P2 priority.
5. Capture blockers, risks, and assumptions.
6. Generate explicit resume prompt with first command/action.
7. Save checkpoint artifact.

## Output Contract
Return exactly:
1. Completed work summary
2. Changed files + why
3. Verification status
4. Pending TODOs (P0/P1/P2)
5. Open issues/blockers
6. Next-session resume prompt

## Fail Conditions
Mark close status as `incomplete` if:
- critical changes were made without verification status
- pending P0 items are undocumented
- resume prompt lacks a first actionable step

## Templates
Use `templates/session-close-template.md` for consistent checkpoint output.

## Guardrails
- Be factual and traceable
- Do not claim tests passed unless executed
- Keep summary concise but restart-complete
