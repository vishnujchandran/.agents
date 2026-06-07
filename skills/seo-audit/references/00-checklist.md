# 00 — On-Page SEO 12-Dimension Checklist (2025)

Use this file as the master checklist for every audit. Walk through each
dimension in order. For each check item, determine: pass / warn / fail.

---

## Dimension 1: Metadata & Page Basics

### 1.1 Title Tag
- Length: 50–60 characters (pixel width is the real constraint; avoid truncation)
- Core keyword placed as early as possible
- Aligned with search intent
- Includes brand name or unique value proposition (UVP)
- Distinct from H1 but semantically consistent

### 1.2 Meta Description
- Length: 140–160 characters (Google may rewrite; focus on intent match)
- Contains clear call-to-action (CTA)
- Serves click-through rate, not keyword stuffing

### 1.3 URL Structure
- Short, readable, hyphen-separated, lowercase
- Contains primary keyword
- No dates, session IDs, or meaningless parameters
- Consistent path hierarchy

### 1.4 H1 Heading
- Exactly one per page
- Contains primary keyword
- Covers the primary search intent
- Differentiated from Title tag; extends semantic coverage

### 1.5 H2–H4 Hierarchy
- Strict logical nesting: H2 > H3 > H4 (no skipped levels)
- Subheadings cover long-tail questions and key subtopics
- No duplicate headings at the same level

---

## Dimension 2: Search Intent & Content Quality

### 2.1 Search Intent Alignment
- Content type (informational / transactional / navigational) matches SERP
  dominant results
- Format matches user expectation (list, guide, comparison, product page)

### 2.2 Information Gain & Unique Value
- Provides first-hand experience, original data, reproducible methods, or
  real case studies
- Avoids hollow "SEO filler" content
- Passes the test: "Would this page still be valuable if search engines
  didn't exist?"

### 2.3 Content Depth & Coverage
- Covers core questions and sub-questions (check PAA, related searches)
- Uses clear steps, comparison tables, pros/cons, FAQ sections
- No critical subtopic gaps vs. top-ranking competitors

### 2.4 Readability & Formatting
- Paragraphs ≤ 3–4 lines; no walls of text
- Appropriate use of lists, tables, bold for high-value information
- Logical flow from introduction to conclusion

### 2.5 AI Overview Optimization (AIO)
- 1–2 sentence core conclusion at the top of the article
- Key questions organized in Q&A-style subsections
- Structured for AI extraction and citation

### 2.6 Freshness
- "Last updated" date displayed
- Outdated information revised
- Update log or version changelog provided where appropriate

---

## Dimension 3: E-E-A-T & Trust

### 3.1 Author & Reviewer Information
- Author byline with credentials visible
- Author bio page with contact info and verifiable qualifications
- Reviewer/editor credit where applicable (especially YMYL)

### 3.2 Sources & Fact-Checking
- Claims cite authoritative sources with links to original documents
- Publication dates and versions noted on citations

### 3.3 Verifiable Evidence
- Test data, screenshots, experiment methodology, or reproducible steps
- Not just opinions — evidence-backed assertions

### 3.4 Entity & Brand Consistency
- Brand name, address, contact info consistent across pages
- Clear brand entity signals: About page, media presence, social profiles
- Consistent NAP (Name, Address, Phone) for local businesses

### 3.5 Brand Mentions & Social Signals
- Brand mentioned consistently across social media, forums, industry press
- Unlinked mentions still count as E-E-A-T signals

### 3.6 YMYL Compliance
- Health / finance / legal content has stricter review and disclaimers
- Expert authorship clearly demonstrated for high-risk topics

---

## Dimension 4: Keywords & Semantics

### 4.1 Core Keyword Placement
- Appears in: first 100 words, closing paragraph, at least one H2

### 4.2 Negative Keyword Intent Filtering
- No misleading signals (e.g., paid product page should not imply "free")
- Check for intent mismatch that drives high bounce rates

### 4.3 Entity & Topic Coverage
- Synonyms, related concepts, and question variants naturally integrated
- Covers the semantic field around the primary topic

### 4.4 No Keyword Stuffing
- Readability first; semantic consistency and natural expression
- Keyword density is not a target — topical authority is

---

## Dimension 5: Structured Data (Schema Markup)

### 5.1 Schema Type Selection
- Appropriate type: Article, Product, FAQPage, HowTo, LocalBusiness, etc.
- Only marks up content actually visible on the page
- No inflated or deceptive markup

### 5.2 JSON-LD Implementation
- Valid syntax (test with Google Rich Results Test)
- No errors or warnings

### 5.3 Breadcrumb Schema
- BreadcrumbList deployed for SERP path display

### 5.4 Base Entity Schema
- Organization / Person / WebSite schema with consistent sameAs links

### 5.5 Rich Result Compliance
- FAQ/HowTo rich results subject to policy changes — ensure current compliance
- Do not depend on a single rich result format

---

## Dimension 6: Indexing & Canonicalization

### 6.1 Canonical Tag
- Points to the single preferred URL
- No conflicting canonicals across parameter/pagination variants

### 6.2 Index Strategy
- Low-value pages use noindex
- Core pages are not accidentally noindexed

### 6.3 Redirects & Error Pages
- 301 redirects where needed; no redirect chains
- No 404 dead links; removed content uses 410 or redirects to alternatives

### 6.4 Site Structure & Multilingual
- Sitemap up-to-date; robots.txt does not block core pages
- Multilingual pages use correct hreflang with x-default
- Self-referencing hreflang tags present
- Return links (bidirectional hreflang) verified

---

## Dimension 7: Performance & UX

### 7.1 Core Web Vitals (CWV)
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms (replaced FID in March 2024)
- Prefer field data (CrUX) over lab data

### 7.2 Performance Budget
- JS/CSS bundles minimized; third-party scripts audited
- Critical resources preloaded/preconnected
- Caching and compression enabled (gzip/brotli)

### 7.3 LCP Critical Element
- Hero image: no lazy-load, explicit dimensions, high fetch priority
- Largest element above the fold loads fast

### 7.4 Visual Stability (CLS)
- All images and video have explicit width/height or aspect-ratio
- No layout shifts from ads, fonts, or dynamic content injection

### 7.5 Mobile-First
- Tap targets ≥ 48px; readable font size; responsive layout
- No intrusive interstitials blocking content

### 7.6 HTTPS & Security
- HTTPS enforced; no mixed content warnings

### 7.7 Accessibility
- WCAG compliance; keyboard navigable; screen-reader friendly
- Sufficient color contrast ratios

---

## Dimension 8: Linking Strategy

### 8.1 Internal Links
- Key pages and related topics properly interlinked
- Descriptive anchor text (not "click here")
- No over-optimized exact-match anchors

### 8.2 Outbound Links
- Link to authoritative resources when helpful to users
- Ads / UGC links use rel="sponsored" / rel="ugc"

### 8.3 Broken Link Audit
- No 404 or 410 links on the page
- Regular monitoring in place

---

## Dimension 9: Visual Optimization

### 9.1 Alt Text
- Accessibility-first; accurately describes image content
- No keyword stuffing in alt attributes

### 9.2 Image Format & Compression
- WebP or AVIF; sized to display dimensions
- Performance budget per image role (hero vs. thumbnail)

### 9.3 Lazy Loading
- Below-fold images and video use lazy loading
- LCP element is excluded from lazy loading

### 9.4 Video Optimization
- Subtitles / transcript provided
- Timestamps for navigation
- VideoObject Schema deployed

---

## Dimension 10: Conversion & Trust (CRO)

### 10.1 Clear CTA
- Obvious conversion path: buy, subscribe, trial, contact
- CTA visible without excessive scrolling

### 10.2 Trust Signals
- Reviews, testimonials, certification badges, press mentions, case studies

### 10.3 Contact & Assurance
- Accessible contact info, About page, Privacy Policy, Terms of Service

---

## Dimension 11: Spam Policy Compliance

### 11.1 Site Reputation Abuse
- Third-party content properly vetted; no parasitic SEO

### 11.2 Scaled Content Abuse
- No mass-generated pages without incremental value

### 11.3 Expired Domain Abuse
- Content consistent with site's historical topic

### 11.4 Other Violations
- No hidden text, keyword stuffing, deceptive schema, or cloaking

---

## Dimension 12: Content Governance

### 12.1 Content Audit
- Duplicate pages merged; thin content pruned; topic clusters maintained

### 12.2 Content Decay Monitoring
- Pages that dropped from Top 3 flagged for refresh
- Check if competitors surpassed with better information gain

### 12.3 Update Mechanism
- Key pages have scheduled review cycles and changelogs

### 12.4 Monitoring & Iteration
- GSC data, SERP changes, and user behavior tracked
- Continuous improvement loop in place
