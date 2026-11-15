import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
  symlink,
  rm,
} from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { filesIn } from './html.mjs';
const root = process.cwd();
await mkdir(path.join(root, 'qa'), { recursive: true });
const fixtureParent = path.join(root, '.qa-fixtures');
await mkdir(fixtureParent, { recursive: true });
const fixture = await mkdtemp(path.join(fixtureParent, 'publishing-'));
const ids = [
  'bioinformatics',
  'medicine-pharma',
  'data-analytics',
  'software-web',
  'business-seo',
];
function build() {
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'node_modules/astro/bin/astro.mjs'), 'build'],
    {
      cwd: fixture,
      encoding: 'utf8',
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    },
  );
  if (result.status !== 0) throw new Error(result.stderr + result.stdout);
}
try {
  for (const name of [
    'src',
    'scripts',
    'public',
    'astro.config.mjs',
    'tsconfig.json',
    'package.json',
  ])
    await cp(path.join(root, name), path.join(fixture, name), {
      recursive: true,
    });
  await symlink(
    path.join(root, 'node_modules'),
    path.join(fixture, 'node_modules'),
    process.platform === 'win32' ? 'junction' : 'dir',
  );
  // Isolate synthetic publication tests from the owner's real publishing history.
  for (const file of await filesIn(
    path.join(fixture, 'src/content/articles'),
  )) {
    const source = await readFile(file, 'utf8');
    await writeFile(
      file,
      source
        .replace(/^draft:\s*false\s*$/m, 'draft: true')
        .replace(/^reviewed:\s*true\s*$/m, 'reviewed: false'),
    );
  }
  for (const category of ids) {
    await writeFile(
      path.join(fixture, `src/content/articles/qa-${category}.md`),
      `---\ntitle: 'Synthetic test: ${category}'\ndescription: 'Only an isolated publishing test fixture, never deployed.'\ncategory: ${category}\nformat: research-note\ntags: [QA]\ndraft: false\nreviewed: true\nfeatured: true\npublishedAt: 2026-01-01\n---\n\n## Test content\n\nSynthetic content for a local integration test.\n`,
    );
  }
  await writeFile(
    path.join(fixture, 'src/content/articles/qa-related.mdx'),
    `---\ntitle: 'Synthetic test: MDX related article'\ndescription: 'An isolated MDX test; never deployed.'\ncategory: bioinformatics\nformat: tutorial\ntags: [QA]\ndraft: false\nreviewed: true\npublishedAt: 2026-01-02\n---\n\n## Test content\n\nA synthetic MDX article.\n`,
  );
  build();
  const home = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
  const archive = await readFile(
    path.join(fixture, 'dist/writing/index.html'),
    'utf8',
  );
  const sitemap = await readFile(
    path.join(fixture, 'dist/sitemap-0.xml'),
    'utf8',
  );
  const feed = await readFile(path.join(fixture, 'dist/feed.xml'), 'utf8');
  for (const category of ids) {
    const url = `/writing/${category}/qa-${category}/`;
    const page = await readFile(
      path.join(fixture, `dist${url}index.html`),
      'utf8',
    );
    const categoryPage = await readFile(
      path.join(fixture, `dist/writing/${category}/index.html`),
      'utf8',
    );
    assert.ok(archive.includes(url));
    assert.ok(categoryPage.includes(url));
    assert.ok(sitemap.includes(url));
    assert.ok(feed.includes(url));
    assert.ok(
      page.includes(
        `rel="canonical" href="https://itsekramah.github.io${url}"`,
      ),
    );
    assert.ok(page.includes('BlogPosting'));
    assert.ok(page.includes('article:published_time'));
    assert.ok(page.includes('QA'));
  }
  assert.ok(home.includes('/qa-related/'));
  const relatedPage = await readFile(
    path.join(
      fixture,
      'dist/writing/bioinformatics/qa-bioinformatics/index.html',
    ),
    'utf8',
  );
  assert.ok(relatedPage.includes('Related reading'));
  assert.ok(relatedPage.includes('/qa-related/'));
  assert.ok(!archive.includes('amr-validation'));
  assert.ok(!feed.includes('amr-validation'));
  assert.ok(!sitemap.includes('amr-validation'));
  const file = path.join(fixture, 'src/content/articles/qa-business-seo.md');
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('draft: false', 'draft: true')
      .replace('reviewed: true', 'reviewed: false'),
  );
  build();
  for (const output of [
    'dist/writing/index.html',
    'dist/sitemap-0.xml',
    'dist/feed.xml',
  ])
    assert.ok(
      !(await readFile(path.join(fixture, output), 'utf8')).includes(
        '/qa-business-seo/',
      ),
    );
  const result = {
    result: 'PASS',
    scenarios: [
      'publish Markdown in all five categories',
      'publish MDX',
      'automatic homepage/archive/category/tags/dates/SEO/sitemap/feed',
      'related reading',
      'draft exclusion',
      'unpublish and rebuild',
    ],
    note: 'Synthetic content was generated only inside an isolated temporary checkout, never in site sources.',
  };
  await writeFile(
    path.join(root, 'qa/publishing-test.json'),
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  const absolute = path.resolve(fixture);
  if (absolute.startsWith(path.resolve(fixtureParent) + path.sep))
    await rm(absolute, { recursive: true, force: true });
}
