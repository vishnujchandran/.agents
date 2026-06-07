---
name: observability-bootstrap
description: >
  Bootstrap practical observability for applications by defining and validating
  essential logs, metrics, traces, alerts, and service-level indicators.
updated: 2026-06-08
version: 1.0
---

# observability-bootstrap

Set up baseline observability so teams can detect, diagnose, and resolve issues fast.

## Trigger Signals
Use when user asks to:
- add observability to a service/app
- improve logs/metrics/traces coverage
- define SLI/SLO and alerting basics
- troubleshoot production blind spots

## Modes
- `audit-only` (default): assess current coverage and gaps
- `bootstrap-plan`: provide implementation plan and templates
- `patch-safe`: apply minimal config/code instrumentation updates (with confirmation)

## Coverage Model
1. **Logs**: structured, correlated, redacted
2. **Metrics**: latency, throughput, error rate, saturation
3. **Traces**: request path visibility across internal/external dependencies
4. **Alerts**: actionable and low-noise thresholds
5. **SLI/SLO**: measurable reliability targets

## Workflow
1. Identify critical user/API/background-job flows.
2. Audit existing instrumentation and telemetry pipeline.
3. Map gaps by severity and incident impact.
4. Propose minimum viable observability baseline.
5. Define alert rules and runbook hooks.
6. Provide rollout plan and verification checklist.

## Minimum Baseline Checklist
- [ ] Request ID / trace ID propagated end-to-end
- [ ] Structured logs with severity, service, env, correlation ID
- [ ] Redaction for secrets, tokens, and PII
- [ ] Golden signals captured (latency, traffic, errors, saturation)
- [ ] Error budget/SLO targets defined for critical services
- [ ] Alerts include clear condition, owner, and response runbook
- [ ] Dashboard for top 3 critical flows

## Output Contract
Return exactly:
1. Observability maturity summary
2. Gap table: `priority | area | current_state | missing | impact | fix`
3. Minimal bootstrap plan (phase 1/2/3)
4. Alert + SLI/SLO starter recommendations
5. Verification checklist and next actions

## Priority Model
- **P0**: no visibility on critical failures, missing error alerts, no trace correlation
- **P1**: partial metrics/logging on important paths
- **P2**: dashboard and signal-quality improvements

## Guardrails
- Prefer vendor-neutral patterns unless user asks specific stack
- Keep telemetry costs in mind (sampling/retention guidance)
- Never log secrets or sensitive personal data
- Prioritize actionable alerts over alert volume
