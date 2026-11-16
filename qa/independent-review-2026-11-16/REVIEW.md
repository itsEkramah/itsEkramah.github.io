# Ekramah website: product review and hardening

Review date: **16 November 2026, Asia/Karachi**. Repository: `itsEkramah/itsEkramah.github.io`. Public release reviewed: `fdc332bef7a73d23b2a2350bf421b5aba6732c3e`. Local review branch: `codex/independent-review-2026-11-16`.

**Verdict: NO-GO for calling this a finished, distinctive professional portfolio or claiming complete acceptance.** The static implementation is functional and fast in the measured lab conditions. Its presentation undersells the real work, and production branch protection is disabled. No critical exploitable issue was established by the checks performed. This is not a recommendation to take the existing site offline.

This is a fresh, evidence-based review by the same coding agent that worked on the implementation, not an external human audit. Earlier PASS statements were not accepted as evidence without rerunning the relevant checks. All root `docs/*.md`, the handoff documents, source, lockfile, workflows, generated output and actual rendered pages were inspected. Later owner decisions take precedence: Forest & Paper, the revised homepage order, expanded résumé Portfolio, five categories, five approved published essays and the latest approved bio are valid requirements rather than deviations from the original brief.

## What makes the site feel generic

The palette is coherent. The problem is the amount of undifferentiated prose, repeated introductions and weak emphasis on actual artifacts. A visitor sees an identity statement, another statement about future goals, a long bio, then broad article titles. The original scientific work appears much later. Text saying that work is careful and reproducible is repeated more often than concrete evidence demonstrating those qualities.

At 1440 × 900, Portfolio's Selected Projects section begins **1,908px** down the page; the first real figure starts at **2,042px**. At 390 × 900, these positions are **2,976px** and **3,122px**. The Portfolio page is **7,469px** tall on mobile. Home's compact project preview starts at **3,477px** on mobile. These are measured document positions, not assumed user attention times. The existing Selected Projects jump link works; the issue is the initial impression, not an inability to reach the work.

Evidence: [browser measurements](evidence/browser-review.json), [desktop Portfolio](screenshots/portfolio-1440-full.png), [mobile Portfolio opening](screenshots/portfolio-390-viewport.png), [mobile Home opening](screenshots/home-390-viewport.png).

The five essays contain reasonable introductory guidance, but all use a similar sequence of general advice, caveats and concluding principles. None contains a worked dataset, runnable code block, table or original figure. That makes them weak evidence of this particular author's working methods. This observation cannot establish whether prose was written by AI. The owner supplied and approved publication of these essays; there is no evidence they were fabricated as prior publications.

## Findings, ordered by severity

### Critical

None established within this review's scope. The pattern scanner and npm advisory database have coverage limits; this does not mean the site or account is invulnerable.

### High — H1: production changes are not protected by repository rules

- **Location:** `.github/workflows/deploy.yml:3`, `README.md:83`, and the remote `main` branch configuration. [Measured policy](evidence/repository-policy.json).
- **Reproduce:** inspect the authenticated GitHub branch metadata for `main`. It reports `protected: false`, protection disabled and no required checks. The production workflow starts on a push to `main`.
- **Impact:** a mistaken push, or a compromised account with write access, can bypass the intended reviewed-PR process. CI still checks the submitted code, but a writer can change that code or its workflow. CODEOWNERS is not an enforced approval gate. This is an integrity/operations risk requiring writer access, not an anonymous remote exploit.
- **Remediation:** create an active ruleset for `main`; require a pull request and the successful PR check named `validate`; block force pushes and deletion; keep any bypass narrowly controlled. For a sole-maintainer repository, start with a required PR and checks without requiring an impossible self-approval. Require a separate reviewer when a second trusted maintainer exists. Verify the rule using a non-destructive test branch/PR and confirm that direct updates are rejected. Preserve an explicit recovery path.
- **Status:** **OPEN.** The connected GitHub tools expose policy inspection but no branch-rules update action. No repository access policy, account settings or bypass policy was changed during this review. A YAML edit would not fix this remote setting. This remains the high-priority hardening action.

### Medium — M1: the Portfolio opening contains no project evidence

- **Location:** `src/pages/portfolio/index.astro:26`, `src/pages/portfolio/index.astro:105`, `src/styles/destinations.css:1`.
- **Reproduce:** open `/portfolio/` at 390 × 900 or 1440 × 900 without scrolling. Then inspect the measured positions above.
- **Impact:** the first impression is an expanded CV introduction rather than a scientist/developer's work. A recruiter must choose a jump link or scroll several screens before seeing the strongest evidence.
- **Remediation:** retain the owner-required Education → Experience → Skills → Projects order. Add a compact, project-specific evidence strip within the introduction linking directly to the AMR, RNA-seq and backend contribution case studies. One genuine figure can accompany this introduction if it remains legible and has context. Do not move a full project gallery back onto Home or invent an artifact.
- **Status:** OPEN design recommendation; no redesign applied during the review.

### Medium — M2: the same long bio is doing two different jobs

- **Location:** `src/data/profile.ts:6`, `src/pages/index.astro:34`, `src/pages/portfolio/index.astro:30`.
- **Reproduce:** compare the Home and Portfolio introductions. They render the same paragraph; Portfolio also repeats the graduate/university credential immediately above it.
- **Impact:** the copy is accurate to the owner's approved wording but repetitive across destinations. At mobile size, the header and bio consume most of the opening screen. The future-study goal competes with the immediate evidence of capability.
- **Remediation:** keep the approved full bio for a background-oriented context. Give Home a concise two-sentence introduction and Portfolio a short research/contribution summary, using distinct shared data fields rather than duplicating credentials. Keep future-study intent visible, but subordinate to demonstrated work. Obtain editorial approval before replacing approved public copy.
- **Status:** OPEN; approved biography preserved.

### Medium — M3: published writing is broad guidance rather than distinctive working evidence

- **Location:** `src/content/articles/reproducible-genomics-before-the-pipeline.md:27`, `src/content/articles/reading-amr-data-without-overclaiming.md:25`, and the three other published essays.
- **Reproduce:** read each essay and compare its examples with the corresponding project repository. The articles advise good practice but do not walk through an original example or show an author-produced analysis artifact.
- **Impact:** the library functions correctly, but five equally broad essays published together can make the website feel assembled rather than personally authored. Introductory guidance is not evidence of commercial delivery, independent scientific validation or a peer-reviewed publication.
- **Remediation:** revise one article first around an actual inspectable decision: for example, why identical genomic profiles were grouped in the AMR evaluation, or how 24 technical count files became six biological samples. Add a small reproducible example, a real figure/table and a link to its exact source. Preserve first-publication dates; use a genuine update date and correction note for substantial changes. Do not bulk-generate more articles to fill categories.
- **Status:** OPEN editorial improvement. Existing articles and URLs retained.

### Medium — M4: supporting text and figure labels are too small for comfortable scanning

- **Location:** `src/styles/home.css:75`, `src/styles/home.css:106`, `src/styles/global.css:341`, `src/styles/global.css:367`.
- **Reproduce:** inspect computed sizes on Home and Portfolio. Desktop article categories are **9.6px**, figure captions **10.24px** and project tools **11.68px**. Look at the dense two-panel plots at mobile width.
- **Impact:** metadata and scientific context look less important than they are. Small labels and dense plots discourage evidence inspection even when colour contrast passes.
- **Remediation:** use approximately 12–14px for short metadata and at least 14px for substantive captions; reduce all-caps tracking where it harms reading. Offer an accessible full-size figure link and an adjacent data/source link. Use a single readable figure per project preview rather than a dense multipanel thumbnail when possible. Do not modify scientific values or redraw results without checking their source.
- **Status:** OPEN design/accessibility usability issue. Small type alone is not asserted to be a specific WCAG failure.

### Medium — M5: the Writing index spends too much space before the first article

- **Location:** `src/pages/writing/index.astro:31`, `src/pages/writing/index.astro:60`, `src/styles/global.css:768`.
- **Reproduce:** open Writing at 768 × 900. Category navigation, a second category selector, the search panel, reset button and count fill the opening view; the first article title is below it. [Screenshot](screenshots/writing-768-viewport.png).
- **Impact:** a structured library feels like a form before it feels like a publication. Duplicate category controls create unnecessary decisions for five articles.
- **Remediation:** keep crawlable category links and a keyboard-accessible filter, but compress the controls into a compact row or disclosure. Bring at least one article title and description into the initial 768px-wide viewport. Preserve no-JavaScript article/category access and URL filter state.
- **Status:** OPEN; filters and category links work.

### Medium — M6: the Services index reads like repeated specifications

- **Location:** `src/pages/services/index.astro:54`, `src/pages/services/index.astro:68`, `src/pages/services/index.astro:101`.
- **Reproduce:** scroll the five service entries on mobile. The page is **5,146px** tall and repeats title, summary, audience, deliverables, tools, approach, evidence and two links for each service.
- **Impact:** prospective clients can find the category, but comparing outcomes requires substantial reading. Phrases such as “Scope, evidence & boundaries” foreground the implementation's caution rather than the client's task.
- **Remediation:** retain all required information, but give each service a short outcome sentence, a compact deliverable list and one clear “View service” action. Put detailed methods and boundaries on its existing detail page, with a visible contact action. Use ordinary task language without adding unsupported client, ranking or delivery claims.
- **Status:** OPEN design/content refinement; no evidence was removed.

### Medium — M7: the old zoom test overstated what it proved

- **Location:** `tests/e2e/site.spec.mjs:112`, `src/styles/global.css:13`, `src/styles/global.css:931`.
- **Reproduce:** change the root element's font size to `200%` as the test does. The fixed-pixel body text remains 17px on desktop/16px on mobile; rem-based elements grow. This is not native browser zoom or a full text-resize test.
- **Impact:** calling the result a “200% text zoom” pass creates false confidence. Automated axe and reflow checks do not establish full WCAG 2.2 AA conformance.
- **Remediation/status:** **test label and comments corrected locally** to describe enlarged rem sizing. The renamed keyboard/reflow test passed in Chromium, Firefox and WebKit. Native browser zoom, screen-reader usability and real-device testing remain **NOT TESTED**, rather than being promoted to PASS.

### Medium — M8: secret scanning omitted future standalone build bundles

- **Location:** `scripts/audit-security.mjs:49`.
- **Reproduce before fix:** the scanner examined source, reachable commit diffs and generated HTML, but did not walk generated `.js`, `.json`, `.css` or source-map files. Today's production output has no standalone JavaScript files; this was a coverage gap, not a discovered credential leak.
- **Impact:** future bundling or generated data could introduce values that do not appear literally in source or HTML.
- **Remediation/status:** **fixed locally** by scanning all generated text resources in those formats. An isolated synthetic token in a generated JS file caused a failing scan; the canary was removed and the clean scan passed. [Regression evidence](evidence/security-regression.json), [clean result](evidence/security-scan-retest.json). This remains a limited pattern scan, not a full secret-detection guarantee.

### Low — L1: Windows checkout line endings caused the documented lint command to fail

- **Location:** `.gitattributes:1` (new), `.prettierrc.json:1`.
- **Reproduce before fix:** clean Windows checkout with the existing Git line-ending settings, then `npm run lint`: 36 files were reported. Linux CI's earlier pass did not establish the Windows authoring path.
- **Remediation/status:** **fixed locally** with LF text attributes and explicit binary exceptions; reformatted working text without semantic source changes. `npm run lint` now passes. Initial failure is preserved in `qa/raw/review-2026-11-16/lint.log`; the retest is in `lint-retest.log`.

### Low — L2: publishing documentation contradicted the actual publication state

- **Location:** `docs/PUBLISHING.md:131`, `README.md:89`.
- **Reproduce before fix:** the publishing guide described the five supplied essays as current demo drafts, then later said they were published. README referred to “this feature branch” although the reviewed public release was on `main`.
- **Remediation/status:** **fixed locally** by explicitly distinguishing the original import from the approved publication, and making the branch/deploy explanation generic. Five separate internal authoring drafts remain excluded.

### Low — L3: old branding remains in secondary surfaces

- **Location:** `src/components/Footer.astro:11`, `src/layouts/BaseLayout.astro:59`, `public/social.svg:1`.
- **Reproduce:** compare the new “software development” homepage heading with the footer, Open Graph image and its alt description, which still say “Research software.”
- **Impact:** minor inconsistency with the owner's revised positioning; it does not make the research-software contribution false.
- **Remediation:** agree on a single short descriptor and update the footer, social SVG, rendered PNG and image description together. Check image contrast and regenerate from the actual vector asset.
- **Status:** OPEN; no unapproved branding revision made.

## Test results

Evidence is isolated in this directory; older release reports in `qa/` were preserved. Full command logs and detailed browser/Lighthouse reports are retained under `qa/raw/review-2026-11-16/` in this local workspace. [Recorded command exits](evidence/commands.json) describe the initial run; local fixes and their retests are stated separately below.

| Check | Actual result |
| --- | --- |
| `npm ci` | PASS; 503 packages installed, audit completed; lockfile unchanged. |
| `npm run check` | PASS; 0 errors, warnings or hints across 52 checked files. |
| `npm run build` | PASS; 35 generated HTML pages; 56 total output files, approximately 902KB uncompressed including PDF/images. |
| `npm run lint` | FAIL initially on Windows line endings; PASS after L1 fix. |
| `npm run test` | PASS; all 5 tests. Includes internal-link, metadata, draft, unsafe-Markdown and actual-palette contrast checks. |
| `npm run test:publishing` | PASS; isolated Markdown in all five categories, MDX, automatic lists/SEO/feed/sitemap/related links, exclusion and unpublishing. Synthetic content never entered public source. |
| `npm run audit:links` | PASS; 800 checks across 35 pages, 0 errors. |
| `npm run audit:security` | PASS within pattern coverage; baseline scanned 202 items/35 reachable commits. Extended scan and generated-JS regression both pass locally. |
| `npm audit --json` / `npm audit --omit=dev --json` | PASS; 0 reported advisories in both runs. This is an advisory-database result, not a supply-chain certification. |
| `npm run audit:licenses` | PASS as an inventory; 600 locked package entries. This does not certify every project image's third-party reuse rights. |
| `npm run audit:external` | 27 destinations returned HTTP 200; LinkedIn returned 999 and QAU 403. These two are NOT TESTED for successful destination content. YouTube HTTP 200 is not playback verification. |
| `npm run qa:article` / `npm run demo:build` | PASS; authoring examples compile in separate noindex preview output. |
| `npx playwright install chromium firefox webkit` | PASS; all three browser engines available. |
| `npm run test:e2e` | PASS; **39 passed, 0 failed, 0 skipped**, 4.6 minutes locally. [Summary](evidence/e2e-summary.json). |
| Targeted post-fix keyboard/rem-sizing test | PASS in all three engines; 3 passed. |
| Separate interaction smoke | PASS in Chromium; copied code matches after native line-ending normalisation, copy status is announced, skip link reaches main and the next link has a visible 3px focus outline. [Evidence](evidence/interaction-smoke.json). |
| Additional review browser probe | PASS for 15 page/viewport combinations at 390/768/1440 × 900; 0 horizontal overflows and 0 axe violations using WCAG 2/2.1/2.2 A/AA tags. |
| Outbound requests / runtime privacy | No off-origin resource requests or page errors observed in the additional probe; no browser cookies. E2E separately checks console errors and outbound requests. |
| Live deep-route navigation and refresh | PASS for 9 tested routes, including article/category/project/service, old Work alias and real missing-route 404. [Measured statuses](evidence/browser-review.json). |
| Live robots/sitemap/RSS/CV | PASS; all five resources returned 200; crawler/feed output excluded the internal AMR draft. [Resource evidence](evidence/live-resources.json). |
| Live HTTPS/headers | HTTP → HTTPS 301; valid HTTPS requests and HSTS `max-age=31556952` observed. No CSP, X-Frame-Options or X-Content-Type-Options response header measured. Generated meta CSP exists; it is not a response-header substitute. |
| NVDA/VoiceOver, native browser zoom, independent timed user study, real low-end phone | **NOT TESTED.** No conformance or ten-second success claim is made. |
| Specialist secret tool such as Gitleaks | **NOT TESTED**; not installed. The repository's pattern scan was run instead and is explicitly limited. |
| Account MFA/recovery, DNS provider settings, EU.org approval, Search Console, field CWV | **NOT TESTED.** No access/domain/authentication configuration changed. |

### Lighthouse mobile laboratory results

`npm run qa:lighthouse`, Lighthouse 13.6.0, Chromium 159 on Windows, simulated mobile device, 150ms RTT and 4× CPU slowdown. Local static production output, one run per path. Browser screenshot probing completed before these measurements; a small formatter/retest operation overlapped part of the lab run. These are diagnostic samples, not controlled repeated benchmarks or public-network field measurements.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 100 | 100 | 100 | 0.91s | 0 | 215ms |
| Portfolio | 93 | 100 | 100 | 100 | 0.91s | 0 | 307ms |
| Services | 100 | 100 | 100 | 100 | 0.91s | 0 | 20ms |
| Writing | 99 | 100 | 100 | 100 | 0.94s | 0 | 114ms |
| Published genomics article | 98 | 100 | 100 | 100 | 0.91s | 0 | 162ms |

All stated Lighthouse score goals passed in this sample. TBT is not INP; the Portfolio result leaves room to reduce main-thread work. Field p75 LCP/INP/CLS are **NOT TESTED**. Raw metric/environment details: [performance](evidence/performance.json), [Lighthouse summary](evidence/lighthouse-summary.json).

## Content authenticity and scientific boundaries

- **Biography/education/internships:** the degree, dates, CGPA, NIH internship and Digital Empowerment Network internship agree with the public two-page CV. They are owner-supplied assertions with consistent source records, not independently authenticated university/employer credentials. No degree certificate, transcript verification or employer attestation was obtained. Research interests and future-study intent are approved personal statements.
- **Skills/services:** research/data/Python capabilities have project/CV support. Web-interface proof is a team prototype and independent demonstrations, not evidence of sole authorship or paid client delivery. SEO/content work is an owner-approved service claim; the linked Site Audit Kit demonstrates bounded offline HTML inspection. Commercial SEO outcomes, client engagements and rankings remain unverified and are not claimed. No certifications were supplied or invented.
- **AMR metrics:** the linked public bootstrap CSV reports balanced accuracies 0.948570587 and 0.968874658, consistent with the site's rounded 0.949/0.969. This validates transcription, not the underlying experiment. The supplied GWAS-filtering caveat and absence of external/clinical validation remain material. The ML training and original GWAS selection were not rerun.
- **RNA-seq metrics:** the public `results/summary.json` confirms 24 technical files, six biological samples, 21,531 retained genes, 121 FDR hits, 77 higher/44 lower, and PCA fractions about 61.2%/18.3%. This is a source cross-check, not an independent count-level reanalysis. The WT3 and small-replication caveats are appropriate.
- **PathoScope:** the site accurately labels the work a team course prototype and describes backend contributions. Simulated fallback outputs are disclosed. Original team-member attribution, every execution path and the linked video playback were not independently verified. There is no basis for a diagnostic-readiness claim.
- **Figures:** both current PNGs are byte-identical Git objects to the original public-site baseline. [Hash evidence](evidence/figure-provenance.json). RNA-seq's MIT notice is retained. AMR figure use follows owner-provided material/approval; a blanket redistribution licence was not established.
- **Articles:** five owner-supplied essays were explicitly approved for first publication on 15 November 2026. Their dates are not prior-publication claims; five internal examples remain drafts. The AMR piece distinguishes EUCAST I from older intermediate terminology and includes a non-clinical-use notice. This agrees with [EUCAST's definitions](https://www.eucast.org/bacteria/clinical-breakpoints-and-interpretation/definition-of-s-i-and-r/). The [WHO GLASS manual](https://www.who.int/publications/i/item/9789240076600) is a relevant primary surveillance source. Broad methods advice is generally consistent with those sources; no specialist peer review, originality/plagiarism determination or validation of every possible application is claimed.
- **Links/contact:** GitHub and project destinations resolve. LinkedIn and QAU automated access are blocked; their successful content/identity verification remains open. NCB's current linked site returns 200 and displays the centre's identity, but its domain ownership was not independently established. The professional Outlook address was owner-approved; email delivery was not tested and no email was sent. The CV still uses the previously public Gmail address; no private street address or phone was found in its extracted text.

The [official Astro content-collection API](https://docs.astro.build/en/guides/content-collections/) and [GitHub Pages deployment guidance](https://docs.astro.build/en/guides/deploy/github/) support the current loader/schema/static deployment approach. Workflow actions are SHA-pinned, installation scripts disabled, and only the Pages deployment job receives Pages/OIDC write permissions. No `pull_request_target`, third-party runtime scripts, backend form or CMS was found. MDX remains trusted executable build input and requires code review. No custom-domain CNAME asset is present; the canonical host remains GitHub Pages. DNS-provider state and account MFA were not certified. [GitHub's custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) explains why domain verification must precede any future migration.

## Recommended design revision, in order

1. Keep Forest & Paper and the current global routes. Do not start with another palette change or an animation framework.
2. Give the Portfolio introduction a short contribution summary and compact evidence links; retain the required résumé section order. Make a real research artifact visible early without creating a second oversized gallery.
3. Reduce the Home bio to its gateway purpose after editorial approval. Keep Portfolio, Services and Writing actions together and reachable immediately.
4. Replace the three equally weighted article boxes with one lead article and two compact editorial entries, still generated from the collection. Keep the approved Home section order.
5. Increase metadata/caption sizes, remove redundant headings, and use clearer differences between titles, context, findings and limitations. Show dense scientific figures at a useful size with an accessible inspection path.
6. Shorten Services comparisons and Writing controls. Put full detail on the already existing destination pages.
7. Improve one article with an actual reproducible example before publishing more broad essays.
8. Test the revised opening with a recruiter, a prospective client and a reader. Record the actual task/time rather than inferring comprehension from screenshots or Lighthouse.

## Local changes and release decision

Local fixes: generated-output secret-scan coverage; demonstrated canary regression; honest zoom-test naming; Windows LF checkout rules; publishing-state documentation. There are **no public design/content changes, dependency updates, account-policy changes or deployments** in this review.

The [acceptance matrix](ACCEPTANCE.md) maps every PRD requirement and the additional handoff/publishing requirements to PASS, FAIL or NOT TESTED. **NO-GO for final acceptance** remains appropriate until H1 is resolved and the originality/first-screen concerns are addressed. For the already published static site, the observed residual risks do not establish an urgent need to take it offline. Preserve its URLs and the last known-good release while making reviewed improvements.
