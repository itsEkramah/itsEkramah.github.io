# 03 — Design System and Art Direction

## Intent
Current revision, 16 November 2026: the owner granted creative freedom. The implementation retains Forest & Paper and system fonts, adds a genuine AMR result to the opening, a lead-and-secondary article composition and flat service comparisons. Home/Portfolio introductions are distinct; the full bio belongs on About. Captions/tools are at least 14px, short labels 12–13px or larger, body 16–17px in relative units. See `src/styles/refinements.css` and `qa/evidence-led-release/REVIEW.md`. The provisional palette below is historical.
An editorial publication crossed with a precise engineering portfolio. **80% full-width editorial / 20% engineering discipline.** Audience should know identity, relevance and where to click inside 10 seconds. Avoid Paco-style experimental interactions, persistent split sidebar, novelty scrolling, large stock hero imagery, generic AI-generated imagery or visual theatrics.

## Palette
- Canvas warm ivory: `#F8F7F3`
- Surface: `#FFFFFF`
- Primary ink: `#20262B`
- Muted copy: `#4C585B` (verify contrast in implementation)
- Accent deep muted teal: `#345F64`
- Subtle border: `#D9DEDA`
- Optional very pale teal highlight: `#E9F0ED`
These are provisional design tokens. Check actual foreground/background WCAG contrast pairs, including hover/focus/disabled and small type.

## Typography
- Maximum 2 font families: a distinguished but highly readable editorial heading face and a neutral, highly legible sans body; local/system fallback. Do not copy anyone's proprietary branding or use web fonts without license verification.
- Body 16–18px; article line-height ~1.6–1.75; max line measure ~65–75 characters (~680–760px depending on type).
- Heading scale responsive with `clamp()`; avoid oversized, cropped, or animated text. Respect text zoom.
- Monospace reserved for metadata, code, technical labels. Do not uppercase every paragraph or drown content in badges.

## Layout
- Site container approx 1120–1240px with spacious gutters; content article approx 720px.
- Visible horizontal navigation, one premium but simple hero with no stock desk scene; choose typographic hero and real project figure instead.
- Thin separators + whitespace; use cards only where visual content benefits. No uniform stack of rounded boxes masquerading as design.
- Header sticky only if usability tests support it; if sticky, don't occupy excessive mobile viewport.
- Project cards use original real figures or meaningful screenshots, not invented diagrams with fabricated numerical outcomes.
- Article listings resemble editorial publication with dates, categories and strong titles; avoid image-heavy visual noise.

## Interaction
- Subtle hover/focus changes <= 150–200ms; no parallax, scroll hijacking, carousel auto-play, morphing cursors, particles, neon grids or fake terminal typing.
- Native links/buttons; keyboard and touch targets >= 24 CSS px minimum with 44px preferred where practical.
- Reduced-motion media query; transitions disabled/reduced.
- Do not create inert navigation, fake search or decorative controls that look clickable.

## Design review checklist
1. 5-second glance: Can a stranger identify who, what, and where to click?
2. 10-second recruiter/client tasks: Work / Services / CV / Contact found without interpreting artistic UI.
3. Contrast and reading flow on mobile and desktop.
4. Images authentic, licensed and truthful.
5. No typography collision at 320px, 200% zoom or long article titles.
6. Visual distinction comes from precision, not ornamental complexity.

## Screenshot deliverables
Obtain real browser screenshots at ~1440px, 768px and 390px widths of home, work, writing archive, article, services. Compare against this spec. Never represent AI-generated mockups as screenshots of deployed site.
