# Skill Lint Checklist (CI)

Use this checklist for CI or manual validation.

## File/Structure Checks
- [ ] Every public skill has `skills/<name>/SKILL.md`
- [ ] Referenced template files exist
- [ ] Markdown links are valid

## Frontmatter Checks
- [ ] `name` exists
- [ ] `description` exists
- [ ] `updated` exists
- [ ] `version` exists
- [ ] `last-reviewed` exists

## Content Checks
- [ ] Has `Trigger Signals`
- [ ] Has `Inputs`
- [ ] Has `Workflow`
- [ ] Has `Output Contract`
- [ ] Has `Fail Conditions`
- [ ] Has `Guardrails`

## Safety Checks
- [ ] No instruction to exfiltrate secrets/code
- [ ] No unsafe destructive guidance
- [ ] No unverifiable claims policy violations

## Optional Excellence Checks
- [ ] `examples/input.md` and `examples/output.md` exist
- [ ] `EVAL.md` exists with measurable pass/fail criteria
