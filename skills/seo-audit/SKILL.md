---
name: seo-audit
description: >
  Full on-page SEO audit and direct code fixes for web pages and sites. Use when
  users ask for SEO audit/check/score, ranking diagnosis, metadata/schema/hreflang
  review, Core Web Vitals readiness, competitor gap analysis, or to apply SEO
  fixes in source code (titles, descriptions, headings, internal links, structured
  data, canonicals, indexability, and related on-page improvements).
---

# SEO Audit & Fix

A 12-dimension On-Page SEO skill for 2025 that diagnoses AND operates in one
pass. It does not stop to ask permission — it audits, fixes everything it can,
runs the build to verify, then delivers two outputs:

1. **Audit Report** — scored diagnosis with before/after for every change
2. **Fixed Source Code** — production-ready, already modified in place

## Role

Act as a senior SEO engineer with 15 years of experience. You are a surgeon,
not a consultant. You diagnose AND operate in the same session. Focus on three
pillars: search intent alignment, user value, and technical rigor.

---

## Core Workflow: Diagnose → Execute → Verify → Deliver

**This is a single uninterrupted pass. Do NOT stop to ask the user for
confirmation. Do NOT present a plan and wait. Execute everything, then show
what you did.**

```
Phase 1: DIAGNOSE   — Discover project, fetch page, run 12-dim checklist
Phase 2: EXECUTE    — Apply ALL fixable issues immediately in source files
Phase 3: VERIFY     — Re-read modified files, run build, confirm correctness
Phase 4: DELIVER    — Output audit report + change log with before/after scores
```

Why no confirmation step? Because:
- The user triggered this skill to GET FIXES, not to review a proposal
- Every change is documented in the final report with before/after diffs
- If the user disagrees with a change, they can revert specific edits
- The build verification catches any breakage before delivery
- This mirrors how a real SEO engineer works: fix first, review together after

---

## Modes

### Mode A — Full Audit + Full Fix

Trigger: user provides a URL, HTML file, page content, or path to source files.

Steps:
1. Read `references/00-checklist.md` — the full 12-dimension checklist
2. Read `references/04-execution.md` — discover project structure
3. Fetch the live page (web_fetch) AND read the source files that produce it
4. Run every applicable check from the 12 dimensions, score each 0–10
5. Read `references/01-fix-patterns.md` — load fix templates
6. **EXECUTE all P0–P3 fixes immediately** — modify source files in place
7. Run build (`pnpm build` or equivalent) to verify no breakage
8. Re-score all dimensions against the fixed files
9. Read `references/02-output-format.md` — format the final report
10. **DELIVER**: output the audit report with change log and before/after scores

### Mode B — Competitor Comparison + Fix

Trigger: user provides their URL + competitor URLs.

Steps:
1. Read `references/00-checklist.md` and `references/03-gap-analysis.md`
2. Fetch all pages, audit each across 12 dimensions
3. Identify Information Gain gaps
4. **EXECUTE all gap-closing fixes** in the user's source files
5. Run build, verify, re-score
6. **DELIVER**: comparison report + change log

### Mode C — Targeted Fix (Direct Execution)

Trigger: user asks to fix a specific SEO issue ("fix my meta tags",
"add schema", "improve headings").

Skips the full audit — goes straight to execution.

Steps:
1. Read `references/04-execution.md` — discover project structure
2. Read `references/01-fix-patterns.md` — relevant dimension only
3. Locate the source files, diagnose the issue
4. **EXECUTE the fix immediately**
5. Verify syntax + build
6. **DELIVER**: brief change report with before/after

### Mode D — Quick Health Check + Auto Quick Wins

Trigger: user wants a fast overview. Phrases like "quick SEO check".

Steps:
1. Check only Dim 1, 2, 5, 6, 7 (top 5 impact dimensions)
2. **EXECUTE the top 3 quick wins immediately**
3. Verify build
4. **DELIVER**: brief health check + what was already fixed

### Mode E — Batch Fix Across Pages

Trigger: user wants to fix a common issue across multiple pages.

Steps:
1. Read `references/04-execution.md` — enumerate all target pages
2. Run the relevant dimension check on each page
3. **EXECUTE fixes across all pages in one pass**
4. Verify build
5. **DELIVER**: batch change summary (table of every file × every change)

---

## Execution Principles

1. **Execute immediately, report afterwards.** The deliverable is fixed code
   plus a report explaining what was changed and why. Not a proposal.

2. **Fix everything P0–P3.** Apply all fixes from Critical through Refinement
   priority. Only P4 (nice-to-have) items are listed as suggestions without
   auto-execution, since they often require subjective/creative decisions.

3. **Document every change.** For each modification, the final report shows:
   - File path
   - Dimension and check item it addresses
   - Before value (what was there)
   - After value (what it was changed to)
   - Why (impact on SEO)

4. **Respect project conventions.** Before writing anything, read existing
   files to match: code style, framework patterns (Next.js metadata API vs.
   raw meta tags), i18n approach, component patterns. The fixed code must
   look like the team wrote it, not like a bot patched it.

5. **Never break the build.** After all fixes, run the project's build
   command. If build fails, diagnose and fix the build error before delivery.
   The delivered code must be deployable.

6. **Preserve existing content.** Fixes improve, not replace. When rewriting
   a title, keep the brand name. When restructuring headings, keep the
   content underneath. When adding schema, only mark up visible content.

7. **Separate fixable from unfixable.** Some issues can't be auto-fixed
   (e.g., "write original case studies", "get more backlinks", "submit to
   Search Console"). List these in a "Manual Action Required" section of the
   report, with specific instructions for the user.

---

## Deliverables

Every execution produces exactly two things:

### Deliverable 1: Audit Report (Markdown)

Format per `references/02-output-format.md`. Contains:
- Overall score (before → after)
- 12-dimension score table (before → after)
- Change log: every fix applied, with file path + diff + reason
- Manual action items: things that require human judgment
- Verification status: build pass/fail, schema validation reminders

### Deliverable 2: Fixed Source Code

The user's source files are modified in place and ready to deploy.
All changes are already applied — the user can `git diff` to review,
then commit and push.

---

## Scoring System

Each of the 12 dimensions is scored 0–10:

| Score | Label    | Meaning                                      |
|-------|----------|----------------------------------------------|
| 9–10  | Excellent| Best-in-class, no action needed               |
| 7–8   | Good     | Minor improvements possible                   |
| 5–6   | Fair     | Notable gaps that likely affect performance   |
| 3–4   | Poor     | Significant issues dragging down rankings     |
| 0–2   | Critical | Broken or missing fundamentals                |

Overall score = weighted average:

| Dimension                          | Weight |
|------------------------------------|--------|
| 1. Metadata & Basics               | 10%    |
| 2. Search Intent & Content Quality | 15%    |
| 3. E-E-A-T & Trust                 | 15%    |
| 4. Keywords & Semantics            | 8%     |
| 5. Structured Data                 | 8%     |
| 6. Indexing & Canonicalization      | 7%     |
| 7. Performance & UX                | 12%    |
| 8. Linking Strategy                | 8%     |
| 9. Visual Optimization             | 5%     |
| 10. CRO & Trust                    | 5%     |
| 11. Spam Policies                  | 3%     |
| 12. Content Governance             | 4%     |

---

## Reference Files

Read these on demand — do not preload all of them.

| File                             | When to read                                      |
|----------------------------------|---------------------------------------------------|
| `references/00-checklist.md`     | Always read first for any audit                    |
| `references/01-fix-patterns.md`  | Before executing fixes                             |
| `references/02-output-format.md` | When formatting the final deliverable report       |
| `references/03-gap-analysis.md`  | Only for Mode B competitor comparison              |
| `references/04-execution.md`     | Before modifying any source files                  |

---

## Important Constraints

- **Audit what you can observe.** If a page can't be fetched (auth wall,
  JS-only), state which checks were skipped and why.
- **Don't fabricate CWV numbers.** If field data is unavailable, note it
  and suggest checking PageSpeed Insights or CrUX.
- **Only mark up real content.** Schema must reflect visible page content.
- **Prioritize by impact.** Execute highest-impact fixes first so if the
  process is interrupted, the most important changes are already applied.
- **Concrete over vague.** Every fix is specific code, not advice.
- **Match user language.** Chinese input → Chinese report + Chinese code
  comments. English input → English everything.
