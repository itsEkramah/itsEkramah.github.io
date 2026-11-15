# Ekramah — Professional Website Engineering Handoff
**Version:** 1.0  | **Date:** 2026-11-15 | **Status:** Design/engineering specification; implementation not started

## Mission
Create a premium, genuinely personal website for Muhammad Ekramah. It must work simultaneously as (1) recruiter-friendly portfolio, (2) well-organized long-form technical publication, (3) clear professional services directory and (4) credible home for documented SEO experiments. The homepage is one continuous, editorial-style page; full articles, portfolios and service details get individual canonical URLs. A visitor must reach what they need from the global navigation without reading unrelated content.

## Source of truth and order
1. `docs/01_PRODUCT_REQUIREMENTS.md`
2. `docs/02_INFORMATION_ARCHITECTURE.md`
3. `docs/03_DESIGN_SYSTEM.md`
4. `docs/04_TECHNICAL_ARCHITECTURE.md`
5. `docs/05_CONTENT_AND_EDITORIAL.md`
6. `docs/06_SECURITY_AND_PRIVACY.md`
7. `docs/07_SEO_ACCESSIBILITY_PERFORMANCE.md`
8. `docs/08_QA_DEPLOYMENT_ACCEPTANCE.md`
9. `docs/09_DECISION_LOG_AND_OPEN_ITEMS.md`
10. `prompts/CODEX_MASTER_PROMPT.md` and `prompts/CODEX_REVIEW_PROMPT.md`

## How to use
1. Open the repository/local project in Codex with authorized access. Provide `prompts/CODEX_MASTER_PROMPT.md` as the implementation instruction and the entire `docs/` folder as project specification.
2. Codex must inspect any existing repository BEFORE writing or deleting files; make a safe implementation plan and then implement, test, and report.
3. Do not publish personal data, CV, portraits, public service claims or site content without verifying user-provided assets and source facts.
4. Deploy initially to `https://itsekramah.github.io/` only after validation. The prospective `ekramah.eu.org` name is NOT approved at the time of this document; treat migration as a separate gated task.

## Explicit exclusions
No authentication system, database, newsletter signup, self-hosted analytics dashboard, backend contact endpoint, payments, client portal, automated AI article generation, fictitious posts, invented social proof, or dependency-heavy animation framework in v1.

## Definition of done
A deployed, functional, accessible, tested static site with trustworthy content, simple navigation, categorized writing, clear services, real portfolio evidence, working links, CI security and QA checks, documented operating procedures and rollback path. No promise of search ranking or zero vulnerabilities.
