---
name: observability-bootstrap
description: >
  Production observability baseline skill for logs, metrics, traces, alerts,
  and SLI/SLO definitions with implementation-ready rollout and validation.
updated: 2026-06-08
version: 2.0
last-reviewed: 2026-06-08
---

# observability-bootstrap (v2.0)

Bootstrap practical, low-noise observability so teams can detect, diagnose,
and resolve incidents quickly.

## Trigger Signals
Use when user asks to:
- add observability to a service/system
- improve telemetry quality (logs/metrics/traces)
- define baseline alerting and SLI/SLOs
- remove production blind spots

## Modes
- `audit-only` (default): assess current telemetry and gaps
- `bootstrap-plan`: implementation plan + starter artifacts
- `patch-safe`: apply low-risk instrumentation/config updates (with confirmation)

## Inputs
- service type (`api`, `worker`, `webhook`, `frontend`, `mixed`)
- environment tiers (`dev/stage/prod`)
- incident priorities / reliability targets (if available)

## Coverage Model
1. **Logs**: structured, correlated, redacted
2. **Metrics**: latency, throughput, errors, saturation
3. **Traces**: end-to-end request/dependency visibility
4. **Alerts**: actionable and owner-mapped
5. **SLI/SLO**: measurable reliability objectives + error budget

## Workflow
1. Identify top critical user/API/background flows.
2. Audit current telemetry pipeline and instrumentation coverage.
3. Score maturity and map high-impact gaps.
4. Define minimum viable observability baseline per flow.
5. Draft SLI/SLO and alert policy with ownership/runbook mapping.
6. Produce rollout plan (Phase 1/2/3) + verification checklist.

## Minimum Baseline Checklist
- [ ] Request/trace IDs propagated end-to-end
- [ ] Structured logs include service/env/severity/correlation fields
- [ ] PII/secrets redaction policy enforced
- [ ] Golden signals captured for critical services
- [ ] At least one SLI/SLO per critical flow
- [ ] Alerts contain owner + runbook + clear trigger/resolution hints
- [ ] Dashboard exists for top 3 critical flows

## Output Contract
Return exactly:
1. Observability maturity summary
2. Gap table (`priority | area | current | missing | impact | fix`)
3. Phase rollout plan (1/2/3)
4. SLI/SLO + alert starter recommendations
5. Verification checklist + next actions

## Fail Conditions
Mark as `not-operationally-ready` if:
- critical flow has no alertable error signal
- no correlation ID/trace propagation on key paths
- no ownership/runbook mapping for high-severity alerts

## Templates
Use:
- `templates/sli-slo-template.md`
- `templates/alert-policy-template.md`

## Guardrails
- Prefer vendor-neutral standards unless user requests specific stack
- Balance visibility with telemetry cost (sampling/retention guidance)
- Never log secrets or sensitive personal data
- Optimize for actionable alerts, not alert volume
