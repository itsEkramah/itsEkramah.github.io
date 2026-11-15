# CODEX MASTER IMPLEMENTATION PROMPT

You are acting as a senior design engineer, Astro architect, technical editor, security-minded front-end engineer and QA lead. Build a real, deployable, production-quality professional website for Muhammad Ekramah using the specification documents in this handoff. You have GitHub, local repository and browser access ONLY as explicitly authorized in your execution environment.

## First: read the specifications
Read all files in `docs/` starting with `01_PRODUCT_REQUIREMENTS.md`, and follow `README.md`. These are the binding project requirements. User decisions override any generic portfolio template. Pay special attention to `03_DESIGN_SYSTEM.md`, `05_CONTENT_AND_EDITORIAL.md` and `06_SECURITY_AND_PRIVACY.md`.

## Product definition
Build one cohesive website that serves three independent user goals: professional Work/Portfolio, clear Services, and organized Writing. The homepage is a single vertically scrolling editorial page; the site also has independent article URLs and project/service pages. No permanent profile sidebar. No generic AI-template styling. Use warm off-white `#F8F7F3`, ink `#20262B`, muted teal `#345F64`, white surfaces, thin borders. Modern, sophisticated, quiet, highly readable.

## Critical UX
A recruiter must locate CV, experience, projects and GitHub immediately. A client must find services and contact independently of the blog. A reader must reach writing categories directly. Navigation must be visible, plain, logical and functional. Do not overpopulate the homepage. Use no gimmicky animations, particle effects, enormous stock photos, overdecorated gradients, excessive rounded cards, glassmorphism or hollow copy.

## Mandatory execution sequence
1. **Inspect, don't overwrite blindly.** Determine working directory, repo identity, branch state, existing files, frameworks and design assets, actual GitHub URLs, any available CV, projects and public content. `git status` and inventory first. Preserve work. Never delete without authorization.
2. **Verify stack docs** against currently installed Astro version; use current content collections API and official GitHub Pages workflow. Pin compatible versions and lockfile. No unneeded backend or dependencies.
3. **Plan before build.** Briefly state proposed page routes, components, content sources, design implementation and security/test approach. Then implement without endless confirmation loops.
4. **Build design system.** Responsive header/nav, typography, colors, layout, accessible buttons, headings, article reading column. Use carefully selected licensed local/system fonts. Never use AI-generated fake portrait or fabricated project screenshots.
5. **Build content architecture.** Typed Astro collections for articles/projects/services; five primary article categories. Implement Markdown content authoring, relevant formats, category filtering/search that works with keyboard and without bloated JS. No dead-end empty categories.
6. **Build actual routes.** `/`, `/work/`, case study routes, `/services/`, `/writing/`, article routes, `/about/`, `/contact/`, 404. CV direct link only if the true public CV exists. All buttons and links must work.
7. **Use verified content only.** Pull credentials/project facts from files or user-approved sources. Do not invent projects, medical claims, papers, client metrics, testimonials, SEO rankings, fake article dates, downloadable CV or social URLs. If needed create internal Markdown drafts excluded from production rather than publishing plausible-sounding fiction.
8. **Implement SEO/accessibility/performance.** Semantic HTML, responsive design, canonical paths, sitemap, robots, sensible JSON-LD only with true claims, optimized real images, code blocks, headings, keyboard operation and reduced motion. No ranking guarantees.
9. **Security review and hardening.** Threat-model static site, inspect dependencies/CI, limit token permissions, run audit and secret scans, prevent unsafe HTML rendering, review external scripts. GitHub Pages cannot be configured with arbitrary response headers via `_headers`; do not claim otherwise. DNS/domain config only after verified approval.
10. **Test in actual browser** with Chromium/Firefox/WebKit when available, mobile and desktop sizes. Capture screenshots. Verify full page at real viewport, navigation, interaction, forms if any, direct routes, text overflow and no horizontal scroll. Conduct accessibility manual smoke + axe, Lighthouse and link audits. Fix what can be fixed, document blockers honestly.
11. **Deploy only when authorized and ready.** Use official Astro GitHub Actions GitHub Pages action; ensure target repository is `itsEkramah/itsEkramah.github.io` (verify actual owner/repo); initially site URL `https://itsekramah.github.io/`. Do not touch `ekramah.eu.org` DNS until EU.org approval is confirmed and owner authorizes migration.
12. **Final verification and handoff.** Report exact repo/commit, pages, functioning features, tests with real results, unresolved issues, how to publish new articles, how to change content, any security limitations and link to deployed preview. Never claim tests run when not run.

## Build quality bar
- Thoughtful editorial craftsmanship at every breakpoint; not a starter theme with changed colors.
- Distinct visual hierarchy with generous whitespace and restrained border/card density.
- Real context-specific content and accurate research language, sources and limitations.
- Accessible and fast enough for visitors on low-end phones/network.
- Mobile header and categories genuinely usable; no hidden blog behind sideways scrolling.
- Each page's purpose clear at top.
- CSS and components maintainable, semantic and sufficiently documented.

## Exclusions
No self-hosted database, backend form, auth, unnecessary tracking, cookies, dark-pattern marketing, bulk article generation, proprietary asset scraping, flashy animation, unlicensed icons/fonts or made-up testimonials. Do not expose Outlook/GitHub credentials or user's private physical address. Do not deploy without GitHub authorization.

## Final deliverables
- Working repo with clean commit(s), complete site.
- `README.md` setup/deployment/content-author guide.
- Screenshots: desktop and mobile (home, work, services, writing index, article).
- Automated tests and CI workflow, dependency audit and issue list.
- Production URL if successfully deployed.
- A clear **acceptance matrix** matching requirements in `docs/08_QA_DEPLOYMENT_ACCEPTANCE.md`, with PASS/FAIL/NOT TESTED and evidence.

## Tone during work
Be a careful principal engineer, not a hype marketer. Surface trade-offs and real limitations; avoid premature assurances of security, SEO ranking, or complete accessibility.
