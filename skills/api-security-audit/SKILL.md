---
name: api-security-audit
description: >
  Ultimate API security audit and hardening skill for REST APIs, GraphQL APIs,
  and webhook endpoints. Use when user asks for API security review,
  authN/authZ fixes, schema/input validation, abuse prevention, CI security gates,
  or pre-deploy API hardening.
updated: 2026-06-08
version: 2.0
---

# api-security-audit (v2.0)

Production-grade API security skill focused **exclusively on API surfaces**:
REST, GraphQL, and webhooks.

## Trigger Signals
Use this skill when user asks to:
- audit or pentest API security
- harden REST/GraphQL/webhooks before release
- fix broken auth or authorization logic
- assess multitenancy isolation or IDOR/BOLA risks
- add rate limits, schema validation, anti-abuse controls
- add CI/CD security gates for API risk acceptance

## Scope
### In Scope
- REST endpoints (Express/Fastify/Nest/Next.js/Hono/Koa)
- GraphQL schemas/resolvers/context/middleware
- Webhook handlers and callback endpoints
- API authN/authZ, tenancy boundaries, secrets handling
- API gateway/edge controls (CORS, method/header restrictions, body limits)

### Out of Scope
- Frontend-only security issues unrelated to API behavior
- Non-security refactors
- General infra provisioning not tied to API security posture

---

## Operating Mode
1. **Discover** API attack surface
2. **Assess** against OWASP API Top 10 + protocol-specific controls
3. **Exploit safely** (proof-driven, non-destructive)
4. **Patch minimally** (least-diff secure fixes)
5. **Verify** via regression tests
6. **Gate** via CI policy

---

## Mandatory Standards Mapping

### OWASP API Security Top 10 (2023) Coverage
For every audit, explicitly evaluate and report pass/fail for:
- **API1** Broken Object Level Authorization (BOLA)
- **API2** Broken Authentication
- **API3** Broken Object Property Level Authorization (BOPLA)
- **API4** Unrestricted Resource Consumption
- **API5** Broken Function Level Authorization (BFLA)
- **API6** Unrestricted Access to Sensitive Business Flows
- **API7** Server-Side Request Forgery (SSRF)
- **API8** Security Misconfiguration
- **API9** Improper Inventory Management
- **API10** Unsafe Consumption of APIs

Also map critical findings to:
- OWASP ASVS v4 (where relevant)
- NIST SSDF intent tags (optional but preferred)

---

## Deep Audit Workflow

### Phase 1 — Inventory & Threat Model
- Enumerate endpoints, methods, versions, environments, auth modes
- Enumerate GraphQL operations, fields, mutations, subscriptions
- Enumerate webhook endpoints and accepted event types
- Classify sensitive flows: auth, billing, admin, PII/PHI, key lifecycle
- Build trust-boundary map: unauthenticated, user, admin, internal, third-party
- Flag shadow/deprecated endpoints and undocumented surfaces

### Phase 2 — AuthN/AuthZ and Tenancy Integrity
- Verify authentication on protected surfaces
- Validate token/session checks (expiry, rotation, revocation behavior)
- Test object-level auth for every entity read/write/delete (BOLA)
- Test function-level role gating for privileged actions (BFLA)
- Test property-level controls (mass assignment / hidden fields / over-posting)
- Validate tenant scoping in all queries and mutations
- Verify service-role/admin key isolation from public execution paths

### Phase 3 — Input, Schema, and Parser Security
- Enforce strict validation on all mutating operations
- Reject unknown fields and unsafe coercions
- Validate type/size/range/enum/format recursively for nested objects
- Enforce upload/content-type/body-size constraints
- Check injection defenses: SQL/NoSQL/LDAP/command/template/header injection
- Verify safe parser configuration for JSON, multipart, XML, YAML if used

### Phase 4 — Abuse, DoS, and Resource Controls
- Rate limits per IP + user + token + operation sensitivity
- Concurrency limits and budget controls per tenant
- Pagination caps and query window enforcement
- Request timeout and upstream timeout controls
- Expensive operation guards (search/report/export endpoints)
- Anti-automation controls on auth/recovery/OTP endpoints

### Phase 5 — GraphQL-Specific Hardening
- Resolver-level authorization, not only schema-level assumptions
- Depth limit, complexity cost limit, alias count limit
- Batched query and query count limits
- Introspection policy by environment (dev-only or authenticated internal)
- Disable/debug playground exposure in production unless justified
- Persisted queries / allowlist for high-risk deployments
- N+1 and resolver fanout abuse checks

### Phase 6 — Webhook-Specific Hardening
- Signature verification using **raw body** and provider algorithm
- Constant-time signature comparison
- Timestamp tolerance checks and clock-skew handling
- Replay protection (nonce/event ID dedupe store)
- Idempotent processing for repeated deliveries
- Event-type allowlist and schema validation
- Fail-closed verification path with secure logging

### Phase 7 — Data Exposure, Logging, and Error Hygiene
- Ensure no secrets/tokens/PII leaked in responses or logs
- Enforce response minimization for sensitive fields
- Standardized errors: no stack traces/internal metadata
- Verify audit logs for privileged actions and auth failures
- Verify log redaction of secrets and credential-like strings

### Phase 8 — Misconfiguration and Supply Chain at API Boundary
- CORS least-privilege origins/methods/headers/credentials policy
- Method allowlist and strict content negotiation
- Security headers at API edge where applicable
- Validate TLS/HSTS assumptions at ingress
- Check unsafe outbound API consumption patterns (API10)
- Validate third-party callback URLs against SSRF/open redirect abuse

### Phase 9 — Verification, Regression, and Gate
- Re-test all previously exploitable paths
- Add/adjust regression tests for fixed issues
- Run build/tests/lints/security checks
- Apply CI gate policy (see below)

---

## Framework Playbooks (Minimum)

### REST (Express/Fastify/Nest/Next/Hono)
- Route auth middleware coverage audit
- Ownership guard in service/repository layer (not only controller)
- DTO/schema validation strict mode
- Method + content-type + body-size constraints
- Rate-limit middleware on sensitive routes

### GraphQL (Apollo/Yoga/Mercurius/Helix)
- Auth in context + resolver-level guards
- Disable insecure defaults in production
- Complexity/depth/alias plugin enforcement
- Introspection/playground policy checks by environment

### Webhooks (Stripe/GitHub/Slack/Twilio pattern)
- Raw body retention for signature verification
- Provider-specific header extraction and canonical signing string
- Replay/idempotency store with TTL
- Provider event schema and event-type allowlist

---

## Proof-Based Finding Contract (Required)
Each finding must include:
1. **ID & Severity**
2. **OWASP mapping** (API#)
3. **Asset** (endpoint/mutation/webhook)
4. **Evidence**:
   - request example (sanitized)
   - observed response/behavior
   - exploit path and impact
5. **Root cause** (code/config location)
6. **Minimal fix** (code-level patch guidance)
7. **Verification steps** (how to prove fixed)
8. **Confidence**: High/Medium/Low

---

## AuthZ Matrix Requirement (Required)
Build and verify a matrix:
`role × endpoint/mutation × action × resource ownership × expected decision`

No release should pass if high-risk endpoints lack explicit matrix coverage.

---

## CI/CD Security Gate Policy (Required)

### Gate Defaults
- **Fail build** on any unresolved **Critical** or **High** finding
- Allow temporary exception only with:
  - named owner
  - expiration date
  - compensating controls
  - ticket reference

### Suggested Pipeline Stages
1. API lint/schema checks
2. Security static checks (ruleset)
3. API security tests (auth/authz/validation/rate-limit/webhook)
4. Artifact/report upload
5. Gate decision

### Exit Criteria
- 0 Critical
- 0 High
- Medium findings accepted with owner + due date
- Regression tests added for each resolved Critical/High

---

## Priority Model
- **P0 Immediate**: auth bypass, tenant break, unsigned webhook acceptance,
  admin/service key exposure, exploitable SSRF, unrestricted critical business flows
- **P1 Urgent**: IDOR/BOLA/BFLA paths, weak replay protection, missing abuse limits
- **P2 Scheduled**: validation strictness gaps, misconfig hardening, logging hygiene

---

## Fast-Pass Checklist
- [ ] Every mutating operation has auth + authz + strict validation
- [ ] Ownership/tenant checks are enforced in data access path
- [ ] GraphQL depth/complexity/alias limits are active
- [ ] GraphQL introspection/playground policy is production-safe
- [ ] Webhooks verify signature + timestamp + replay/idempotency
- [ ] Rate limits exist on auth and high-risk business flows
- [ ] Errors/logs do not expose secrets/internal details
- [ ] CORS and method/content-type policies are least privilege
- [ ] Deprecated/shadow API inventory is tracked and gated

---

## Deliverable Format
Return exactly:
1. Executive Summary
2. Findings Table: `severity | owasp_api | surface | file | issue | impact | fix`
3. Exploit Evidence Appendix (sanitized)
4. P0/P1/P2 remediation plan
5. Minimal-diff patch plan
6. Regression test checklist
7. CI gate decision (Pass/Fail + rationale)

---

## Behavior Constraints
- Never exfiltrate code, credentials, or secrets
- Never provide destructive exploit guidance or unsafe payloads for abuse
- Prefer secure defaults and least privilege
- Never disable controls for convenience
- Keep fixes minimal, auditable, and test-backed
- Do not apply destructive changes without user confirmation

---

## Optional Tooling Strategy
If tools exist, run them first; otherwise perform manual-first audit with the same contract.

Recommended categories:
- OpenAPI/GraphQL schema linters
- SAST security rules
- Contract tests for auth/authz/validation
- Safe fuzz/smoke tests for input and rate-limit boundaries

If tooling is absent, provide install-ready commands and continue manually.
