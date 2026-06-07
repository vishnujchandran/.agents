# agents-skills

Public shareable agent skills from my local `.agents` workspace.

## Included

| Skill | Description | Best Use Cases |
|---|---|---|
| [`session-open`](skills/session-open/) | Start a dev session with context restore, priorities, and a focused action plan. | Restarting work quickly, reducing context-loss at session start |
| [`code-quality-check`](skills/code-quality-check/) | General code quality review for correctness, maintainability, readability, and testability. | PR quality pass, legacy cleanup planning, bug-risk reduction |
| [`test-suite-forge`](skills/test-suite-forge/) | Build production-grade, stack-aware test suites (unit/integration/contract/e2e) with CI gates and flake control. | Creating missing test architecture, hardening weak suites, release-grade regression safety |
| [`performance-hotspot-check`](skills/performance-hotspot-check/) | Evidence-first bottleneck detection for app, DB, and API performance hotspots. | Slow endpoint diagnosis, DB/API bottleneck analysis, latency optimization planning |
| [`observability-bootstrap`](skills/observability-bootstrap/) | Baseline observability setup: logs, metrics, traces, alerts, and SLI/SLO starter coverage. | New service observability baseline, alert/runbook setup, production blind-spot reduction |
| [`api-security-audit`](skills/api-security-audit/) | OWASP-aligned API security audit and hardening for REST, GraphQL, and webhooks. | AuthN/AuthZ audits, API abuse prevention, webhook signature/replay checks |
| [`sec-audit`](skills/sec-audit/) | Agentic web application security audit for Next.js + Supabase stacks (hardening, vuln review, pre-deploy checks). | Pre-deploy security review, Supabase RLS/auth/storage checks, webhook hardening |
| [`docs-from-code`](skills/docs-from-code/) | Sync and generate docs from real code/config/tests to prevent docs drift. | README refresh, setup/docs sync after changes, release documentation |
| [`seo-audit`](skills/seo-audit/) | Full on-page SEO audit and direct code-fix workflow (metadata, schema, indexability, CWV readiness). | SEO quick wins, metadata/schema fixes, ranking readiness audits |
| [`session-close`](skills/session-close/) | End a dev session with checkpoint notes, pending tasks, and resume-ready handoff. | Daily wrap-up, handoff notes, seamless next-session restart |

## Excluded (private)

| Skill |
|---|
| `skills/microsoft-foundry` |
| `skills/omniscience` |
