# 04 — Execution Playbook

This file defines HOW to apply SEO fixes to the user's source code.
Read this before modifying any file.

**Execution philosophy: no confirmation, no stopping.** Diagnose and fix in
one uninterrupted pass. Every change is documented in the final report so
the user can review via `git diff` after delivery. The build must pass
before delivery — if a fix breaks the build, fix the build error too.

---

## Phase 0: Project Discovery

Before touching anything, understand the project. Run these steps in order:

### Step 1: Identify Framework & Structure

```bash
# Check project root for framework signals
ls package.json next.config.* nuxt.config.* astro.config.* vite.config.*

# Read package.json for framework + dependencies
cat package.json | head -50

# Map the source directory
find src -type f -name "*.tsx" -o -name "*.jsx" -o -name "*.vue" \
  -o -name "*.astro" -o -name "*.html" | head -40
```

Detect and record:
- **Framework**: Next.js / Nuxt / Astro / plain HTML / other
- **Language**: TypeScript / JavaScript
- **i18n library**: next-intl / i18next / vue-i18n / none
- **CSS approach**: Tailwind / CSS Modules / styled-components / plain CSS
- **Message file pattern**: where i18n strings live

### Step 2: Locate the Target Page(s)

For a given URL path like `/tools/stamp-maker`:

```bash
# Find the page source file
find src -path "*/tools/stamp-maker*" -type f
find src -path "*/tools/stamp-maker*" -type d

# Find related message/content files
find messages -name "*stamp-maker*" -o -name "*stamp_maker*"

# Find layout files that wrap this page
find src -name "layout.tsx" -o -name "layout.jsx" | head -20
```

### Step 3: Understand Existing SEO Patterns

Before writing any fix, read how the project ALREADY handles SEO:

```bash
# How does the project set metadata?
grep -r "generateMetadata\|metadata\|Head\|useHead\|useSeoMeta" \
  src --include="*.tsx" --include="*.jsx" -l | head -10

# How does the project handle structured data?
grep -r "schema\|json-ld\|StructuredData\|JsonLd" \
  src --include="*.tsx" --include="*.jsx" -l | head -10

# How does the project handle hreflang / i18n routing?
grep -r "hreflang\|alternateLinks\|locale" \
  src --include="*.tsx" --include="*.jsx" -l | head -10

# Read one existing well-built page for reference patterns
# (pick a page that looks complete)
```

Record the conventions found. All fixes MUST follow these conventions.

---

## Fix Execution by Dimension

### Dim 1 — Metadata & Basics

#### Next.js (App Router) — generateMetadata

Locate: `page.tsx` or `layout.tsx` in the route directory.

**Pattern A: Static metadata export**
```typescript
// src/app/[locale]/(marketing)/tools/stamp-maker/page.tsx
export const metadata: Metadata = {
  title: "Optimized Title Here | Brand",
  description: "Optimized description with CTA here.",
  alternates: {
    canonical: "https://example.com/tools/stamp-maker",
  },
};
```

**Pattern B: Dynamic generateMetadata (i18n projects)**
```typescript
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "StampMaker" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://example.com/${locale}/tools/stamp-maker`,
    },
  };
}
```
In this case, fix the **message file** not the page file:
```json
// messages/marketing/tools/stamp-maker/en.json
{
  "meta": {
    "title": "Optimized Title | Brand",
    "description": "Optimized description with CTA."
  }
}
```

**Execution steps:**
1. Read the target page.tsx → check which pattern it uses
2. If Pattern A → str_replace the metadata object directly
3. If Pattern B → locate the message JSON file → str_replace the values
4. Verify: read the file again after modification

#### H1 and Heading Hierarchy

Headings live either in:
- The page component JSX (hardcoded)
- Message/content files (i18n)
- CMS data (cannot modify — flag to user)

```bash
# Find where headings are defined
grep -n "h1\|h2\|h3\|<H1\|<H2\|<H3\|HeroSection\|heading" \
  src/app/**/tools/stamp-maker/**/*.tsx
```

Fix approach:
1. If headings are in JSX → str_replace the heading elements
2. If headings come from message files → modify the message JSON
3. If headings come from a component prop → trace the prop to its source

---

### Dim 5 — Structured Data (Schema)

#### Check for Existing Schema Component

```bash
grep -r "StructuredData\|JsonLd\|json-ld\|application/ld+json" \
  src --include="*.tsx" --include="*.jsx" -l
```

**If project has a StructuredData component** (common in well-structured
Next.js projects):

```typescript
// The page probably already uses it:
<StructuredData data={schemaData} />

// Fix: modify the data object passed to it
const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",  // or Article, Product, etc.
  "name": "...",
  // ... complete schema
};
```

**If project has NO schema setup** — create it:

1. Check if there's a shared component to reuse:
   ```bash
   find src -name "*structured*" -o -name "*schema*" -o -name "*jsonld*"
   ```

2. If none exists, add inline JSON-LD to the page:
   ```typescript
   // Add to the page component's return JSX
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{
       __html: JSON.stringify({
         "@context": "https://schema.org",
         "@type": "Article",
         // ... full schema
       }),
     }}
   />
   ```

3. If the project has a layout that already injects schema, extend it
   rather than duplicating.

#### FAQ Schema from Page Content

If the page has a FAQ section, extract Q&A pairs and generate FAQPage schema:

```bash
# Find FAQ content
grep -n -A2 "faq\|FAQ\|frequently" src/app/**/stamp-maker/**/*.tsx
grep -n "faq\|FAQ" messages/**/stamp-maker/**/*.json
```

Build the schema from actual visible content — never fabricate questions.

---

### Dim 6 — Indexing & Canonicalization

#### Canonical Tags

In Next.js App Router, canonicals go in metadata:
```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: "https://example.com/tools/stamp-maker",
    languages: {
      "en": "https://example.com/en/tools/stamp-maker",
      "zh": "https://example.com/zh/tools/stamp-maker",
    },
  },
};
```

#### Hreflang (Multi-language)

Check how the project routes locales:
```bash
# Check i18n config
cat src/i18n.ts 2>/dev/null || cat next.config.* | grep -A10 "i18n"
# Check existing hreflang implementation
grep -r "hreflang\|alternateLinks" src --include="*.tsx" -l
```

If hreflang is set via metadata.alternates.languages (Next.js), ensure:
- All locale variants are listed
- x-default points to the primary locale
- Self-referencing entry exists

If hreflang is missing entirely, add it at the layout level so ALL pages
inherit it, then override on pages with custom paths.

#### Robots / Noindex

```bash
# Check for any noindex directives
grep -r "noindex\|robots" src --include="*.tsx" --include="*.jsx" -l
grep "noindex" public/robots.txt 2>/dev/null
```

Fix: ensure core pages are NOT noindexed. If a page should be noindexed:
```typescript
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};
```

---

### Dim 7 — Performance & UX

#### Image Optimization (LCP)

```bash
# Find hero/above-fold images
grep -n "img\|Image\|<Image\|hero.*img\|banner" \
  src/app/**/stamp-maker/**/*.tsx | head -20
```

Fix hero images:
```typescript
// Before (bad — lazy-loaded LCP element)
<Image src="/hero.jpg" alt="..." loading="lazy" />

// After (good — priority LCP element)
<Image src="/hero.webp" alt="..." priority width={1200} height={630} />
```

For Next.js `<Image>`, `priority` automatically adds fetchpriority="high"
and disables lazy loading.

#### Resource Hints in Layout

```bash
# Check layout/head for preconnect/preload
grep -n "preconnect\|preload\|dns-prefetch" src/app/**/layout.tsx
```

Add to the root or marketing layout:
```typescript
// In layout.tsx or via metadata.other
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
```

---

### Dim 8 — Linking Strategy

#### Internal Links

```bash
# Find all internal links on the page
grep -n "href=\"/\|<Link\|<a " src/app/**/stamp-maker/**/*.tsx
```

Check each link for:
- Descriptive anchor text (not "click here" or bare URLs)
- Links to relevant related pages
- No broken internal links (check that target routes exist)

Fix: str_replace anchor text to be descriptive.

#### External Links

Ensure outbound links have appropriate rel attributes:
```typescript
// Before
<a href="https://external.com">Link</a>

// After (if it's a reference/resource)
<a href="https://external.com" rel="noopener noreferrer" target="_blank">Link</a>

// After (if it's sponsored/affiliate)
<a href="https://partner.com" rel="sponsored noopener" target="_blank">Link</a>
```

---

### Dim 9 — Image Alt Text

```bash
# Find all images on the page
grep -n "alt=\|<img\|<Image" src/app/**/stamp-maker/**/*.tsx
```

For each image:
- If alt="" on a meaningful image → write a descriptive alt
- If alt is keyword-stuffed → rewrite to be accessibility-first
- If alt is missing entirely → add it

Check if alt text comes from message files:
```bash
grep -n "alt\|image.*desc" messages/**/stamp-maker/**/*.json
```

---

## Batch Execution (Mode E)

When fixing across multiple pages:

### Step 1: Enumerate all target pages

```bash
# Example: all tool pages
find src/app -path "*/tools/*/page.tsx" -type f
```

### Step 2: Build a fix matrix

For each page, check the specific dimension and record:
- File path
- Current value
- Proposed new value
- Fix type (str_replace target)

### Step 3: Execute in a loop

Apply fixes page by page, one str_replace per issue. After all changes
are applied, run the build to catch regressions before delivering.

### Step 4: Generate change summary

Output a table:
```
| File                                    | Change Type     | Status |
|-----------------------------------------|-----------------|--------|
| messages/tools/stamp-maker/en.json      | title rewrite   | ✅ Done |
| messages/tools/stamp-maker/en.json      | description fix | ✅ Done |
| src/app/.../stamp-maker/page.tsx        | add schema      | ✅ Done |
| src/app/.../stamp-maker/page.tsx        | fix hero image  | ✅ Done |
```

---

## Post-Execution Verification

After all fixes are applied, run these checks:

### 1. Syntax Verification

```bash
# TypeScript/JavaScript syntax check
npx tsc --noEmit 2>&1 | head -30

# Or if project uses a linter
npx eslint src/app/**/stamp-maker/**/*.tsx 2>&1 | head -20
```

### 2. JSON Validation

```bash
# Validate all modified JSON files
python3 -c "import json; json.load(open('messages/tools/stamp-maker/en.json'))"
```

### 3. Build Test

```bash
# Run the project build to catch any issues
pnpm build 2>&1 | tail -20
# or: npm run build 2>&1 | tail -20
```

### 4. Schema Validation Reminder

After modifying structured data, include in the report's Post-Deploy Checklist:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

### 5. Re-audit Score

Re-read the modified files and re-score the affected dimensions.
Present a before/after score comparison:

```
| Dimension          | Before | After | Change |
|--------------------|--------|-------|--------|
| Metadata & Basics  | 4/10   | 8/10  | +4     |
| Structured Data    | 2/10   | 9/10  | +7     |
| Overall            | 52/100 | 78/100| +26    |
```

---

## Framework-Specific Cheat Sheet

### Next.js App Router (most common case)

| SEO Element        | Where to modify                                    |
|--------------------|----------------------------------------------------|
| Title / Description| page.tsx `metadata` or `generateMetadata` + i18n JSON |
| Canonical          | metadata.alternates.canonical                       |
| Hreflang           | metadata.alternates.languages                       |
| Open Graph         | metadata.openGraph                                  |
| Robots             | metadata.robots                                     |
| Schema / JSON-LD   | Page JSX via script tag or StructuredData component |
| Headings           | Page JSX or message JSON                            |
| Images             | next/image with priority for LCP                    |
| Sitemap            | app/sitemap.ts or next-sitemap config               |
| Robots.txt         | app/robots.ts or public/robots.txt                  |

### Plain HTML / Static Sites

| SEO Element        | Where to modify               |
|--------------------|-------------------------------|
| Title / Description| <head> section                |
| Canonical          | <link rel="canonical">        |
| Hreflang           | <link rel="alternate">        |
| Schema / JSON-LD   | <script type="application/ld+json"> |
| Headings           | HTML body                     |
| Images             | <img> or <picture> elements   |

### Astro / Nuxt / Other

Follow the same logic: find where metadata is configured (framework-specific
API), locate the content source (hardcoded vs. CMS vs. i18n file), and apply
changes at the source.
