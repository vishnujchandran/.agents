---
name: sec-audit
description: >
  Agentic web application security skill for Next.js + Supabase stack projects.
  Use when user asks for security review, hardening, vulnerability fixes, or
  pre-deploy security checks.
updated: 2026-06-07
---

# sec-audit

Security copilot skill for modern web apps.

## Trigger Signals
Use this skill when user asks to:
- review/check web app security
- fix vulnerabilities before ship
- harden Next.js API/auth/webhooks
- validate Supabase RLS/Auth/Storage security
- enforce best practices for Next.js + Supabase + Vercel stack

## Stack Profile
- Next.js 16+ (App Router, Turbopack)
- Supabase (Postgres, Auth, Storage)
- Tailwind + shadcn/ui
- React Hook Form + Zod
- pnpm
- Vercel

## Workflow

### 1) Fast Scan (if scanner exists)
Try in this order:

```bash
# Global sec-audit skill scanner
node ~/.agents/skills/sec-audit/tools/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high

# Project-local sec-audit scanner (if repository ships one)
node ./.agents/skills/sec-audit/tools/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high

# Legacy/example fallback
node ./examples/sec-audit/bin/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high
```

### 2) Manual Review Focus
- Secrets leakage and `NEXT_PUBLIC_*` secret exposure
- Supabase service-role misuse
- Missing auth/ownership checks on mutating routes
- Missing Zod validation in mutating handlers
- XSS / injection / SSRF / open redirect patterns
- Webhook signature verification gaps
- Supabase RLS + policy posture
- Supabase Storage exposure/overwrite risks
- Security headers and deployment hygiene

### 3) Output Contract
Always return:
1. Executive summary
2. Findings table (severity | file | issue | impact | fix)
3. Priority plan (P0/P1/P2)
4. Minimal-diff patch plan
5. Safe next actions

## Behavior Constraints
- Never exfiltrate code or secrets.
- Never auto-delete files.
- Never apply destructive changes without user confirmation.
- Prefer least-privilege, secure defaults.

## Fallback
If scanner is missing, do manual review with the same focus areas and offer to scaffold/install the scanner pack.
