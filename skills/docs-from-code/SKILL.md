---
name: docs-from-code
description: >
  Generate and synchronize documentation from real code, scripts, configs,
  and tests to prevent documentation drift.
updated: 2026-06-08
version: 2.0
---

# docs-from-code (v2.0)

Keep README and docs aligned with actual code behavior.

## Trigger Signals
Use when user asks to:
- generate docs from code
- update stale README/docs after changes
- document setup, scripts, APIs, env vars, examples
- prepare release docs quickly and accurately

## Source-of-Truth Order
Use this precedence when conflicts exist:
1. runtime code and handlers
2. tests/contract tests
3. config/scripts/package manifests
4. existing docs

## Modes
- `sync-only` (default): update docs from verified behavior
- `scaffold-missing`: create missing doc sections/templates

## Workflow
1. Inspect source, scripts, configs, interfaces/routes.
2. Extract verified commands/options/env vars/examples.
3. Compare with existing docs and detect drift.
4. Apply minimal doc updates in-place.
5. Mark uncertain items as `Needs confirmation`.

## Standard Doc Sections
When applicable, maintain:
- Quick Start
- Setup & Prerequisites
- Commands (run/test/build/lint)
- Configuration & Environment Variables
- API/Usage Examples
- Troubleshooting

## Output Contract
Return exactly:
1. Drift summary (`stale claim | source | fix`)
2. Updated files list
3. Verified commands/examples
4. Remaining manual doc tasks

## Verification Rules
- Never document commands not found in project files or validated in context
- If command cannot be validated, label clearly as `Unverified`
- Never fabricate features or API behavior

## Constraints
- Keep docs concise and copy-paste friendly
- Preserve project tone/style unless user asks to rewrite
- Prefer incremental edits over full rewrites
