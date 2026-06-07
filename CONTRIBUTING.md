# Contributing

Thanks for contributing to this skills repository.

## What to Contribute
- New reusable skills (`skills/<skill-name>/SKILL.md`)
- Improvements to existing skills
- Templates/examples/evaluation docs for existing skills

## Skill Submission Checklist
A skill PR should include:
1. `skills/<skill-name>/SKILL.md`
2. Frontmatter fields:
   - `name`
   - `description`
   - `updated`
   - `version`
   - `last-reviewed`
3. Required sections:
   - Trigger Signals
   - Inputs
   - Workflow
   - Output Contract
   - Fail Conditions
   - Guardrails
4. Any referenced template files under `skills/<skill-name>/templates/`
5. (Preferred) `examples/input.md` + `examples/output.md`
6. (Preferred) `EVAL.md` with pass/fail criteria

## Quality Bar
- Actionable, testable, and concise instructions
- No fabricated claims or unverified execution statements
- Clear safety posture (no secret exfiltration, no unsafe destructive guidance)
- Minimal ambiguity in output format

## Pull Request Format
Please include:
- **What changed**
- **Why it changed**
- **How it was validated**
- **Breaking changes** (if any)

## Naming Conventions
- Use lowercase kebab-case for skill directory names
- Keep skill names short and purpose-specific

## Review Expectations
Maintainers will check:
- structure compliance (see `QUALITY.md`)
- link/template consistency
- practical usefulness and safety

## Versioning
- Bump `version` when behavior changes significantly
- Update `last-reviewed` on every quality pass
- Add notable updates to `CHANGELOG.md`
