# Navigation and portfolio correction — local review

Historical predeployment evidence. The owner subsequently approved publishing the complete revision, including institution links and Forest & Paper, on 15 November 2026.

15 November 2026. Base release: `10ed1eaf422dd947ddfa7c97c461f153f70a0986`. Branch: `codex/navigation-portfolio-restructure`.

**Not deployed.** No push to production, DNS change, dependency addition or new service integration was performed. The public site remains on the base release. Owner approval is required before merging or deploying this revision.

## Preview

- [Home](http://127.0.0.1:4321/)
- [Portfolio](http://127.0.0.1:4321/portfolio/)
- [Services](http://127.0.0.1:4321/services/)
- [Writing](http://127.0.0.1:4321/writing/)

The existing static preview server serves the revised `dist/`. To start a preview after reopening the project, run `npm run build`, then `npm run preview -- --port 4321`. Use the ordinary production build for review; author/demo modes intentionally include unpublished fixtures.

## Acceptance

| Requirement | Result | Evidence |
| --- | --- | --- |
| Portfolio begins with identity, qualification, concise background and CV/GitHub/LinkedIn/Contact | PASS | New Portfolio header; compact heading; [desktop](screenshots/revised-portfolio-1440.png), [mobile](screenshots/revised-portfolio-390.png). |
| Education → experience → skills → selected projects → additional work → contact | PASS | Ordered section assertions and working in-page links in three engines. Experience uses most recent internship first. |
| Verified academic and employment details | PASS | Existing two-page public CV was reread. QAU BS Bioinformatics, 2022–2026, CGPA 3.40/4.00; NIH Jul–Aug 2025 and Digital Empowerment Network Jul–Sep 2024. Responsibilities retain the distinction between analysis work and laboratory exposure. |
| Six skill groups without expertise badges | PASS | Shared `src/data/profile.ts`; skills supported by the CV or existing projects. No certifications added because none were supplied or present in the CV. |
| Principal research/development projects retain methods, tools, results, limitations, authentic figures, repositories and case studies | PASS | Three principal projects; two existing scientific figures now have accessible descriptions/captions. PathoScope retains its team label, contribution scope, fallback caveats and existing video link. |
| Demonstrations remain secondary | PASS | Three existing demonstrations retained under Additional Projects & Prototypes, after principal projects. No client-delivery claims added. |
| Services is a self-contained client destination | PASS | Five requested service names; deliverables, tools, approach, labelled evidence, detail links and Request a Project per service. Education, portfolio gallery and article feed absent. [Desktop](screenshots/revised-services-1440.png), [mobile](screenshots/revised-services-390.png). |
| Writing is exclusively an article library | PASS | Five category links moved above listings; search/filter/reset retained; publication dates and estimated reading times present; no résumé, services catalogue or project gallery. [Desktop](screenshots/revised-writing-1440.png), [mobile](screenshots/revised-writing-390.png). |
| Homepage remains a gateway | PASS | Original section order retained: introduction, three articles, service previews, two compact projects, background preview, contact. Background links now lead to the Portfolio résumé sections. [Desktop](screenshots/revised-home-1440.png), [mobile](screenshots/revised-home-390.png). |
| Consistent Home / Portfolio / Services / Writing / About / Contact / CV / GitHub navigation | PASS | All eight links visible at tested widths. Active section is visually marked and has aria-current; Home only matches the root path. GitHub is no longer hidden on smaller screens. |
| Recruiter journey | PASS | Home → Portfolio → Education → Experience → Skills → Projects → case study/GitHub; real CV responds with PDF content. Tested in Chromium, Firefox and WebKit. |
| Client journey | PASS | Home → Services → Python service → scope/deliverables/tools/evidence → Contact. Every service has a contact action and relevant evidence. Tested in three engines. |
| Reader journey | PASS | Home → Writing → search/reset → Medicine & Pharma category → existing AMR article → references/related reading. Tested in three engines. |
| Existing URLs, dates and content preserved | PASS | [URL comparison](url-compatibility.json): all 27 live sitemap URLs retained, none added/removed. Existing article source files and case-study routes remain unchanged. Legacy Portfolio academic/software fragment targets also retained. |
| Build, lint, Astro/type checks, metadata, canonical links and unit checks | PASS | Build emits 35 HTML pages. Astro check: 50 files, zero errors/warnings/hints. Lint and all five unit checks pass; unit checks include unique metadata, safe Markdown and AA palette contrast. |
| Internal links and fragments | PASS | [Link audit](link-audit.json): 800 references across 35 pages, zero errors. |
| Publishing and draft behaviour | PASS | Isolated publishing/unpublishing integration passes; the original production draft exclusions, scientific Markdown/MDX fixtures, related reading and five published articles pass regression checks. No article date changed. |
| Browser regression and responsive accessibility | PASS | [Full regression](full-regression.json): 39/39 passed. After the compact-heading refinement, [final destination checks](playwright-results.json): 12/12 passed. Chromium, Firefox and WebKit; widths 320/390/768/1024/1440px; no page overflow; axe checks on core pages at desktop/mobile, plus prior route, keyboard, zoom, no-JavaScript and console/network checks. |
| Actual figure screenshots | PASS | Final captures scroll to and verify loaded scientific images before returning to the top. This avoids blank lazy-image placeholders in full-page screenshots. |
| Maintainability and palette | PASS | Shared profile data and experience component reused by Portfolio/About/home; project/service collection records supply summaries. Reading estimates use one shared helper. Colour tokens, package manifests/lockfile and workflows are unchanged. |
| Secret-pattern scan | PASS | [Scan](security-scan.json): zero findings in source/output/reachable history. Pattern scans are limited and do not certify the absence of secrets. |
| Independent ten-second usability study / real-device screen-reader review | NOT TESTED | Journey automation and visual checks support the layout decision; they do not replace independent user research or assistive-technology testing. |
| New Lighthouse/field performance measurement | NOT TESTED | Not rerun for this bounded revision. Historical release measurements remain in the original QA report and must not be described as new results. |
| Production deployment of this correction | NOT TESTED | Intentionally awaiting explicit owner approval. No cloud CI run was triggered because the branch was kept local. |

## Verification notes

The first full regression passed all 39 tests. A subsequent targeted run exposed a whitespace-sensitive heading assertion after preserving an old fragment ID; the assertion now checks normalised visible text. The final 12-test run passed with no failures, skips or flaky outcomes. Screenshot checks also verify image loading. Raw reports above describe the actual runs rather than implying that all accessibility or usability questions are settled.

Scientific/project interpretation and third-party destination limitations documented in the original security/content review still apply. Existing external destinations were retained; a new external-site content or video-playback review was not performed.
