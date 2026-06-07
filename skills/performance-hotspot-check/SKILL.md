---
name: performance-hotspot-check
description: >
  Evidence-first performance analysis skill that identifies high-impact
  bottlenecks in app code, database access, and API calls with safe,
  minimal-diff optimization plans.
updated: 2026-06-08
version: 2.0
---

# performance-hotspot-check (v2.0)

Find real bottlenecks and optimize highest-impact hotspots first.

## Trigger Signals
Use when user asks to:
- find slow app/API paths
- diagnose latency spikes
- optimize DB/API-heavy workflows
- reduce response time, compute cost, or build/runtime overhead

## Modes
- `analyze-only` (default): bottleneck report + optimization plan
- `patch-safe`: apply low-risk optimizations after user confirmation

## Baseline First (Required)
Capture current metrics before recommending fixes:
- latency (p50/p95/p99 where possible)
- DB query count/time for hot requests
- external API call count/time
- CPU/memory symptoms if available

## What It Checks
- Repeated expensive computation on hot paths
- N+1 query patterns and missing indexes
- Unbounded pagination/filtering/sorting
- Serial external calls that can be reduced/batched/cached
- Over-fetching and heavy payload construction
- Blocking sync operations in latency-sensitive paths

## Workflow
1. Identify critical user/API paths and frequency.
2. Collect baseline metrics and evidence.
3. Locate bottlenecks in code, DB, and external calls.
4. Rank by impact (`latency × frequency × cost`).
5. Propose minimal, low-risk optimizations.
6. Define before/after verification plan.

## Output Contract
Return exactly:
1. Hotspot summary with baseline evidence
2. Findings table: `priority | area | file | bottleneck | impact | fix`
3. Top 5 optimizations first
4. Measurement plan (before/after metrics)
5. Rollback notes for risky changes (if any)

## Priority
- **P0**: major user-facing latency/cost bottlenecks
- **P1**: medium-impact inefficiencies on common paths
- **P2**: low-impact cleanup opportunities

## Guardrails
- No optimization without evidence
- Never trade correctness/security for speed
- Prefer minimal diffs and reversible changes
- Call out assumptions explicitly when profiling data is incomplete
