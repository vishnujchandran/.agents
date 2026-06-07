# agents-skills

Public shareable agent skills from my local `.agents` workspace.

## Included

| Skill | Description | Best Use Cases |
|---|---|---|
| [`sec-audit`](skills/sec-audit/) | Agentic web application security audit for Next.js + Supabase stacks (hardening, vuln review, pre-deploy checks). | Pre-deploy security review, Supabase RLS/auth/storage checks, webhook hardening |
| [`seo-audit`](skills/seo-audit/) | Full on-page SEO audit and direct code-fix workflow (metadata, schema, indexability, CWV readiness). | SEO quick wins, metadata/schema fixes, ranking readiness audits |
| [`api-security-audit`](skills/api-security-audit/) | OWASP-aligned API security audit and hardening for REST, GraphQL, and webhooks. | AuthN/AuthZ audits, API abuse prevention, webhook signature/replay checks |
| [`code-quality-check`](skills/code-quality-check/) | General code quality review for correctness, maintainability, readability, and testability. | PR quality pass, legacy cleanup planning, bug-risk reduction |
| [`docs-from-code`](skills/docs-from-code/) | Sync and generate docs from real code/config/tests to prevent docs drift. | README refresh, setup/docs sync after changes, release documentation |
| [`performance-hotspot-check`](skills/performance-hotspot-check/) | Evidence-first bottleneck detection for app, DB, and API performance hotspots. | Slow endpoint diagnosis, DB/API bottleneck analysis, latency optimization planning |
| [`observability-bootstrap`](skills/observability-bootstrap/) | Baseline observability setup: logs, metrics, traces, alerts, and SLI/SLO starter coverage. | New service observability baseline, alert/runbook setup, production blind-spot reduction |

## Excluded (private)

| Skill |
|---|
| `skills/microsoft-foundry` |
| `skills/omniscience` |
