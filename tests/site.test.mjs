import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readPages } from '../scripts/html.mjs';
import { auditLinks } from '../scripts/audit-links.mjs';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import { articleSources } from '../scripts/article-sources.mjs';

test('all internal pages, assets and fragments resolve', async () => {
  const result = await auditLinks();
  assert.deepEqual(result.errors, []);
  assert.ok(result.pages >= 17);
});
test('each output page has semantic landmarks and unique metadata', async () => {
  const pages = await readPages();
  const titles = new Set();
  const descriptions = new Set();
  for (const { file, html } of pages) {
    const verification = file
      .replaceAll('\\', '/')
      .match(/^dist\/(google[a-f\d]+\.html)$/i);
    if (verification) {
      const filename = verification[1];
      assert.equal(html.trim(), `google-site-verification: ${filename}`, file);
      assert.equal(html, await readFile(`public/${filename}`, 'utf8'), file);
      continue;
    }
    assert.equal((html.match(/<h1\b/g) || []).length, 1, file);
    for (const landmark of ['header', 'nav', 'main', 'footer'])
      assert.match(html, new RegExp(`<${landmark}\\b`), `${file}: ${landmark}`);
    assert.match(html, /href="#main"/);
    assert.match(html, /<html lang="en"/);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title);
    if (!html.includes('noindex')) {
      assert.ok(!titles.has(title), file);
      titles.add(title);
    }
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    assert.ok(desc);
    if (!html.includes('noindex')) {
      assert.ok(!descriptions.has(desc), file);
      descriptions.add(desc);
    }
    assert.match(html, /rel="canonical" href="https:\/\/ekramah.is-a.dev\//);
    for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag[0], /\balt(?:=|\s|>)/);
      assert.match(tag[0], /\bwidth=/);
      assert.match(tag[0], /\bheight=/);
    }
  }
});
test('draft articles and 404 are excluded from the production sitemap', async () => {
  const pages = await readPages();
  const drafts = (await articleSources()).filter((a) => a.data.draft !== false);
  for (const draft of drafts)
    assert.ok(
      !pages.some((p) => p.file.replaceAll('\\', '/').includes(draft.url)),
    );
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
  const feed = await readFile('dist/feed.xml', 'utf8');
  for (const draft of drafts) assert.ok(!sitemap.includes(draft.url));
  for (const draft of drafts) assert.ok(!feed.includes(draft.url));
  assert.ok(!sitemap.includes('404'));
  assert.ok((await readFile('dist/404.html', 'utf8')).includes('noindex'));
});
test('Markdown strips executable HTML and unsafe URLs while keeping code', async () => {
  const processor = await createMarkdownProcessor({
    rehypePlugins: [rehypeSanitize],
  });
  const result = await processor.render(
    '<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n[bad](javascript:alert%281%29)\n\n```python\nprint("safe")\n```',
  );
  assert.doesNotMatch(result.code, /<script|onerror=|href="javascript:/i);
  assert.match(result.code, /<pre/);
  assert.match(result.code, /safe/);
});
test('actual theme tokens meet text and control contrast requirements', async () => {
  const stylesheet = await readFile('src/styles/tokens.css', 'utf8');
  const tokens = Object.fromEntries(
    [...stylesheet.matchAll(/--([\w-]+):\s*#([a-f\d]{6});/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  const luminance = (hex) => {
    const rgb = hex
      .match(/[a-f\d]{2}/gi)
      .map((v) => parseInt(v, 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const contrast = (fg, bg) => {
    const l = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    return (l[0] + 0.05) / (l[1] + 0.05);
  };
  for (const fg of ['ink', 'muted', 'accent'])
    for (const bg of ['canvas', 'surface', 'pale'])
      assert.ok(contrast(tokens[fg], tokens[bg]) >= 4.5, `${fg} on ${bg}`);
  for (const bg of ['accent', 'accent-hover'])
    assert.ok(
      contrast(tokens['on-accent'], tokens[bg]) >= 4.5,
      `button text on ${bg}`,
    );
  for (const bg of ['canvas', 'surface'])
    assert.ok(
      contrast(tokens['control-border'], tokens[bg]) >= 3,
      `control boundary on ${bg}`,
    );
});
