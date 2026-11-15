# Publishing articles independently

Add or edit an article file, commit it and merge an approved change. The website's layouts and components do not need editing.

## Categories and metadata

| Category ID | Display name |
| --- | --- |
| `bioinformatics` | Bioinformatics & Genomics |
| `medicine-pharma` | Medicine & Pharma |
| `data-analytics` | Data Science & Analytics |
| `software-web` | Software & Web Development |
| `business-seo` | Business & SEO |

Each article has one category, up to five tags and one format: `tutorial`, `research-note`, `essay`, `case-study` or `review`. Category pages appear automatically from the first published article. Empty topics have no dead-end page or filter. This follows the owner's expanded requirement over the initial suggested three-post threshold.

## Create and preview in VS Code

1. Open the repository, pull the latest `main` and create a branch such as `article/your-topic` using Source Control.
2. Create `src/content/articles/your-topic.md`. Use a flat directory and a lowercase, hyphenated filename. Its filename becomes the final URL segment.
3. Start with this metadata, then write beneath the closing `---`:

```yaml
---
title: 'A specific, accurate title'
description: 'A short summary of what the reader will learn.'
category: data-analytics
format: tutorial
tags: [Python, Data quality]
draft: true
reviewed: false
references: []
relatedProjectIds: []
---
```

4. Open **Terminal → New Terminal**. Run `npm ci` once, then `npm run dev`. Open the printed address and choose Writing. Drafts appear with a review banner. Save edits to refresh the local preview.
5. Review scientific accuracy, privacy, sources, code, image permissions, narrow-screen reading and keyboard access. Use `##` for sections; the page supplies the only H1.

**Draft does not mean confidential.** Files in this public GitHub repository remain publicly readable even when excluded from the generated site. Keep sensitive drafts elsewhere. Development servers bind to loopback; do not expose them publicly.

## Publish

After completing owner/editorial review, change:

```yaml
draft: false
reviewed: true
publishedAt: 2026-11-15
```

Use the actual first-publication date; the date above is an example. Future dates fail validation. `reviewed: true` records the author's acknowledgement, not an automated fact check. The build fails without review and a real date.

Run `npm run check`, `npm run build`, `npm run test` and `npm run audit:links`. Commit the article and any approved assets in Source Control, publish the branch and open a pull request. Wait for Validation, review, then merge. Once Pages is configured and initial deployment is authorised, approved merges to `main` automatically validate and deploy.

`your-topic.md` with `category: data-analytics` appears at `/writing/data-analytics/your-topic/`. The Writing Library, category page, recent homepage section, relevant related-reading lists, RSS and sitemap update automatically.

## Publish through GitHub's web interface

1. Open [the repository](https://github.com/itsEkramah/itsEkramah.github.io) and create an article branch using the branch selector.
2. Open `src/content/articles`, then **Add file → Create new file**. Name it `your-topic.md`, paste metadata and content, and keep it a draft while writing.
3. GitHub's **Preview** tab shows basic Markdown. It does not validate Astro frontmatter, render MDX components or reproduce the site's styling. Commit to the article branch, open a PR and inspect **Files changed** and validation results.
4. To edit several files, press `.` in the repository to open GitHub's web editor. This editor does not run a Node server. Full Astro preview requires local VS Code, or an optional Codespace with Node 24. Codespaces may cost money and is not configured here. No public PR-preview hosting is installed.
5. After reviewing the finished article, edit its metadata to publish, wait for updated checks, approve and merge. Check **Actions**, then visit the article's final URL.
6. For images, **Add file → Upload files** on the same branch. Include source/licence information and upload only material authorised for public disclosure.

## Code, tables and equations

Use fenced code with a language. Highlighting runs at build time using Prism and local CSS:

````markdown
```python
values = [2, 4, 6]
print(sum(values) / len(values))
```
````

Use standard Markdown tables with clear column labels. Keep tables concise for mobile readers. Long code blocks scroll within the reading column.

Inline math uses `$x^2$`; display math uses `$$` on separate lines. KaTeX produces semantic MathML at build time with `trust: false`. Modern Chromium, Firefox and WebKit render equations without remote scripts or inline-style exceptions. Preview new expressions; unsupported commands fail the build. The Data Science draft demonstrates a synthetic example, not a real analysis.

## Figures and references

Store licensed images under `src/assets/`. Basic Markdown supports accessible local images:

```markdown
![Describe the important observations in the figure.](../../assets/your-figure.png)

Figure 1. Methods, limitations, author/source and actual licence or permission.
```

For semantic captions and enforced alt/source fields, use `.mdx` and the existing component:

```mdx
import ArticleFigure from '../../components/ArticleFigure.astro';
import figure from '../../assets/your-figure.png';

<ArticleFigure
  src={figure}
  alt="Describe the useful information in the figure."
  caption="Explain the figure's scientific context."
  credit="Actual author, source and licence/permission."
/>
```

The component creates optimised local images with dimensions. The software draft demonstrates it using an existing licensed project figure.

Add primary references in frontmatter:

```yaml
references:
  - label: 'Verified source title'
    url: https://example.org/replace-with-verified-source
```

Replace this example URL before publication. Inline Markdown citations can link directly to the same sources. Do not invent references. Related project IDs correspond to filenames in `src/content/projects/`. Related articles are automatically selected by shared category/tags, excluding drafts and the current article.

## MDX trust boundary

MDX can execute JavaScript at build time. Only the owner or trusted, reviewed contributors should author it. Prefer Markdown for ordinary prose. Do not paste untrusted MDX, arbitrary imports, embedded scripts, remote assets or JavaScript expressions. Review MDX changes as code before running builds or merging. Markdown HTML sanitisation does not make MDX a sandbox. There is no public authoring endpoint.

## Editing, updating and unpublishing

- Edit a draft on a branch and keep `draft: true` while reviewing it.
- Update a published article without changing `publishedAt`; add the real `updatedAt` date and explain material corrections in the text.
- Unpublish by setting `draft: true`, validating and merging. The next deployment removes its route, listings, category membership, recommendations, feed and sitemap entry. The old URL becomes 404. External caches and Git history are not erased.
- Keep filenames/categories stable after publication. Renaming changes the URL and requires an explicit redirect plan. Never edit generated `dist/` files.

An invalid category, malformed YAML, bad reference, future date or missing review/date blocks publication. Correct the named source file, rerun validation and inspect the failed Actions step. The previous successful Pages deployment remains available if a new build fails.

## Supplied demonstration articles and design preview

The five long-form articles supplied on 15 November 2026 have `demo: true`, `draft: true`, no publication date and their original DEMO DRAFT notices. Run `npm run demo:build` and `npm run demo:preview` to review exactly these five in the finished design. Category pages are available in demo/author preview and carry noindex. Production category pages appear only with genuinely published content.

A demo cannot be published just by setting `draft: false`: validation also requires the demo flag to be removed following explicit owner/editorial approval. Verify technical statements, provide primary references and original examples where needed, then follow the normal review/date workflow. Never treat a formatting example as previously published work.

Use `featured: true` to prefer an article for the homepage; published dates determine recency within that group. With fewer than three published articles, only those articles appear. Drafts never fill gaps in a production homepage. `featureOrder` orders the sample cards in preview mode and is not a publication date.
