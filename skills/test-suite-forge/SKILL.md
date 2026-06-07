---
name: test-suite-forge
description: >
  Production-grade test suite engineering skill that designs and builds
  stack-aware unit, integration, contract, and end-to-end tests with CI gates,
  flake controls, and risk-weighted coverage targets.
updated: 2026-06-08
version: 2.0
last-reviewed: 2026-06-08
---

# test-suite-forge (v2.0)

Build an industry-ready test system tailored to the repo’s architecture and risk profile.

## Trigger Signals
Use when user asks to:
- create a complete test suite for a project
- harden weak or flaky tests
- make tests CI/release ready
- add regression protection before shipping

## Modes
- `audit-plan` (default): maturity audit + prioritized backlog
- `scaffold-core`: add foundational test structure and starter tests
- `harden-existing`: improve reliability/coverage/speed of existing suites

## Inputs
- target scope (`changed-files`, `module`, `full-repo`)
- release criticality (low/medium/high)
- current CI constraints (runtime budget, required gates)

## Phase 1 — Discovery (Required)
1. Detect language/framework/package manager/test tooling.
2. Inspect current tests, coverage setup, and CI workflows.
3. Map critical flows: auth, permissions, writes, money, external integrations.
4. Build risk map by module (`business impact × defect likelihood`).

## Phase 2 — Strategy Design
Create a project-specific test pyramid:
- **Unit**: deterministic business logic and utility behavior
- **Integration**: service + repository + DB boundaries
- **Contract/API**: schema/status/error contract guarantees
- **E2E**: smallest set of critical user journeys

Target ratio (adjust per stack):
- Unit: 60–75%
- Integration: 20–30%
- Contract/E2E: 5–15%

## Phase 3 — Generation Standards
All generated tests must follow:
1. Deterministic execution (time/random/network control)
2. Clear setup/teardown and isolated state
3. Reusable builders/factories over brittle fixtures
4. Assertions on behavior, not implementation details
5. Regression tests for prior defects and high-risk paths
6. Permission/security test cases on sensitive endpoints
7. Stable naming and readable test intent

## Phase 4 — CI/Release Hardening
Enforce:
- Fast lane and full lane test commands
- Parallel-ready configuration
- Coverage reporting in CI
- Flaky test detection/quarantine policy
- Gate policy for merge/release

Recommended gates:
- PR gate: unit + integration + changed-path tests
- Main gate: full suite + coverage + contract checks

## Coverage & Reliability Targets
Risk-weighted targets (not vanity):
- Critical paths: >= 90% branch coverage
- Core services/APIs: >= 80% line + branch coverage
- Repository baseline: >= 70% then ratchet up

Track additionally:
- suite runtime budget
- flaky test rate
- escaped defects

## Output Contract
Return exactly:
1. Test maturity summary (current vs target)
2. Tooling recommendation (only if required)
3. Test architecture map
4. Prioritized backlog (`P0/P1/P2 | area | test type | reason`)
5. Generated/updated test files
6. CI commands + gate policy
7. Remaining risks + next improvements

## Fail Conditions
Mark as `not-release-ready` if:
- critical flows lack regression coverage
- flaky rate is unresolved on critical suites
- no enforceable CI gate exists for required paths

## Framework Mapping (Use existing stack first)
- JS/TS: Vitest/Jest + Testing Library + Playwright/Cypress + Supertest
- Python: pytest + pytest-cov + requests/httpx + Playwright
- Go: testing + testify + httptest + testcontainers
- Java: JUnit 5 + Mockito + Spring Test + RestAssured
- .NET: xUnit/NUnit + FluentAssertions + WebApplicationFactory

## Templates
Use:
- `templates/test-backlog-template.md`
- `templates/ci-gate-template.md`

## Guardrails
- Never claim pass status unless tests were run
- Prefer additive minimal diffs over wholesale rewrites
- Avoid unnecessary tool churn
- Keep suites maintainable for the team operating them
