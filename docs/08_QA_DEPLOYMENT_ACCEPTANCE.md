# 08 — Quality Assurance, Deployment, Acceptance & Operations

## Test matrix
**Routes:** Home, Work index/detail, Services, Writing archive/category/article, About, Contact, 404, optional CV.
**Browsers:** Chromium, Firefox, WebKit via Playwright if available; desktop and mobile viewports (320, 390, 768, 1024, 1440px).
**Behavior:** Menu, navigation, filters, search, external URLs, page refresh/direct URLs, keyboard navigation, resize/zoom, focus, heading hierarchy, articles without JS, broken links, empty states.
**Content:** Date/category/filter correctness; no drafts; no fabricated data; each image has proper licensing/alt; project links actually resolve; CV correct/approved.
**Quality:** `astro check`, typecheck, lint, build, unit tests, E2E tests, automated axe audit, Lighthouse run, dependency scan, secret scan, link validation, sitemap/robots/canonicals.

## Deployment plan
1. Inspect repository and user-authorized changes; create feature branch or clean commit baseline. Never force push or delete existing work without explicit authorization.
2. Bootstrap code, implement shared layout and components, then content collections/routes.
3. Verify local preview with real browser; save screenshots for design review.
4. Run CI; fix high-priority issues; provide test results with actual values.
5. Deploy official Astro GitHub Actions workflow to Pages. GitHub Pages source should be GitHub Actions.
6. Verify live routes, HTTPS, crawler assets, direct deep links, console and network, mobile/desktop screenshots.
7. Hand over maintenance steps, deployment status, unresolved issues, rollback commit.

## Domain migration gate (later)
Trigger only after **EU.org approval**; confirm DNS custody and custom-domain control; set Pages custom domain, verify domain where possible, update A/AAAA/CNAME records per GitHub docs, HTTPS certificate, canonical, sitemap, Search Console, link consistency. Preserve internal slugs, test redirects from default GitHub domain, document Search Console changes. Roll back DNS and site config if broken.

## Acceptance criteria
- In <10 seconds, new visitor can identify work areas and locate Work, Services, Writing and Contact.
- Recruiter gets verified project detail and GitHub link in <=2 clicks from Home; client gets service explanation and contact path in <=2 clicks.
- Site usable at 320px without horizontal scrolling, with working keyboard navigation and visible focus.
- Build/CI succeed; all published links resolve; no secrets or confidential data in site/repo; security findings triaged; no active critical exploitable issues.
- Content factual and verified, and no fake articles/testimonials/SEO outcomes.
- SEO metadata/canonical/sitemap reflect correct live host and drafts excluded.
- Core pages have actual browser screenshots and documented Lighthouse/axe outcomes; any failures addressed or listed as release blockers.
- Owner can add article using a documented Markdown file and metadata without editing page templates.

## Maintenance runbook
To publish: create branch -> write Markdown -> set frontmatter -> validate citations/assets -> run local build/tests -> PR review -> merge -> check deploy -> verify URL/Search Console. Monthly: dependency advisories, broken links, backup/restore, content accuracy, domain/account access, accessibility regression. For incident: disable deployment or revert to known-good commit, revoke secrets, fix vulnerability, redeploy and document.
