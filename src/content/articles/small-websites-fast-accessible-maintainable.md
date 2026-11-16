---
title: 'A Small Website Can Be Fast, Accessible, and Maintainable'
description: 'A practical case for clear navigation, readable content and a dependable static publishing workflow.'
category: software-web
format: essay
tags: ['Accessibility', 'Web development', 'Static websites']
draft: false
reviewed: true
demo: false
featured: true
featureOrder: 3
publishedAt: 2026-11-15
updatedAt: 2026-11-16
relatedProjectIds: [pathoscope]
references:
  - label: 'W3C: Web Content Accessibility Guidelines 2.2'
    url: https://www.w3.org/TR/WCAG22/
  - label: 'MDN: HTML as a basis for accessibility'
    url: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML
  - label: 'Astro: Content collections'
    url: https://docs.astro.build/en/guides/content-collections/
---

A professional website does not need a complicated application architecture. For a portfolio, technical blog, or small business presence, a carefully built static website can provide excellent performance and a lower maintenance burden. The important work lies in choosing the right content structure, making navigation understandable, and testing what real visitors experience.

This article outlines principles for building a website that remains useful after the initial launch. It focuses on user experience, accessibility, content publishing, and operational reliability rather than a specific framework or fashionable visual effect.

## The publishing decision on this website

This site stores articles as Markdown or trusted MDX, validates their metadata and builds static pages. Adding an article does not require editing the homepage or library component. A minimal draft looks like this:

```yaml
---
title: 'A specific question from your work'
description: 'What the reader will learn from the example.'
category: software-web
format: tutorial
tags: [Astro]
draft: true
reviewed: false
---
```

The filename supplies the final URL segment. Publishing requires an actual first-publication date, `draft: false` and `reviewed: true`. The same collection supplies the library, category page, related reading, feed and sitemap. Review flags record the author's review; they do not perform a scientific fact check.

| Decision                      | What it makes possible                                                         | What it does not prove                    |
| ----------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| Static, pre-rendered articles | Reading and category navigation without JavaScript                             | Complete accessibility or search ranking  |
| Typed frontmatter             | Build-time rejection of invalid categories and missing publication review/date | Truth of the article's claims             |
| Small client-side search      | Filtering existing HTML by title, description and tags                         | A need for a database or search service   |
| Trusted MDX only              | Reusable scientific figure components                                          | Safe execution of an untrusted submission |

The [publishing guide](https://github.com/itsEkramah/itsEkramah.github.io/blob/main/docs/PUBLISHING.md) documents the actual workflow and its limitations. A reader can inspect the source rather than taking a “maintainable” label on trust.

_Update, 16 November 2026: added this implementation-specific publishing example and preserved the original publication date._

## Choose an architecture that matches the task

Start by identifying what the website must do. Displaying projects, publishing articles, and providing contact links usually does not require a custom database or server-side user accounts. A static site generator can produce HTML at build time, while small JavaScript components provide interactive functionality where necessary.

Dynamic features still have legitimate uses. Authenticated dashboards, private account data, and personalized transactions may require server-side infrastructure. But adding a backend to a website that only needs pages and articles creates more operational work without improving the visitor experience. Good engineering includes knowing what not to build.

## Make navigation obvious

A first-time visitor should quickly see where to find work, services, writing, background, and contact information. Use ordinary labels rather than clever phrases that require interpretation. “Portfolio” communicates more than an ambiguous “Discover.” A clear top navigation supports recruiters and clients with different goals without forcing everyone through the same scrolling sequence.

On mobile, navigation must remain discoverable and easy to operate with a finger or keyboard. A menu icon that opens but cannot be closed using Escape is incomplete. An elegant navigation animation is irrelevant if it traps focus or obscures the page.

## Treat typography as interface design

Readable text is a product feature. Body type should be comfortably sized, with appropriate line height, contrast, and column width. Very long lines make it difficult to track from one line to the next; extremely narrow columns can create awkward wrapping. Technical posts need additional care for code blocks, equations, figure labels, and tables.

Choose fonts intentionally and avoid loading a large set of weights and styles simply because the design tool makes them available. A restrained typographic system can feel more distinctive than a page filled with competing effects. Test the actual rendered result at several viewport sizes instead of assuming that a design file will translate perfectly.

## Use semantic HTML before JavaScript

HTML already contains useful interaction and meaning: headings, navigation landmarks, buttons, links, forms, lists, and figures. Use those elements correctly rather than rebuilding them with generic containers. A navigation link should be a link; an action that changes interface state should generally be a button. Visual appearance should not replace semantic function.

Keyboard navigation is a fast practical test. Can a visitor Tab through the site in a logical order? Is focus visible? Are dropdowns and filters usable without a mouse? Does the page communicate form errors clearly? These tests often reveal problems that screenshots cannot.

## Create a real publishing model

A blog should not depend on hand-editing the homepage whenever a new article is written. Store articles as structured content with a title, description, publication date, subject category, tags, and draft status. Generate category listings and recent-post sections from that content automatically.

A category such as Bioinformatics describes an enduring subject area; a tag such as RNA-seq is a more specific descriptor. Avoid creating dozens of nearly empty categories at launch. Good information architecture grows with the publication, not ahead of it.

Individual article pages should have descriptive URLs and a consistent reading layout. Support syntax-highlighted code, accessible figures, tables, citations, and related links. Never fabricate example posts and mark them as real publications. A concise empty state is better than a misleading archive.

## Optimize what actually slows the page

Performance problems often come from oversized images, unnecessary scripts, and blocking resources. Start by sizing images appropriately and serving modern formats when practical. Defer noncritical scripts and avoid loading a large interaction framework for a single category filter. Use caching and compression supported by the hosting platform.

Measure performance rather than guessing. Synthetic audits help identify opportunities, but results vary across devices and networks. Monitor actual user experience when enough traffic exists. A static page can still be slow if every section imports large images or third-party embeds.

## Plan for accessibility from day one

Accessibility should be a design constraint, not a final plugin. Use sufficient color contrast, clear text labels, meaningful link names, alternative text for informative images, and layouts that work when users zoom in. Avoid conveying important information through color alone. Respect reduced-motion preferences.

Automated accessibility scanners are useful but incomplete. Manual keyboard testing, zoom testing, and assistive-technology checks catch problems that tooling misses. A site can pass a basic automated audit and still be confusing for users.

## Build security into the publishing workflow

Static hosting reduces but does not eliminate security risks. Compromised dependencies or CI credentials can modify published pages. Untrusted Markdown rendered as raw HTML may create injection problems. Third-party analytics or embedded content can introduce privacy and supply-chain concerns.

Keep dependencies updated, restrict automated workflow permissions, avoid committing secrets, and use trusted publication paths. Prefer simple contact links over building an unnecessary form backend. If a CMS is introduced later, assess its authentication model and requested repository access before connecting it.

## Test actual user journeys

Before launch, ask a few concrete questions. Can a recruiter find a CV and a relevant project in seconds? Can a client find services and an email address? Can a reader discover articles by subject, open a code sample on mobile, and return to the archive? Does every button lead somewhere real?

Test on desktop and narrow screens. Check broken links, missing images, long titles, large code blocks, and empty states. Review the site with realistic content instead of only short placeholder paragraphs. A beautiful interface that fails under actual writing is not finished.

## Maintain it like a product

After deployment, document how to publish an article, how to update a project, and how to recover from a broken release. Keep backups or version history and inspect dependency updates. Separate draft changes from production publishing where possible. Define what success means: discoverability, inquiries, article readability, or useful evidence of engineering work.

A small website can feel exceptionally professional when its purpose is clear and every detail works. The goal is not to impress visitors with the number of technologies used. It is to help them understand the work, trust the presentation, and complete the action that brought them there.
