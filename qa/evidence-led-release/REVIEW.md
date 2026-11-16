# Evidence-led revision — 16 November 2026

## A. Executive verdict

The starting release (`fdc332b`) was functional but not ready for final product acceptance. Fresh source/browser inspection confirmed the previous review's presentation findings and unprotected production branch. The owner then explicitly authorised creative/content changes, security hardening, testing and deployment. This revision addresses those implementation findings while preserving factual boundaries and existing URLs. Final test/deployment results are in `ACCEPTANCE.md`; unperformed checks remain NOT TESTED. This is a fresh review by the same coding agent, not an external human audit.

## B. Top ten issues and resolutions

| Priority | Issue / previous finding | Resolution and evidence |
| --- | --- | --- |
| High | Unprotected `main` / H1 | Created Active ruleset `27342891`: PR, GitHub Actions `validate`, up-to-date branch and conversation resolution required; force pushes/deletion blocked. GitHub UI and API inspected; branch metadata now reports protected. |
| Medium | Proof several screens down / M1 | Home and Portfolio open with a legible AMR result figure and direct case-study link. A text/data alternative and source accompany it. New regression checks evidence before 750px on Portfolio at 390/768/1440. |
| Medium | Repeated long bios / M2 | Short `homeSummary`, contribution-focused `portfolioSummary`, full approved biography on About. Postgraduate intent retained in background/About. |
| Medium | General essays without examples / M3 | Genomics now explains an actual grouped-validation decision with frozen-source results; all five essays have bounded worked examples and genuine update notes. Four inspected Python examples executed. Synthetic data explicitly labelled; original publication dates preserved. |
| Medium | Tiny supporting type / M4 | Captions/tools increased to at least 14px, short metadata 12–13px or larger; relative body typography. Original scientific images have full-size inspection links. |
| Medium | Controls before writing / M5 | Compact library header, categories and search form. First article appears around 585px at tablet width in the first pass; regression threshold is 750px. All category/filter/no-JS features retained. |
| Medium | Repeated service specifications / M6 | Flat, compact comparisons with deliverables/evidence/contact visible; tools/method under native disclosure and full details on existing service pages. |
| Medium | Zoom-test overclaim / M7 | Body now uses relative units; regression verifies actual body font size doubles and pages reflow. Native zoom is separately recorded as NOT TESTED. |
| Medium | Generated-output secret scan gap / M8 | Included the prior review's extended text-output scan and generated-JS canary regression. Pattern coverage remains limited. |
| Low | Windows lint, stale docs and branding / L1–L3 | Included LF attributes and honest test labels; fixed publishing-state documentation; updated footer/social SVG/PNG/OG description to software development. Ignored scratch builds excluded from Astro diagnostics. |

## C. Sitemap and homepage hierarchy

Reproduction, impact and exact original file locations for H1/M1–M8/L1–L3 are retained in the [preceding detailed findings](../independent-review-2026-11-16/REVIEW.md). Current remediation locations are `src/components/ResearchEvidence.astro:1` and `src/data/research.ts:1` (source-linked proof), `src/data/profile.ts:6` (distinct introductions), `src/styles/refinements.css:4` (relative body type), `src/pages/services/index.astro:1` (service comparisons), `src/pages/writing/index.astro:1` (library), and `tests/e2e/editorial.spec.mjs:3` (evidence/enlargement regressions). The rule itself is a remote setting, recorded in `evidence/branch-protection.json`, rather than a claimed YAML fix.

An additional label-in-name failure was caught during Lighthouse review: the visible “ME Muhammad Ekramah” wordmark did not fully match its accessible label. `src/components/Header.astro:18` now includes the visible text. The main route axe test now includes WCAG 2.1 A tags, so speech-input label matching is checked as well. No exclusion was added to silence that rule.

Canonical routes stay: `/`, `/portfolio/` and six case studies, `/services/` and five details, `/writing/` and five category/article routes, `/about/`, `/contact/`, real CV, RSS/sitemap/robots and 404. Old `/work/` URLs remain noindex canonical aliases. No domain migration or authentication service was added.

Home: short introduction with one genuine research result → three collection-generated articles (one lead, two secondary entries) → five concise service rows → two research previews → background → contact. Portfolio retains identity → education → experience → skills → projects → additional work → contact. Immediate evidence and project jump links sit within the identity section. Services and Writing keep their independent purposes.

## D. Visual art direction

Forest & Paper is retained: the palette was coherent; hierarchy and proof were the main weaknesses. The new composition uses a source-linked dot-and-interval figure, asymmetric article entries, flat service rows and smaller reading-page titles. There is no fake portrait, invented screenshot, stock DNA image, downloaded font, gradient, animation library or tracking service.

`src/styles/refinements.css` groups the route-scoped composition rules. Body is 16–17px in relative units. Scientific source PNGs are unchanged and have full-size links. The new opening chart uses `src/data/research.ts`, transcribed from AMR revision `5893f20c9bdb6ca64e91cb7b2043dd7bfb7c1db6`, `results/tables/bootstrap_confidence_intervals.csv`. It presents existing internal estimates and their limitations, not a new experiment or clinical validation.

Performance was measured during refinement rather than assumed from a successful build. Whole-section `content-visibility` was tried, failed reliable axe hit-area inspection in all three engines and was removed. No axe rule was disabled. Ordinary heading wrapping and an 8KiB small-style inline threshold reduce rendering/network work while leaving the larger shared stylesheet cacheable. All content remains normally rendered. The final representative Lighthouse run scored P95/100/97/100/98 (Home/Portfolio/Services/Writing/article), with A/BP/SEO100, LCP1.1–1.5s and CLS0. These are local simulated-mobile samples; earlier lower samples are not hidden. A small caption spacing correction after that run does not change the initially closed figure panel.

## E. Security findings

The high-priority branch finding is resolved by a real enforced repository rule. Required approvals are zero for the sole-maintainer workflow, preventing impossible self-approval; this is not an independent two-person review policy. No bypass actor was added. An administrator can still change rules, so account compromise remains relevant.

CI/build remain read-only; only deployment has Pages/OIDC write. Actions are SHA-pinned, installation scripts disabled, and no privileged untrusted-PR event or application secret was added. A credential-helper attempt was unavailable and logged no credential contents; protection was configured through the owner's existing authenticated browser. No new credential was created or stored.

Markdown is sanitised; structured data is escaped. MDX remains trusted executable build input. Python snippets were individually inspected and executed once; arbitrary Markdown execution was not added to CI. Dependency advisories, pattern scans, live headers/HTTPS and outbound requests are reported with scope limits. Meta CSP cannot supply all response-header controls on GitHub Pages. No DNS settings changed.

## F. Acceptance criteria

Recruiters must see identity/CV/project evidence early; clients must reach scope/evidence/contact directly; readers must reach actual articles without a large form. Existing project, institution and article links must keep working. Core pages must reflow at 320/390/768/1024/1440; text enlargement must change body size. Published dates remain 15 November; worked examples carry genuine 16 November update notes. Build/lint/type/unit/publishing/link/security/cross-browser checks must pass before a validated PR is merged. Performance goals and the deployed result must be measured, not assumed.

## G. Documentation amendments

README and design/decision records describe distinct introductions, the genuine opening result, relative typography, compact destinations and protected publishing. The content evidence record names the immutable data source and checked examples. Publishing retains VS Code/GitHub-web steps and publication/update distinctions. Security/QA notes distinguish the resolved branch finding from the historical review. Past reports and original handoff specifications remain available.

## H. Residual risks / unverified claims

The CV supports source agreement for education, CGPA and internships, not independent university/employer authentication. Public result files support transcription of metrics; original model/RNA-seq analyses were not rerun. Team attribution/video playback, LinkedIn destination content and commercial SEO outcomes are not independently authenticated. The inherited non-university NCB link was replaced with its primary `ncb.qau.edu.pk` address after checking university sources; automated university access remains blocked. No client metric, testimonial, diagnostic readiness or ranking guarantee was added.

Native zoom was attempted but not verified: browser shortcut dispatch did not change zoom, and the native desktop helper could not obtain input geometry. It is not counted as a pass. NVDA/VoiceOver, independent ten-second comprehension testing, real low-end devices, account MFA/recovery and field Core Web Vitals remain NOT TESTED. Draft source in a public repository remains public. Dependency and credential scans cannot certify complete safety. These limitations remain explicit in the handoff.

Primary implementation references checked during this revision: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [official GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [CSS bundling/inline thresholds](https://docs.astro.build/en/guides/styling/). Medical category semantics were checked against [EUCAST's S/I/R definitions](https://www.eucast.org/bacteria/clinical-breakpoints-and-interpretation/definition-of-s-i-and-r/); the synthetic arithmetic example does not classify real isolates or recommend treatment.
