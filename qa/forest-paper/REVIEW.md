# Forest & Paper — local theme review

Historical predeployment evidence. The owner subsequently approved publishing this complete revision on 15 November 2026; the deployment workflow must pass validation before release.

15 November 2026. Applied on `codex/navigation-portfolio-restructure`, following the owner-approved navigation revision and institution links (local base `10bfa19`). **Not deployed.** Remote production remains at `10ed1eaf422dd947ddfa7c97c461f153f70a0986`; no push or deployment was performed.

## Applied palette

| Role | Colour |
| --- | --- |
| Paper background | `#F7F5EF` |
| Charcoal text | `#242A27` |
| Forest accent | `#315448` |
| White surfaces / button text | `#FFFFFF` |
| Muted text | `#576159` |
| Decorative borders | `#DADFD7` |
| Soft highlight surface | `#E8EEE6` |
| Hover accent | `#263F36` |
| Form-control boundary | `#7B8B7E` |

Shared tokens now use the name `accent` rather than `teal`. Links, headings with accent emphasis, active navigation, buttons, hover/focus states, form boundaries and selection colours use the revised palette. Browser theme colour, favicon and the existing SVG sharing graphic were updated; its PNG was rendered from the SVG source. No new illustration, photograph, font or dependency was added.

Layout, typography, page routes, scientific figures, article/project content and institution links remain unchanged. Git comparison confirmed no changes to `src/pages/`, `src/content/` or `src/assets/` for this theme update.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Lint and Astro/type check | PASS | Lint clean; 50 files, zero errors/warnings/hints. |
| Static build and both author-preview modes | PASS | Ordinary output contains 35 HTML pages. Review/demo builds also succeeded. |
| Existing unit checks | PASS | All five pass: internal links, metadata, draft exclusions, Markdown sanitisation and actual theme-token contrast. |
| Contrast | PASS | [13 measured pairs](contrast.json). Normal-text pairs are at least 5.46:1; forest links on paper are 7.73:1. White labels on forest buttons are 8.43:1. Functional control boundaries are at least 3.30:1. Decorative borders are not represented as functional-control boundaries. |
| Browser/accessibility regression | PASS | [Six tests](playwright-results.json), zero failures/skips/flaky outcomes, across Chromium, Firefox and WebKit. Direct-route checks cover core indexes, project/service detail pages, About and Contact with axe, console and network checks. |
| Desktop/mobile reflow and active navigation | PASS | Home/Portfolio/Services/Writing at 320, 390, 768, 1024 and 1440px in all three engines; no page overflow. Axe checks at desktop/mobile sizes. |
| Scientific figures in captures | PASS | Screenshot routine scrolls to and waits for images to load. Figure files and original colours are preserved. |
| Native browser visual check | PASS | Local in-app browser confirmed paper `rgb(247,245,239)`, charcoal `rgb(36,42,39)` and forest button `rgb(49,84,72)`. |
| Production deployment | NOT TESTED | Intentionally awaiting separate explicit owner approval. |

These automated checks do not constitute a complete accessibility certification. New Lighthouse/field measurements and independent assistive-technology testing were not performed for this colour-only revision.

## Screenshots and preview

| Page | Desktop | Mobile |
| --- | --- | --- |
| [Home](http://127.0.0.1:4321/) | [Full page](screenshots/revised-home-1440.png) | [Full page](screenshots/revised-home-390.png) |
| [Portfolio](http://127.0.0.1:4321/portfolio/) | [Full page](screenshots/revised-portfolio-1440.png) | [Full page](screenshots/revised-portfolio-390.png) |
| [Services](http://127.0.0.1:4321/services/) | [Full page](screenshots/revised-services-1440.png) | [Full page](screenshots/revised-services-390.png) |
| [Writing](http://127.0.0.1:4321/writing/) | [Full page](screenshots/revised-writing-1440.png) | [Full page](screenshots/revised-writing-390.png) |

The local static preview remains available on port 4321. Browser evidence was captured with `QA_OUTPUT_DIR=qa/forest-paper`, preserving previous review screenshots separately. The earlier navigation review documents the broader 39-test regression and user journeys; this report covers the later palette change only.
