# Muhammad Ekramah — professional website

Static Astro website for Work, Services and Writing. Intended production host: **https://itsekramah.github.io/**. The prospective EU.org domain is unconfigured.

## Local setup

Use Node **24.20.0** and npm 11+. Dependencies are locked; dependency installation scripts are disabled in `.npmrc`.

```sh
npm ci
npm run dev
```

Development shows marked drafts. `npm run build` followed by `npm run preview` shows the actual public output, excluding drafts. Never deploy `.qa-build/` or a development server.

## Authoring

Create a Markdown or MDX file in `src/content/articles/`. The library, populated category pages, homepage’s three featured articles, related reading, RSS, metadata and sitemap update automatically. No layout edits are required. Portfolio is available at `/portfolio/`; the older `/work/` routes are noindex aliases with Portfolio canonicals. **[The publishing guide](docs/PUBLISHING.md)** covers VS Code, GitHub web editing, previewing, figures, equations, updates and unpublishing.

Five owner-supplied long-form articles are published with explicit owner approval dated 15 November 2026, one per category. Five internal authoring drafts remain unpublished, including the separate AMR validation note. Draft files in this public repository remain readable on GitHub; they are excluded from the generated website, not confidential.

| Content                              | Location                   |
| ------------------------------------ | -------------------------- |
| Project case studies                 | `src/content/projects/`    |
| Services                             | `src/content/services/`    |
| Biography, education and experience  | `src/pages/about.astro`    |
| Homepage introduction                | `src/pages/index.astro`    |
| Contact, social profiles and CV path | `src/lib/site.ts`          |
| Colours and system fonts             | `src/styles/tokens.css`    |
| Shared layout                        | `src/styles/global.css`    |
| Public CV                            | `public/EKRAMAH_s_CV..pdf` |

Original root HTML/CSS/assets are preserved as the migration baseline. Astro deploys only `dist/`. The pre-migration baseline is commit `47469fe`.

## Review the new design with the five demo articles

```sh
npm run demo:build
npm run demo:preview
```

Open the printed address (port 4323). This mode shows published articles and any explicitly marked demonstration drafts, with a visible preview notice. Unpublished drafts have no invented publication dates. Category pages and filters work here for design review. `npm run qa:article` is the broader author-review build, also including internal authoring examples. Neither preview directory is deployed. The ordinary production build contains only real published articles and an honest empty state when there are none.

The homepage order is introduction → featured writing → five services → two compact projects → background → contact. It has no portrait or fixed sidebar. Full figures and case studies are on the Portfolio pages.

## Checks

```sh
npm run lint
npm run check
npm run build
npm run test
npm run test:publishing
npm run audit:links
npm run audit:security
npm audit
npm audit --omit=dev
npm run qa:article
npm run demo:build
npx playwright install chromium firefox webkit
npm run test:e2e
```

Browser tests start local production/review servers, test three engines and required widths, run axe and save full-page screenshots. The publishing integration test creates synthetic articles in an isolated temporary checkout, verifies publishing/unpublishing and removes that checkout. It does not change actual article sources.

For Lighthouse, run `node scripts/serve.mjs dist 4321` and `node scripts/serve.mjs .qa-build 4322` in separate terminals, then `npm run qa:lighthouse`. Results are local lab measurements, not field Core Web Vitals.

See **[acceptance evidence](qa/ACCEPTANCE.md)**, **[security review](docs/SECURITY_REVIEW.md)**, **[content evidence](docs/CONTENT_EVIDENCE.md)** and **[optional CMS evaluation](docs/CMS_EVALUATION.md)**.

## Deploy

Repository: `itsEkramah/itsEkramah.github.io`; production branch: `main`.

1. Review the site, factual content and acceptance evidence before approving initial publication.
2. In **Settings → Pages**, select **GitHub Actions**.
3. Where supported, protect `main` with required owner review, the **Validation** status check and blocked force pushes. `CODEOWNERS` identifies the reviewer but does not enforce approval without branch rules.
4. Merge approved changes. Deployment waits for validation, builds with the official SHA-pinned `withastro/action` and publishes using `actions/deploy-pages`.
5. Check Actions, the live homepage, a deep URL, CV, 404, sitemap and HTTPS.

Only the deployment job has `pages: write` and `id-token: write`. Validation and build have read-only contents permissions; PRs do not deploy. The Astro action internally uses `npm install`; the custom build runs `npm ci` and rejects lockfile drift. `.npmrc` disables lifecycle scripts for both. Dependabot proposes monthly dependency/action updates.

This feature branch does not deploy itself. No DNS changes, custom domain, CMS or authentication service are included.

## Maintenance and rollback

Monthly: review advisories, links, content accuracy and browser regressions. Review MDX as executable source. Enable account MFA and protect recovery access manually. Do not store tokens in source or `PUBLIC_` variables.

Rollback by reverting the failed release through a reviewed PR, merging to `main` and checking redeployment. Revoke any leaked credentials before considering history cleanup; removing a file alone does not revoke a secret.

The handoff specifications remain in `docs/01_…09_…` and `docs/handoff/`. Later user decisions override them, including the expanded publishing requirements and updated category names.
