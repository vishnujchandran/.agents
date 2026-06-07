---
name: sec-audit
description: >
  Production web application security audit skill for Next.js + Supabase stacks,
  with proof-based findings, prioritization, and CI-ready gate guidance.
updated: 2026-06-08
version: 2.0
last-reviewed: 2026-06-08
---

# sec-audit (v2.0)

Security copilot for modern web apps (Next.js + Supabase + Vercel oriented).

## Trigger Signals
Use when user asks to:
- review web app security posture
- fix vulnerabilities before release
- harden auth/API/webhook security
- validate Supabase Auth/RLS/Storage controls

## Inputs
- scope (`changed-files`, `module`, `full-repo`)
- deployment target (`dev`, `stage`, `prod`)
- optional risk tolerance (`strict`, `balanced`)

## Stack Profile
- Next.js 16+ (App Router)
- Supabase (Postgres/Auth/Storage)
- Zod validation patterns
- Vercel runtime/deploy model

## Workflow
### 1) Fast Scan (if scanner exists)
Try in order:

```bash
node ~/.agents/skills/sec-audit/tools/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high
node ./.agents/skills/sec-audit/tools/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high
node ./examples/sec-audit/bin/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high
```

### 2) Manual Deep Review
- `NEXT_PUBLIC_*` leakage and client-side secret exposure
- Supabase service-role misuse and key boundary breaks
- Missing auth/ownership checks on mutations (IDOR/BOLA style)
- Missing strict Zod validation on input paths
- XSS/injection/SSRF/open redirect risks
- Webhook signature + replay protection gaps
- Supabase RLS/policy correctness and bypass risks
- Storage bucket exposure/overwrite/public link risks
- Security headers, CORS, and error leakage posture

### 3) Verification
- Re-check patched paths
- Confirm no sensitive data in logs/errors
- Validate authz and policy assumptions with test cases/checklists

## Severity Model
- **Critical**: auth bypass, service-role exposure, RLS bypass, unsigned webhook acceptance
- **High**: exploitable IDOR/BOLA, missing authz on sensitive actions, replayable webhooks
- **Medium**: weak validation, broad CORS, verbose errors, partial hardening gaps
- **Low**: non-critical hygiene issues

## Output Contract
Return exactly:
1. Executive summary
2. Findings table (`severity | confidence | file | issue | impact | fix`)
3. Evidence appendix (sanitized proof for critical/high)
4. Priority plan (P0/P1/P2)
5. Minimal-diff patch plan
6. CI gate recommendation (`pass/fail` + rationale)

## Fail Conditions
Mark as `not-release-ready` if:
- any unresolved Critical exists
- unresolved High findings on auth/authz/data-protection paths
- missing verification for patched high-risk issues

## Templates
Use:
- `templates/finding-template.md`
- `templates/ci-gate-template.md`

## Behavior Constraints
- Never exfiltrate code, credentials, or secrets
- Never provide destructive exploit instructions
- Never auto-delete files
- Prefer least privilege and secure defaults
- Do not apply destructive changes without confirmation

## Fallback
If scanner is missing, perform full manual review using same output contract and provide install-ready scanner instructions.
