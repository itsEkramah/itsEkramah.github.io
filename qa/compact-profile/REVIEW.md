# Compact profile and section accents — 16 November 2026

The owner approved the revised desktop/mobile concept and requested a fast,
bounded implementation. This supersedes the earlier AMR figure placement on
Home, while preserving Portfolio research evidence, source links and caveats.

## Changes

- Home has a compact circular identity slot beside the name, one continuous
  introduction, moderate heading, three equal editorial article previews and a
  clay services preview. The name is omitted from the homepage header to avoid
  repeating it next to the identity row. Other headers retain the name.
- No authentic headshot was available. Decorative initials occupy the reserved
  72px desktop / 56px mobile space. README explains how to add the real photo.
  No generated portrait or external image is published.
- Forest Home/About/Contact, slate Portfolio, clay Services and olive Writing
  accents share the ivory canvas, charcoal text, navigation and typography.
- Category metadata automatically selects teal, clay, slate, blue-green or ochre
  accents on article previews, category routes and reading pages. Body copy stays
  charcoal. Labels and dates retain their meaning without colour alone.
- Existing article dates, URLs, drafts, project pages, Email and opt-in calendar
  behaviour are preserved. No dependencies, scripts, CI permissions or DNS change.

## Local verification before PR

Build passed (35 pages). Astro check: 57 files, zero errors/warnings/hints.
Formatting passed; five unit tests passed; 788 internal link checks passed.
Actual Chromium preview at 390/768/1440: twelve core-page screenshot/axe checks
passed, with no horizontal overflow or page errors. All five category and article
routes (ten checks) use the intended accent and pass the selected axe rules.
Screenshots/raw results are retained locally under ignored `qa/raw/compact-profile/`.
The first scratch browser check failed because its axe harness lacked an explicit
context; the harness was corrected and the successful full run is recorded.

Existing cross-browser regression cases now verify that Home shows the identity
row without the AMR figure, Portfolio retains the real evidence, and all five
services remain linked from the compact preview. The protected PR must pass all
51 browser cases and remaining validation before merge. Deployment/live results
are recorded in the final publication receipt rather than inferred here.

This visual revision does not establish full WCAG conformance, field performance
or a new Lighthouse result. The previous Services performance limitation and
other scoped NOT TESTED items remain recorded in the earlier acceptance matrix.
