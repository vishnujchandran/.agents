---
name: test-suite-forge
description: >
  Build production-grade, industry-ready test suites tailored to the project
  stack: unit, integration, API/contract, and end-to-end tests with CI gating,
  flake resistance, and measurable coverage goals.
updated: 2026-06-08
version: 1.0
---

# test-suite-forge

Create the **best practical test suite for the current project** with a risk-based,
stack-aware approach.

## Trigger Signals
Use when user asks to:
- create a complete test suite for a project
- improve weak or missing tests
- make tests production-ready / CI-ready
- add regression protection before release

## Mission
Generate a reliable, maintainable test architecture that balances speed and confidence:
- Fast feedback for developers
- High confidence for production deploys
- Low flake rate and clear failure diagnostics

## Modes
- `audit-plan` (default): analyze current tests and output full plan + backlog
- `scaffold-core`: create foundational test structure and starter suites
- `harden-existing`: improve reliability/coverage of existing test suites

## Phase 1 — Project Discovery (Required)
1. Detect stack (language, framework, package manager, test tooling).
2. Detect existing tests, CI workflows, and coverage setup.
3. Map critical flows:
   - auth/session
   - data writes/mutations
   - payments/billing
   - permissions/roles/tenancy
   - external integrations/webhooks
4. Classify modules by risk and business impact.

## Phase 2 — Test Strategy Design
Build a project-specific testing pyramid:
- **Unit tests**: pure logic, utilities, domain rules
- **Integration tests**: db/repository/service + API handlers
- **Contract/API tests**: request/response schemas, status, error contracts
- **E2E tests**: top critical user journeys only

Define target split (adjust per project):
- Unit: 60–75%
- Integration: 20–30%
- Contract/E2E: 5–15%

## Phase 3 — Suite Generation Rules
When generating tests, enforce:
1. Deterministic tests (fixed time/randomness, isolated state)
2. Proper setup/teardown and fixture factories
3. Data builders over brittle hardcoded fixtures
4. Avoid oversnapshotting
5. Explicit assertions (behavior > implementation details)
6. Regression tests for known bug paths
7. Security/permission test cases for sensitive operations
8. Performance sanity tests for critical hotspots (where relevant)

## Phase 4 — CI/Production Readiness
Require:
- Parallel-friendly test execution
- Separate fast suite vs full suite commands
- Coverage reports in CI
- Flaky test detection and quarantine policy
- Fail-gate policy for critical path regressions

Recommended gates:
- PR gate: unit + integration + changed-path tests
- Main gate: full suite + coverage + contract checks

## Coverage & Quality Targets
Use risk-weighted targets (not vanity percentages):
- Critical business paths: >= 90% branch coverage
- Core services/APIs: >= 80% line + branch coverage
- Overall repo baseline: >= 70% initially, then ratchet upward

Also track:
- test runtime budget
- flaky rate
- escaped defect rate

## Output Contract
Return exactly:
1. Test maturity summary (current vs target)
2. Recommended stack/tooling (only if needed)
3. Test architecture map by layer
4. Prioritized backlog: `P0/P1/P2 | area | test type | reason`
5. Generated/updated test files list
6. CI commands and gate policy
7. Remaining risks + next improvements

## Priority Model
- **P0**: critical flow untested (auth, writes, payments, permissions)
- **P1**: major service/API paths with weak assertions or flaky behavior
- **P2**: low-impact coverage gaps and cleanup

## Framework Mapping (Auto-select)
- JS/TS: Vitest/Jest + Testing Library + Playwright/Cypress + Supertest
- Python: pytest + pytest-cov + requests/httpx + Playwright
- Go: testing + testify + httptest + integration with testcontainers
- Java: JUnit 5 + Mockito + Spring test + RestAssured
- .NET: xUnit/NUnit + FluentAssertions + WebApplicationFactory

(Use project’s existing stack first; avoid unnecessary tool churn.)

## Guardrails
- Do not claim tests pass unless actually executed
- Prefer minimal diffs and additive safe changes
- Never rewrite entire test stack without user approval
- Keep tests readable and maintainable for the team
- If runtime is too slow, propose split/shard strategy
