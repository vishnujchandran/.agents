---
name: code-quality-check
description: >
  Top-tier code quality audit skill for correctness, maintainability,
  readability, and testability with prioritized, minimal-diff fixes.
updated: 2026-06-08
version: 2.0
---

# code-quality-check (v2.0)

Single general skill for code quality checks across repositories.

## Trigger Signals
Use when user asks to:
- check code quality
- review messy or legacy code
- improve maintainability/readability
- reduce bug risk without major rewrites

## Modes
- `analyze-only` (default): findings + fix plan, no code edits
- `patch-safe`: apply minimal, low-risk fixes after user confirmation

## Inputs
- target scope: changed files, module, or whole repo
- language/framework: auto-detect from project files
- optional focus: correctness, maintainability, testability, perf-smells

## Quality Dimensions
1. Correctness risk (null/edge cases, unsafe assumptions)
2. Maintainability (complexity, duplication, dead code)
3. Readability (naming, cohesion, module boundaries)
4. Testability (missing tests around critical logic)
5. Performance smells (hot loops, obvious anti-patterns)

## Workflow
1. Detect stack and project conventions (lint/format/tests).
2. Prioritize changed and high-risk files first.
3. Score findings using risk formula.
4. Propose minimal, safe remediations.
5. Add test recommendations for P0/P1 findings.

## Risk Scoring
`risk = impact × likelihood × change_surface`

- **P0**: likely bugs/correctness failures
- **P1**: high complexity/fragility on important paths
- **P2**: readability/style improvements

## Output Contract
Return exactly:
1. Quality summary (`High/Medium/Low`) + top risks
2. Findings table: `priority | confidence | file | issue | impact | fix`
3. Top 5 fixes first
4. Test plan for P0/P1 findings
5. Optional minimal-diff patch plan

## Fail Conditions
Mark result as `needs-work` if:
- any unresolved P0 exists
- critical path has no test recommendation
- proposed fix requires large rewrite outside requested scope

## Constraints
- Prefer minimal diffs over rewrites
- Do not invent project rules; follow existing conventions
- Distinguish correctness issues from style preferences
- Keep feedback specific, actionable, and evidence-based
