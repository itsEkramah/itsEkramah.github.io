# Acceptance matrix — evidence-led revision, 16 November 2026

This matrix records the reviewed source tree before its protected PR merge. Starting public commit: `fdc332bef7a73d23b2a2350bf421b5aba6732c3e`; local review/hardening base: `a9d2e01`. The final PR and merged SHA are recorded in the publication handoff. User-approved route, palette, homepage-order and publication decisions supersede the original handoff. PASS applies only to the specified evidence; it is not a full WCAG, scientific or security certification.

See [A–H review](REVIEW.md), [command results](evidence/commands.json), [45-test summary](evidence/e2e-summary.json), [performance](evidence/performance.json), [link audit](evidence/link-audit.json), [repository rule](evidence/branch-protection.json) and [screenshots](screenshots/).

## Every requirement in docs/01_PRODUCT_REQUIREMENTS.md

IDs below are review identifiers because the PRD does not assign requirement IDs.

| ID / PRD location | Requirement | Result | Evidence / qualification |
| --- | --- | --- | --- |
| P01 · Vision | Distinctive, human-made editorial/engineering presentation | PASS | Revised opening has a sourced AMR plot, varied editorial composition and restrained Forest & Paper palette. Screenshots inspected; aesthetic judgement, not an authorship detector. |
| P02 · Vision | Modest claims, real figures, no gratuitous animation or fake proof | PASS | Source/content inspection; authentic-figure hashes; disclosed prototype and internal-validation limits. No invented testimonial or fake portrait found. |
| P03 · Audience: recruiter | Main destination in one navigation click; evidence in at most two from Portfolio | PASS | E2E recruiter journey, active header links, direct case studies and repository links. Timed comprehension is assessed separately below. |
| P04 · Audience: client | Always-available Services; scope/evidence/contact on service pages | PASS | All five service routes and client journey exercised in three browser engines. |
| P05 · Audience: reader | Direct article, author, date, field, sources and related work | PASS | Published article inspection, E2E, live article refresh. |
| P06 · Audience: collaborator | Methods, reproducibility, limitations and code discoverable | PASS | AMR/RNA-seq/PathoScope case studies and evidence links; this does not validate the scientific experiments independently. |
| P07 · Navigation | Visible global Portfolio/Services/Writing/About/CV/Contact/GitHub and home link | PASS | Header contains eight links including Home; keyboard and active-state checks. Always-visible wrapped mobile navigation is used rather than a hidden menu. |
| P08 · Home intro | Truthful compact 1–2 sentence introduction | PASS | Two-sentence homeSummary replaces the repeated full biography; future study intent remains in background/About. src/data/profile.ts:6. |
| P09 · Home actions | Direct primary Work/Services actions and secondary Writing | PASS | Explore Portfolio / View Services / Read Articles all work; visible on mobile. |
| P10 · Home selected projects | Two to four verified, linked previews | PASS | Exactly two compact previews with genuine project titles and direct case studies. Full gallery remains on Portfolio. |
| P11 · Home services | Four to six scoped groups and a Services link | PASS | Five groups generated from the service collection. |
| P12 · Home writing | Three to five genuinely published items and library/category discovery | PASS | Three collection-generated published previews; five populated category pages. First-publication approval/date recorded. |
| P13 · Home background | Accurate compact education/experience with a details route | PASS | Shared profile data; actual CV agrees; Portfolio education/experience jump links work. Expanded Portfolio is the later owner-approved destination. |
| P14 · Home contact | Contact/social links and simple footer | PASS | Approved mail link, GitHub, LinkedIn and Contact present; no backend form. LinkedIn content verification is separately NOT TESTED. |
| P15 · Home order | Correct section hierarchy | PASS | Later owner order: introduction → writing → services → two projects → background → contact. Original PRD order intentionally superseded. |
| P16 · Routes | Home, portfolio/project, services/detail, writing/category/article, about, contact, 404 and real CV | PASS | 35 generated HTML pages and 821 internal link/anchor/asset checks passed. Existing article/case-study URLs and noindex Work aliases preserved. |
| P17 · Function: navigation | Skip link, visible focus, active states and keyboard navigation | PASS | Full E2E plus three-engine targeted keyboard/rem-sizing retest. No sticky overlay or keyboard trap observed. |
| P18 · Function: article listings | Category/date/summary/direct URL and no empty category traps | PASS | Five actual published articles, dates, tags/reading times and five populated category pages. |
| P19 · Function: article template | Reading width, headings, dates, TOC, references, code, figures, related/byline | PASS | Published articles now include actual worked examples, code/table styling, dates, related work and references; separate Markdown/MDX scientific fixtures also render. |
| P20 · Function: case studies | Question/data/methods/results/evidence/limitations and genuine links | PASS | Six case-study routes; metrics cross-checked with public result files; demonstrations labelled. |
| P21 · Function: services | Audience, scope, deliverables, boundaries, evidence and contact | PASS | Five service records retain scope/deliverables/boundaries/evidence/contact. Native tools/method disclosure reduces repeated visible detail; client journey passes. |
| P22 · Function: contact | Deliberate mailto and approved public profiles; no backend form | PASS | Email owner-approved; static contact route and links checked. Actual email delivery NOT TESTED. |
| P23 · Function: responsiveness | 320px through large desktop, no document horizontal overflow | PASS | E2E at 320/390/768/1024/1440; additional 15 combinations at 390/768/1440 had no overflow. |
| P24 · Function: zoom | Native browser zoom/text resize at least 200% | **NOT TESTED** | Root-font enlargement is not equivalent to native zoom; old test description corrected, M7. |
| P25 · Function: motion | Reduced-motion support; no intrusive animation | PASS | CSS reduced-motion rule and source inspection; no parallax, particles or autoplay found. |
| P26 · Function: search | Small progressive-enhancement filter, native article access without JS | PASS | Search/category/empty/reset/URL state and no-JS tests pass. Tablet first article appears at about 585px; compact categories and controls retained. |
| P27 · Nonfunctional: WCAG | Complete WCAG 2.2 AA, including manual assistive-technology review | **NOT TESTED** | Axe/keyboard/contrast/reflow checks pass; no NVDA/VoiceOver or complete criterion-by-criterion audit performed. |
| P28 · Nonfunctional: Lighthouse | Mobile P≥90, A/BP/SEO≥95 on representative pages | PASS | Final local mobile samples: Home95, Portfolio100, Services97, Writing100, article98; A/BP/SEO100 on all five. LCP1.1–1.5s, CLS0; see performance.json. Earlier lower samples retained in raw logs. |
| P29 · Nonfunctional: CWV | Field p75 LCP≤2.5s, INP≤200ms, CLS≤0.1 | **NOT TESTED** | No field dataset or real low-end device study. Local simulated mobile Lighthouse is a proxy, not field INP or p75 CWV. |
| P30 · Nonfunctional: payload/fonts | Low JS, no unnecessary hydration, local/system fonts | PASS | No React/Vue island framework; small inline modules; no standalone JS output or source maps in current build; system font stacks. |
| P31 · Nonfunctional: privacy | No trackers/cookies/remote scripts/embeds or fabricated metrics | PASS | Observed runtime: no off-origin resources, no cookies; project numbers match cited files and retain limitations. |
| P32 · Editorial: source discipline | No fabricated biography, dates, publications, clients, results or assets | PASS | Existing CV, source records and owner approvals support transcription. Independent credential authentication is NOT TESTED, below. |
| P33 · Editorial: external destinations | All external links verified successfully before acceptance | **NOT TESTED** | 28 of31 external links returned HTTP200. LinkedIn999, QAU403 and official NCB403 block automation. The NCB address is supported by primary university sources; YouTube playback/content remains unverified. |

## Additional requirements from docs/02 through docs/09 and later owner instructions

| ID / source | Requirement | Result | Evidence / qualification |
| --- | --- | --- | --- |
| A01 · docs/02; owner correction | Independent résumé Portfolio, services-only index and writing-only library | PASS | Each destination has its appropriate content; no full blog/service catalogue on Portfolio; destination journeys pass. |
| A02 · owner correction | Portfolio order: identity, education, experience, grouped skills, projects, additional work, contact | PASS | E2E checks exact section order, two internships, six skill groups and 3 principal/3 additional projects. No unsupported certification section added. |
| A03 · owner institution links | QAU, NCB and NIH names are clickable | PASS | Clickable QAU, official ncb.qau.edu.pk and NIH links inspected in source/generated output; journey and internal-link checks pass. Successful university access is separately NOT TESTED due403 responses. |
| A04 · docs/02 | One H1, meaningful headings, breadcrumbs and distinct metadata | PASS | Unit/output checks and E2E; article/project breadcrumbs, correct canonicals. |
| A05 · docs/03; Forest & Paper approval | Approved palette, system editorial type, no fixed profile sidebar or fake imagery | PASS | Actual tokens and screenshots agree; original palette superseded by later approval. |
| A06 · docs/03 | Comfortable supporting typography and readable scientific figures | PASS | Relative16–17px body, larger captions/supporting copy, legible accessible opening SVG and full-size original figure links. Supporting metadata is generally13–14px. Screenshots and enlargement checks inspected. |
| A07 · docs/03 | Clear layout rhythm without repetitive card/template styling | PASS | Distinct lead/secondary article hierarchy, flat service comparisons and figure-plus-copy research rows replace repeated uniform panels. Design assessment recorded in REVIEW.md. |
| A08 · docs/03; docs/08 | Actual screenshots of Home/Portfolio/Services/Writing/article at 390/768/1440 | PASS | Fifteen full-page and fifteen untouched viewport captures of Home/Portfolio/Services/Writing/published AMR article at390/768/1440. Both use unmodified CSS; lazy-image capture method documented in layout.json. |
| A09 · docs/04 | Static Astro, current glob content loader, strict TypeScript, compatible pins/lockfile | PASS | Astro7.4.12; check/build pass; 600 registry lock entries have integrity fields; official API/deploy docs consulted. |
| A10 · docs/04; publishing expansion | Typed/validated article/project/service records | PASS | Collection schemas and build-time validation; no database or extra backend. |
| A11 · publishing expansion | Five categories; automatic dated summaries/tags/search/filter/reading time | PASS | Actual category/collection output and E2E. User's expanded category labels supersede original short labels. |
| A12 · publishing expansion | SEO article URLs, canonical/OG/JSON-LD/feed/sitemap generated automatically | PASS | Isolated publishing test plus output/live checks; no invented publication dates or rich-result promises. |
| A13 · publishing expansion | Markdown/MDX, highlighted code/copy controls, tables, math, references and accessible figures | PASS | Fixtures render MathML, code, table and MDX figure in three engines. Chromium clipboard content and copied-status announcement verified; Windows clipboard line endings were normalised when comparing. |
| A14 · publishing expansion | Drafts absent from production routes/lists/feed/sitemap | PASS | Five internal drafts excluded; production 404 tests and isolated publication/unpublication checks. Draft source remains public on GitHub. |
| A15 · publishing expansion | New publication updates homepage, library, category and related articles without component edits | PASS | Synthetic fixtures in isolated checkout prove all five categories, MDX, related reading, publication and unpublication. |
| A16 · publishing expansion | One clearly unpublished example per category | PASS | Five internal authoring examples remain drafts; separately approved essays are genuinely published. |
| A17 · publishing expansion | VS Code and GitHub-web creation/preview/edit/publish/update/unpublish guides | PASS | `docs/PUBLISHING.md`; current publication-state contradiction fixed locally. Full styling preview remains local, not a falsely claimed GitHub Markdown preview. |
| A18 · publishing expansion | Optional CMS evaluated; no added CMS/auth without approval | PASS | `docs/CMS_EVALUATION.md`; no CMS, OAuth app, token or third-party authoring service installed. |
| A19 · docs/05 | Original worked examples/method evidence in technical writing | PASS | All five published essays have bounded worked examples. Four inspected Python snippets executed successfully; real AMR values trace to a frozen CSV. Synthetic data clearly labelled, original dates/URLs preserved. |
| A20 · docs/05 | Independent biography/employer/degree authentication | **NOT TESTED** | CV and owner agreement checked; no university transcript verification, employer attestations or certification proof. |
| A21 · docs/05 | Research results reproduced independently | **NOT TESTED** | Public CSV/JSON values match; original raw-data/model/RNA-seq analyses were not rerun. |
| A22 · docs/05 | Boundaries for medical data/prototypes/SEO outcomes | PASS | Educational medical disclaimer; internal AMR estimates; GWAS caveat; PathoScope simulated fallbacks; no clinical/SEO guarantee. |
| A23 · docs/06 | Account MFA, recovery and DNS custody verified | **NOT TESTED** | No account access-control audit or DNS-provider inspection performed. |
| A24 · docs/06 | Enforced PR/review/check and no-force-push protection | PASS | Active ruleset27342891 requires PR + GitHub Actions validate + current branch + resolved conversations; blocks deletion/force push, no bypass. Zero approvals for sole maintainer; does not enforce independent two-person review. API evidence in branch-protection.json. |
| A25 · docs/06 | Least-privilege CI, immutable actions, no privileged untrusted-PR event | PASS | SHA-pinned official actions, read-only validation/build, checkout credentials not persisted, Pages/OIDC write only in deploy; no `pull_request_target`. |
| A26 · docs/06 | Exact dependency lock/install, advisory scan and update process | PASS | Pinned dependencies/lockfile unchanged; prior fresh npm ci passed. Full and production npm audits report zero advisories. npmrc disables install scripts; advisory coverage is limited. |
| A27 · docs/06 | Source/history/compiled-output credential checks | PASS | Pattern scanner run across reachable history; local generated-text coverage fix and canary regression passed. Specialist Gitleaks scan NOT TESTED. |
| A28 · docs/06 | Safe Markdown/JSON-LD; trusted MDX boundary explicit | PASS | Sanitised Markdown test; `<` escaped during JSON serialisation; MDX is documented executable trusted source, not a sandbox. |
| A29 · docs/06 | No private street address/phone or unapproved credentials published | PASS | Current CV text and source inspection within scope; approved public emails/profiles. No matched credential patterns; not proof of every possible secret format. |
| A30 · docs/06 | Actual HTTP security headers/HTTPS measured honestly | PASS | HTTP301, HTTPS success, HSTS measured; absent XFO/nosniff/CSP response headers reported as hosting limits. No fake `_headers` claim. |
| A31 · docs/06; domain gate | No premature domain/CMS/DNS change | PASS | No CNAME/DNS/custom-domain/CMS/auth change. Only authorised production publishing rules changed. EU.org approval and DNS custody remain NOT TESTED. |
| A32 · docs/07 | Crawlable static content, canonical aliases, valid published index targets | PASS | Output checks, no-JS test, live refresh, normal pages indexable and Work aliases noindex/canonical. |
| A33 · docs/07 | Owner Search Console setup and field monitoring completed | **NOT TESTED** | No authenticated Search Console account or field metrics accessed; no indexing/ranking guarantee. |
| A34 · docs/08 | Build, tests, axes, links, scan and performance evidence recorded | PASS | Current lint/check/build/unit5/publishing/links821/security and45 cross-browser tests pass; Lighthouse target met. After minor caption/NCB-link corrections,6 targeted three-engine cases passed; final PR CI must validate the exact committed tree. Initial failures retained in commands evidence. |
| A35 · docs/08 | Ten-second independent recruiter/client comprehension | **NOT TESTED** | Direct routes and click counts work, but no independent timed recruiter/client comprehension study was performed. |
| A36 · docs/08 | Existing production route refresh, HTTPS and crawler resources verified | PASS | Existing production host baseline was refreshed on nine routes and checked for HTTPS/crawler/CV/404 behaviour. This matrix freezes local pre-merge acceptance; the new release requires a separate post-deploy receipt before claiming deployment success. |
| A37 · docs/08 | Reversible operating/publishing/rollback instructions | PASS | README, publishing guide, reviewed Git workflow and known-good public commit recorded. |
| A38 · docs/08; owner deploy rule | No new production deployment without explicit approval | PASS | Owner explicitly authorised all fixes, testing and deployment for this revision. Merge must wait for required validate; production result is verified separately after merge. |


## Release gate

Follow-up: [published mobile code accessibility correction](../keyboard-code-blocks/REVIEW.md). A live audit found a keyboard-scroll defect after the original 45-case baseline; the correction adds three engine cases. This matrix preserves the original evidence chronology. Final 48-case CI and deployment verification are reported in the publication receipt.

**GO for protected publication after required CI succeeds**, with the explicit NOT TESTED items above. There are no known unresolved Critical/High implementation findings in this review scope. This is not a claim of complete WCAG conformance, independently authenticated credentials, clinical validation or field performance. New deployment success must be observed after merge; do not infer it from this local matrix.
