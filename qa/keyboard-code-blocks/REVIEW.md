# Published code keyboard access — 16 November 2026

## Finding and correction

**Medium, WCAG 2.1.1:** the first live mobile audit of the evidence-led release found `scrollable-region-focusable` on the AMR essay's `<pre>` at 390px. Reproduce by opening the published article on a narrow screen and trying to reach the horizontally overflowing code using Tab. A visitor using a keyboard could not reliably scroll it in all browsers. The earlier 45-case suite audited published essays at desktop width and scientific fixtures separately; it missed this combination.

`scripts/markdown-tables.mjs:8` now assigns `tabIndex:0` to code blocks at build time; `src/styles/global.css:24` supplies visible focus. Syntax highlighting, copying, article URLs, dates, source content and the palette are unchanged. No script is required to focus or scroll code. Tables retain their existing focusable wrappers.

`tests/e2e/editorial.spec.mjs` adds an actual Tab → code → ArrowRight journey, axe on a bounded sample of five published articles at 390px, and native keyboard scrolling with JavaScript disabled. All five current essays are included. This adds one case per engine, increasing the full suite from 45 to 48. The sample stays bounded as the library grows; it does not certify all future authoring.

The first local build reused previously compiled Markdown and did not contain the new attribute. A direct fresh renderer check confirmed the transformation; `npm run build -- --force` regenerated the cached content. This cache step is documented in README. No source manuscript or user asset was deleted.

## Verification and publication gate

Local targeted results are recorded in `targeted-results.json`. Lint, type/build/unit/link/security checks and the protected PR's complete 48-case validation must pass before merging. Recheck the actual public article, core routes and mobile axe after the corrective deployment. Keep the original failed live receipt in the local raw evidence rather than relabelling it PASS.

The internal unpublished MDX example also includes a deliberately wide formatting-only code line. Its existing scientific-authoring test now verifies Tab/ArrowRight at390px along with equations, tables, highlighting and a real attributed figure. All three engines passed that targeted check; see `mdx-results.json`. This internal example remains excluded from production.

The earlier lab performance samples remain a baseline for the same visual composition; adding a static focus attribute and keyboard-only outline is not a fresh field performance measurement. The original matrix's NOT TESTED items remain unverified. No new accessibility certification, credential authentication or clinical-validation claim is made.
