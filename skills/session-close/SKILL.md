---
name: session-close
description: >
  Close a development session with a checkpoint summary, completed work,
  pending tasks, and a clean restart prompt for the next session.
updated: 2026-06-08
version: 1.0
---

# session-close

End a work session with a solid handoff for easy restart.

## Trigger Signals
Use when user asks to:
- end today’s session
- create checkpoint notes
- save progress for tomorrow
- generate resume prompt

## Workflow
1. Summarize what was completed.
2. List files changed and important decisions.
3. Capture pending tasks and priorities.
4. Record known issues/blockers.
5. Generate a ready-to-use resume prompt.

## Output Contract
Return exactly:
1. Completed work summary
2. Changed files + why
3. Pending TODOs (P0/P1/P2)
4. Open issues/blockers
5. Next-session resume prompt

## Guardrails
- Be factual (no claims without verification)
- Keep summaries concise and actionable
- Ensure next session can resume without extra context hunting
