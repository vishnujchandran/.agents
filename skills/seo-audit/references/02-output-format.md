# 02 — Audit Report Output Format

Use this template for all audit reports. Adapt language to match the user's
language (Chinese, English, etc.).

---

## Mode A: Full Audit Report

```
# SEO 深度审计报告 / SEO Deep Audit Report

**Page:** [URL or file name]
**Audit Date:** [Date]
**Overall Score:** [XX / 100] — [Excellent / Good / Fair / Poor / Critical]

---

## 🚨 Top 3 Critical Issues

1. **[Issue title]** (Dimension X, Priority P0/P1)
   - Problem: [What's wrong]
   - Impact: [Why it matters for rankings/UX]
   - Fix: [Concrete fix with code/copy]

2. **[Issue title]** ...

3. **[Issue title]** ...

---

## 📊 Dimension Scores

| #  | Dimension                        | Score | Status |
|----|----------------------------------|-------|--------|
| 1  | Metadata & Basics                | X/10  | ✅/⚠️/❌ |
| 2  | Search Intent & Content Quality  | X/10  | ✅/⚠️/❌ |
| 3  | E-E-A-T & Trust                  | X/10  | ✅/⚠️/❌ |
| 4  | Keywords & Semantics             | X/10  | ✅/⚠️/❌ |
| 5  | Structured Data                  | X/10  | ✅/⚠️/❌ |
| 6  | Indexing & Canonicalization       | X/10  | ✅/⚠️/❌ |
| 7  | Performance & UX                 | X/10  | ✅/⚠️/❌ |
| 8  | Linking Strategy                 | X/10  | ✅/⚠️/❌ |
| 9  | Visual Optimization              | X/10  | ✅/⚠️/❌ |
| 10 | CRO & Trust                      | X/10  | ✅/⚠️/❌ |
| 11 | Spam Policies                    | X/10  | ✅/⚠️/❌ |
| 12 | Content Governance               | X/10  | ✅/⚠️/❌ |

Status key: ✅ Pass (7+) | ⚠️ Warn (4–6) | ❌ Fail (0–3)

---

## 🔍 Detailed Findings by Dimension

### Dimension 1: Metadata & Basics — [X/10]

**Title Tag** [pass/warn/fail]
- Current: "[actual title tag]"
- Issue: [description, if any]
- Recommended: "[rewritten title]"

**Meta Description** [pass/warn/fail]
- Current: "[actual meta description]"
- Issue: [description, if any]
- Recommended: "[rewritten description]"

**URL** [pass/warn/fail]
- Current: [URL]
- Issue: [description, if any]

**H1** [pass/warn/fail]
- Current: "[H1 text]"
- Issue: [description, if any]

**Heading Hierarchy** [pass/warn/fail]
- [Show the heading tree structure found]
- Issues: [any nesting violations]

[... repeat pattern for all 12 dimensions ...]

---

## 🛠 Prioritized Action Plan

| # | Action                          | Priority | Dimension | Est. Effort |
|---|---------------------------------|----------|-----------|-------------|
| 1 | [Specific action]               | P0       | Dim X     | 5 min       |
| 2 | [Specific action]               | P1       | Dim X     | 15 min      |
| 3 | [Specific action]               | P1       | Dim X     | 30 min      |
| ... | ...                           | ...      | ...       | ...         |

---

## 💡 AI Overview (AIO) Readiness

- [ ] Core conclusion in first 1–2 sentences
- [ ] Q&A-style subsections for key questions
- [ ] Structured for AI extraction
- Recommendation: [specific suggestions]
```

---

## Mode B: Competitor Comparison Report

```
# SEO 竞争对比报告 / SEO Competitor Gap Analysis

**Your Page:** [URL]
**Competitor:** [URL]
**Audit Date:** [Date]

---

## 📊 Score Comparison

| Dimension                        | Yours | Competitor | Gap  |
|----------------------------------|-------|------------|------|
| 1. Metadata & Basics             | X/10  | X/10       | ±X   |
| ...                              | ...   | ...        | ...  |
| **Overall**                      | XX    | XX         | ±XX  |

---

## 🎯 Information Gain Gaps

Areas where the competitor provides value your page does not:

1. **[Gap title]**
   - Competitor has: [what they offer]
   - Your page lacks: [what's missing]
   - Recommended action: [how to close the gap]

2. ...

---

## ✅ Your Competitive Advantages

Areas where your page is stronger:

1. **[Advantage]** — [why it matters]

---

## 🛠 Prioritized Actions to Close Gaps

| # | Action | Priority | Expected Impact |
|---|--------|----------|-----------------|
| 1 | ...    | P1       | High            |
```

---

## Mode D: Quick Health Check

```
# SEO Quick Health Check

**Page:** [URL]
**Date:** [Date]

| Dimension                  | Status | Notes             |
|----------------------------|--------|-------------------|
| Metadata & Basics          | ✅/⚠️/❌ | [one-liner]       |
| Search Intent & Quality    | ✅/⚠️/❌ | [one-liner]       |
| Structured Data            | ✅/⚠️/❌ | [one-liner]       |
| Performance & UX           | ✅/⚠️/❌ | [one-liner]       |
| Indexing & Canonicalization | ✅/⚠️/❌ | [one-liner]       |

**Top 3 Quick Wins:**
1. [Actionable fix]
2. [Actionable fix]
3. [Actionable fix]
```

---

---

## Change Log (always included — this IS the execution report)

All fixes have already been applied. This section documents every change
made, so the user can `git diff` to review and commit.

```
---

## 🔧 Changes Applied ([N] fixes executed)

### Fix 1: [Title] (P0 — Dim X) ✅
- **File:** `src/app/.../page.tsx`
- **Before:**
  ```
  title: "Old title that's too long and unfocused"
  ```
- **After:**
  ```
  title: "New Optimized Title | Brand"
  ```
- **Why:** [Impact on SEO]

### Fix 2: [Title] (P1 — Dim X) ✅
- **File:** `messages/tools/stamp-maker/en.json`
- **Before:**
  ```
  "description": "Old weak description"
  ```
- **After:**
  ```
  "description": "New CTA-driven description under 160 chars."
  ```
- **Why:** [Impact on SEO]

### Fix 3: [Title] (P1 — Dim X) ✅
- **File:** `src/app/.../page.tsx`
- **Added:** New JSON-LD structured data block
  ```json
  { "@context": "https://schema.org", "@type": "...", ... }
  ```
- **Why:** [Missing structured data → no rich results eligibility]

[... all fixes ...]

---

## 📊 Score Before → After

| Dimension          | Before | After | Δ    |
|--------------------|--------|-------|------|
| Metadata & Basics  | 4/10   | 8/10  | +4   |
| Structured Data    | 2/10   | 9/10  | +7   |
| ...                | ...    | ...   | ...  |
| **Overall**        | 52/100 | 78/100| +26  |

---

## 🏗 Build Verification

- Build command: `pnpm build`
- Result: ✅ Pass / ❌ Fail (with error details if failed)
- JSON validation: ✅ All modified JSON files are valid

---

## 🔴 Manual Action Required (not auto-fixable)

These issues were identified but require human judgment or external tools:

1. **[Item]** — [Why it can't be auto-fixed] — [Specific instructions]
2. **[Item]** — [Requires PageSpeed Insights field data]
3. **[Item]** — [Requires original content creation]

---

## 📋 Post-Deploy Checklist

- [ ] `git diff` to review all changes
- [ ] `git commit -m "seo: apply 12-dimension audit fixes"`
- [ ] Deploy to staging / preview
- [ ] Test with Google Rich Results Test
- [ ] Request re-crawl in Google Search Console
- [ ] Schedule follow-up audit in [X] weeks
```

---

## Formatting Rules

- Always show the actual current values found on the page (title, description,
  headings, etc.) so the user can verify the diagnosis
- Every fix must include before/after showing exactly what was changed
- Include code blocks for schema, HTML, and meta tag changes
- Use the priority framework from `01-fix-patterns.md` (P0–P4)
- The Change Log IS the execution proof — it shows what was already done,
  not what is proposed. Use past tense: "Changed", "Added", "Removed"
- Always include the before/after score comparison to show concrete improvement
- The "Manual Action Required" section clearly separates what was auto-fixed
  from what the user still needs to do themselves
- The "Post-Deploy Checklist" gives the user a clear path from receiving
  the deliverables to having the fixes live in production
- **Never end with a question.** The report is a deliverable, not a conversation.
  End with the Post-Deploy Checklist.
