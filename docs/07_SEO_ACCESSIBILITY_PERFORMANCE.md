# 07 — SEO, Accessibility & Performance Specification

## Search eligibility and technical SEO
- Crawlable static HTML with meaningful content available without client JS. Clean paths, unique titles/descriptions, semantic heading hierarchy, canonical absolute URLs, robots.txt, sitemap.xml, internal linking and readable anchor text.
- Exclude drafts/404/private preview pages from sitemap and indexing. Make canonical URLs match deployment domain; avoid stale `github.io` canonicals after migration.
- Implement accurate Person/ProfilePage and BlogPosting structured data where appropriate, not misleading FAQ/review ratings. Validate with Google tools but no guarantee of rich results.
- Descriptive OG data, social images from real project/brand assets, RSS if maintained.
- Prefer content quality, source citations, human editorial review, real code, figures and measured performance to keyword stuffing, fake EEAT badges or AI-generated bulk posts.
- Search Console configured by owner after deployment; document how to submit sitemap and interpret indexing and reports. No guarantee of first-page ranking.

## Accessibility acceptance
- WCAG 2.2 AA target. Semantic landmarks `header/nav/main/footer`, skip-to-content, proper heading levels, descriptive links, form labels, keyboard-operable navigation/filter/search, visible focus, no keyboard traps.
- Contrast >= 4.5:1 for normal text, >= 3:1 large text and essential UI; validate actual palette pairs.
- Zoom 200%, reflow at narrow viewport, no hover-only functionality; accessible mobile menu and focus management.
- Alt text: meaningful for project figures, empty for decorative images, captions for scientific figures/tables, accessible code blocks and tables.
- `prefers-reduced-motion`; no autoplay/scroll-hijacking.
- Manual screen-reader smoke test (NVDA/VoiceOver available) + axe automated checks; automation cannot certify accessibility alone.

## Performance budget and tests
- Build for static HTML, minimal JS and CSS, optimized images, lazy-load below fold; priority load for genuinely important first image.
- No stock videos, large JS animation libs, icon-font packages or unnecessary analytics.
- Lighthouse mobile goals: >=90 Performance, >=95 Accessibility/Best Practices/SEO on representative paths. Record environment and failures.
- Field CWV targets p75: LCP <=2.5s, INP <=200ms, CLS <=0.1; no claim of field data before enough traffic exists.
- Check with throttling and real mobile device if possible; monitor build output sizes; fix layout shifts from fonts/images.

## Sources
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/essentials
- https://web.dev/articles/vitals
- https://www.w3.org/TR/WCAG22/
