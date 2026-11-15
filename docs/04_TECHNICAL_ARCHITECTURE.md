# 04 — Technical Architecture

## Stack
- Astro (stable supported release verified at implementation time), strict TypeScript, static output. Markdown/MDX content collections with current `glob()` loader and schema validation according to installed Astro version; inspect docs before coding.
- Minimal CSS with design tokens; no required Tailwind or UI component framework. Add dependencies only when justified by measured maintenance/user value.
- GitHub Actions -> GitHub Pages via official `withastro/action` and `actions/deploy-pages` using current documented workflow. `site: https://itsekramah.github.io` with no `base` for owner-name repository; check username exact case and canonical lowercase host. Use least-privilege permissions.
- Use `@astrojs/sitemap` if compatible with installed Astro version. No SSR endpoints or server secrets.

## Repository proposal
```
.github/workflows/{ci.yml,deploy.yml}
public/{favicon.svg,robots.txt,assets/}
src/
  components/{Header,Footer,Hero,ProjectEntry,ArticleEntry,ServiceEntry,SEOHead}.astro
  content/{articles/,projects/,services/}
  content.config.ts
  layouts/{BaseLayout,ArticleLayout,ProjectLayout}.astro
  pages/{index,about,contact,work/index,work/[slug],services/index,writing/index,writing/[...slug],404}.astro
  styles/{tokens.css,global.css}
  lib/{taxonomy,urls,seo,search}.ts
scripts/{audit-links.mjs,validate-content.mjs}
tests/{e2e/,unit/}
README.md package.json package-lock.json astro.config.mjs tsconfig.json
```
Adjust path structure to actual Astro conventions and generation needs; do not blindly use obsolete tutorials.

## Content schema (example fields)
`articles`: `title`, `description`, `publishedAt`, optional `updatedAt`, `category` enum, `tags` array, `format` enum, `draft` boolean, optional `featured`, optional `cover` with accessible alt and attribution, `references` optional. Slug derived from entry path or validated ID; require uniqueness.
`projects`: `title`, `summary`, `domains[]`, `tools[]`, `status`, `verifiedEvidence[]`, optional `repoUrl`, optional `demoUrl`, optional `image`, `featured`, `order`, `limitations`, actual body.
`services`: `title`, `summary`, `audience`, `deliverables[]`, `boundaries[]`, `relatedProjectIds[]`, `cta`, optional `detailPage`.
No fabricated content when required fields unknown. Build can succeed with carefully authored factual seed content or clearly labeled drafts excluded from production.

## Feature implementation details
- Archive category filtering: native navigation or URL query backed by accessible progressive-enhancement JS; search filters local pre-rendered HTML. Category pages must remain crawlable, not dependent solely on JS.
- Syntax highlighting: build-time using Astro/Shiki; code blocks scroll horizontally within container; language labels and optional working copy control.
- Image optimization: Astro assets pipeline/local images with width/height and useful alt; do not fetch remote/AI stock by default. External video only as link or privacy-preserving click-to-load embed, not autoplay.
- Metadata: canonical absolute URLs, Open Graph/Twitter tags, date fields, sitemap, RSS only if maintained, JSON-LD Person/ProfilePage/BlogPosting/BreadcrumbList only with true fields.
- Error/404 handling: GitHub Pages 404 behavior checked on deployed site. No broken trailing-slash routing.
- External links: `rel="noopener noreferrer"` for new-tab links; prefer not to force new tabs; label external destinations.

## DNS migration
**Do not change DNS merely because an EU.org application exists.** First verify domain approved, GitHub repository configured, custom hostname ownership/verification handled, then configure deSEC A/AAAA records based on current GitHub Docs, test DNS and HTTPS, set canonical site URL, sitemap, Search Console properties and redirects. Document migration and rollback. At handoff, `ekramah.eu.org` remains pending.

## Dev environment
Pin supported Node LTS major in `.nvmrc`/package engines after checking current Astro requirements. Commit lockfile. `npm ci`, `npm run dev`, `npm run build`, `npm run check`, `npm run test`, `npm run lint` and `npm run audit:links` must be defined and documented if used.
