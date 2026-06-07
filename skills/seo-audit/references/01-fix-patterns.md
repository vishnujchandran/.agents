# 01 — Fix Patterns by Dimension

When generating fix recommendations, use these patterns to provide concrete,
copy-paste-ready solutions — not vague advice.

---

## Dimension 1: Metadata Fixes

### Title Tag Rewrite
Provide a before/after with character count:
```
Before (67 chars): "Best SEO Tools for Small Business Owners in 2025 | CompanyName Blog"
After  (54 chars): "Best SEO Tools for Small Business 2025 | CompanyName"
```
Rules for rewriting:
- Move core keyword to the front
- Cut filler words ("for owners", "blog")
- Keep brand at the end after pipe
- Target 50–60 characters

### Meta Description Rewrite
```
Before: "We offer the best SEO tools. Our SEO tools are great for small business."
After:  "Compare the top 8 SEO tools for small business — with pricing, pros/cons,
         and our hands-on test results. Try free today."
```
Rules:
- Lead with value proposition, not "we"
- Include CTA at the end
- Match the dominant search intent
- 140–160 characters

### H1 / Heading Restructure
Provide the full heading hierarchy as a tree:
```
H1: [Primary keyword + intent]
  H2: [Subtopic A]
    H3: [Detail A1]
    H3: [Detail A2]
  H2: [Subtopic B — covers PAA question]
  H2: [FAQ — covers related searches]
```
Flag any:
- Missing H1 or duplicate H1
- Skipped levels (H1 → H3 without H2)
- Headings that don't cover user sub-intents

---

## Dimension 2: Content Quality Fixes

### AIO (AI Overview) Optimization
Add a "TL;DR" or key-takeaway block at the top:
```html
<p class="key-takeaway">
  <strong>Key Takeaway:</strong> [1-2 sentence core conclusion
  answering the primary search query directly.]
</p>
```

Restructure Q&A sections:
```html
<h2>How long does [X] take?</h2>
<p>[Direct answer in the first sentence.] [Supporting detail.]</p>
```

### Freshness Fix
Add last-updated metadata:
```html
<meta property="article:modified_time" content="2025-03-15T00:00:00Z">
```
Add visible date on page:
```html
<p class="last-updated">Last updated: March 15, 2025</p>
```

---

## Dimension 3: E-E-A-T Fixes

### Author Block Template
```html
<div class="author-bio" itemscope itemtype="https://schema.org/Person">
  <img src="/authors/jane.jpg" alt="Jane Doe" itemprop="image">
  <div>
    <strong itemprop="name">Jane Doe</strong>
    <p itemprop="jobTitle">Senior SEO Analyst, 10 years experience</p>
    <a href="/about/jane-doe" itemprop="url">Full bio →</a>
  </div>
</div>
```

### Source Citation Pattern
```html
<p>According to <a href="https://source.example.com/study"
   rel="noopener" target="_blank">Google's 2024 Search Quality Report</a>
   (published Jan 2025), ...</p>
```
Always include: source name, link, publication date.

---

## Dimension 5: Structured Data Fixes

### Article Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Page Title]",
  "description": "[Meta description]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]",
    "url": "[Author bio URL]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Brand]",
    "logo": {
      "@type": "ImageObject",
      "url": "[Logo URL]"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-03-15",
  "mainEntityOfPage": "[Canonical URL]"
}
```

### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text — must match visible page content]"
      }
    }
  ]
}
```

### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Category]", "item": "https://example.com/category/" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]" }
  ]
}
```

---

## Dimension 6: Indexing Fixes

### Canonical Tag
```html
<link rel="canonical" href="https://example.com/preferred-url/">
```
Common mistakes to flag:
- Canonical pointing to a 404 or redirect
- Canonical pointing to a different language variant
- Multiple conflicting canonical tags
- Missing canonical on paginated pages

### Hreflang Implementation
```html
<link rel="alternate" hreflang="en" href="https://example.com/page/">
<link rel="alternate" hreflang="zh" href="https://example.com/zh/page/">
<link rel="alternate" hreflang="x-default" href="https://example.com/page/">
```
Checklist:
- Self-referencing tag present
- Bidirectional (each variant links to all others)
- x-default specified
- Language codes follow RFC 5646

### Robots / Noindex
```html
<!-- Block indexing for thin/duplicate pages -->
<meta name="robots" content="noindex, follow">
```
Flag if core content pages are accidentally noindexed.

---

## Dimension 7: Performance Fixes

### LCP Hero Image
```html
<!-- Good: explicit size, high priority, no lazy load -->
<img src="/hero.webp" width="1200" height="630"
     alt="[Description]" fetchpriority="high" decoding="async">

<!-- Bad: lazy loaded LCP element -->
<img src="/hero.webp" loading="lazy"> <!-- REMOVE loading="lazy" for LCP -->
```

### CLS Prevention
```html
<!-- Always set dimensions or aspect-ratio -->
<img src="/photo.webp" width="800" height="450" alt="...">

<!-- Or use CSS aspect-ratio -->
<style>
  .video-wrapper { aspect-ratio: 16/9; }
</style>
```

### Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero.webp" as="image" type="image/webp">
```

---

## Dimension 8: Linking Fixes

### Internal Link Anchor Text
```
Bad:  <a href="/seo-guide">click here</a>
Bad:  <a href="/seo-guide">SEO guide SEO tutorial SEO tips</a>
Good: <a href="/seo-guide">our complete SEO guide for beginners</a>
```

### Outbound Link Attributes
```html
<!-- Sponsored / ad content -->
<a href="https://partner.com" rel="sponsored noopener" target="_blank">Partner</a>

<!-- User-generated content -->
<a href="https://forum-link.com" rel="ugc noopener" target="_blank">User's link</a>
```

---

## Dimension 9: Image Fixes

### Alt Text Pattern
```
Bad:  alt="SEO tool SEO software best SEO"
Bad:  alt="" (empty on meaningful image)
Good: alt="Screenshot of PageSpeed Insights showing LCP score of 1.8 seconds"
```

### Picture Element for Modern Formats
```html
<picture>
  <source srcset="/photo.avif" type="image/avif">
  <source srcset="/photo.webp" type="image/webp">
  <img src="/photo.jpg" alt="[Description]" width="800" height="450" loading="lazy">
</picture>
```

---

## General Fix Priority Framework

When presenting fixes, order by this impact matrix:

| Priority | Category              | Examples                                        |
|----------|-----------------------|-------------------------------------------------|
| P0       | Blocking / Broken     | noindex on core page, 404 canonical, no HTTPS   |
| P1       | High Impact           | Missing title/H1, no schema, LCP > 4s, no CTA  |
| P2       | Medium Impact         | Weak meta desc, thin content, poor heading tree  |
| P3       | Refinement            | Alt text gaps, anchor text polish, CLS < 0.15   |
| P4       | Nice-to-have          | Video schema, advanced preloading, changelog     |
