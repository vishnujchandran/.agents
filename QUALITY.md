# Skill Quality Standard (v1)

Use this rubric to keep all public skills production-grade and consistent.

## Required Frontmatter
- `name`
- `description`
- `updated`
- `version`
- `last-reviewed`

## Required Sections
1. Trigger Signals
2. Inputs
3. Workflow
4. Output Contract (explicit, numbered)
5. Fail Conditions
6. Guardrails / Constraints
7. Templates or References (if applicable)

## Output Quality Rules
- Must be actionable and verifiable
- Must separate facts from assumptions
- Must include priority model (`P0/P1/P2` when relevant)
- Must not claim commands/tests were run unless actually run
- Must cite source files/commands for factual technical claims when possible
- Must mark unknowns explicitly (no guessing/hallucinated certainty)

## Safety Rules
- Never exfiltrate secrets/code
- Never suggest destructive unsafe actions
- Prefer minimal, auditable changes

## Review Cadence
- Re-review each skill monthly or after major workflow changes
- Bump `version` on meaningful behavior changes
- Update `last-reviewed` on every quality pass
