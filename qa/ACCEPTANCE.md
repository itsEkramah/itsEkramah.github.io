# Acceptance matrix

Review date: 15 November 2026. Requirements: [08_QA_DEPLOYMENT_ACCEPTANCE](../docs/08_QA_DEPLOYMENT_ACCEPTANCE.md), plus the owner's later homepage, publishing and publication decisions. PASS means the stated check passed within its recorded scope; it does not certify all accessibility, security or scientific claims.

Repository: [itsEkramah/itsEkramah.github.io](https://github.com/itsEkramah/itsEkramah.github.io). Preserved baseline: `47469fed3d9c0e91cf9f288e807b2256c1cc465e`. Implementation review: [PR 1](https://github.com/itsEkramah/itsEkramah.github.io/pull/1). Production is intended for [https://itsekramah.github.io/](https://itsekramah.github.io/). Release/deployment evidence is recorded below after live verification.

| Requirement | Status | Evidence / scope |
| --- | --- | --- |
| Inspect and preserve repository, credentials, real projects and CV | PASS | Original HTML, CSS, figures and CV retained; [content provenance](../docs/CONTENT_EVIDENCE.md). No fabricated portrait, project image, client outcome or testimonial. |
| Professional introduction and direct Portfolio, Services, Writing, About, CV, Contact, GitHub access | PASS | Header, first-screen links and [home screenshots](screenshots/home-1440.png); no permanent profile sidebar. |
| Writing-first homepage order, three collection-derived articles, five services, at most two project previews, background and contact | PASS | Browser test verifies section order and counts. Full gallery lives at /portfolio/. |
| Visitor understands purpose within ten seconds | NOT TESTED | Clear first-screen labels reviewed; no timed independent usability study. |
| Recruiter project/GitHub and client service/contact within two clicks | PASS | Automated interaction test in all three engines. Mail contact uses approved public email; no form backend. |
| Home, Portfolio and six case studies; Work aliases; five service pages; About, Contact and 404 | PASS | Direct route, heading, link and browser checks. Work aliases use Portfolio canonicals and noindex. |
| Usable at 320, 390, 768, 1024 and 1440px without page overflow | PASS | All three browser engines; core routes and article reflow. Screenshots at 390, 768 and 1440px. Tables/code scroll inside labelled regions. |
| Keyboard, visible navigation, skip link, focus and text zoom | PASS | Browser interaction checks plus visual smoke. No hidden horizontal mobile navigation. |
| Automated accessibility checks | PASS | axe WCAG 2 A/AA, 2.1 AA and 2.2 AA tags on tested routes; palette contrast tests. See browser results. Full conformance and screen-reader use remain NOT TESTED. |
| Content facts, images/licences, limitations and dates | PASS | Existing public CV/repositories and owner files used; figure attribution/licence notes retained. Five articles first published 15 November 2026 after explicit approval; source references attached. |
| Internal links, image assets and fragments | PASS | [link-audit.json](link-audit.json): 35 HTML pages, 751 references, zero errors. |
| External links | NOT TESTED | [external-links.json](external-links.json): 26 HTTP successes; two automated requests blocked (LinkedIn 999, university 403). Playback/content verification is outside an HTTP check. |
| Typed Astro article/project/service collections and five category labels | PASS | Validated schemas; missing review/date, future dates and demo-publication misuse fail validation. Markdown and MDX supported. |
| Search, category filtering, tags, summaries, dates, URL restoration and empty states | PASS | Browser tests type, filter, reset, restore URL and check no-results. Category pages are generated from content, never dead empty destinations. |
| Article SEO URLs, metadata, canonical, Open Graph, sitemap and RSS | PASS | Built-output assertions and publishing integration test. Canonical host is github.io; each article has independent URL. |
| Drafts excluded from production listings, article routes, homepage, RSS and sitemap | PASS | Build assertions and browser production 404 checks; five internal authoring/review drafts remain unpublished. Public-repository source is not private. |
| Automatic homepage/library/category/feed/sitemap/related updates on publication and unpublication | PASS | [publishing-test.json](publishing-test.json). Synthetic five-category Markdown and MDX files exist only in an isolated temporary checkout. No component edits needed. |
| Long technical reading, TOC, references, equations, highlighted/copyable code, figures and tables | PASS | Five supplied long articles plus internal authoring fixtures tested across engines; Markdown table wrapping at build; readable no-JavaScript article content. |
| Owner publishing through VS Code and GitHub web interface | PASS | [publishing guide](../docs/PUBLISHING.md): create, preview, review, publish, update, unpublish, troubleshoot. GitHub file editor alone cannot run an Astro preview. |
| Optional CMS evaluation and approval boundary | PASS | [CMS evaluation](../docs/CMS_EVALUATION.md); none installed, no third-party auth configured. |
| Compatible pinned stack, lockfile, check, lint, build and tests | PASS | Fresh npm ci and successful [GitHub validation](https://github.com/itsEkramah/itsEkramah.github.io/actions/runs/43689496838): all 27 browser tests passed, plus check/build/lint/unit/publishing/audits. Final local results accompany this report. |
| Dependency and secret review, minimal CI permissions, no third-party runtime requests | PASS | Full/production npm audit reports: zero advisories; redacted source/output/reachable-history pattern scan: zero findings. CI SHA pins and least-privilege jobs. Pattern scans are not exhaustive. [Security review](../docs/SECURITY_REVIEW.md). |
| Actual screenshots and Lighthouse outcomes | PASS | [screenshots](screenshots/), [Lighthouse summary](lighthouse-summary.json). Lab scores and remaining limitations below; not field performance or complete accessibility proof. |
| Authorized GitHub Pages deployment and live HTTPS/deep links/404/crawler verification | NOT TESTED | Pending initial merge and post-deployment checks. See release record below. |
| DNS/custom-domain migration gated | PASS | No DNS/custom-domain change. EU.org approval and separate migration authorization still required. |
| Operations, rollback, issue list and security limitations | PASS | README, publishing/security guides and [issue list](ISSUES.md). Baseline preserved and rollback through a reviewed revert documented. |

## Performance evidence

Lighthouse 13.6.0, headless Chromium, simulated mobile throttling, local static production output. See the JSON for timestamps/environment, scores and measured LCP/CLS. Scores vary with the test machine. The Writing page's initial CLS of 0.143 was traced to delayed search controls and fixed by rendering reserved controls/count in HTML; the final measurement is the release evidence.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 90 | 100 | 100 | 100 | 0.9 s | 0 |
| Portfolio | 100 | 100 | 100 | 100 | 1.1 s | 0 |
| Services | 99 | 100 | 100 | 100 | 0.9 s | 0 |
| Writing | 97 | 100 | 100 | 100 | 0.9 s | 0 |
| Published genomics article | 93 | 100 | 100 | 100 | 0.9 s | 0 |

## Release record

Initial source approval: owner instructed publication of all five supplied articles in this chat. GitHub Pages source was changed to GitHub Actions and the saved setting verified. No custom domain was entered. Production URL, exact merge commit, workflow and post-deploy checks will be appended after deployment.
