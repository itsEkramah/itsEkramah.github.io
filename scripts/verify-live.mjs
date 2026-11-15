import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readPages, siteOrigin } from './html.mjs';
import { articleSources } from './article-sources.mjs';

const origin = siteOrigin;
const sources = (await articleSources()).map(({ id, data }) => ({
  id,
  ...data,
}));
const published = sources.filter((article) => !article.draft);
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  routes: [],
  browser: [],
  notes: [],
};
await mkdir('qa/screenshots', { recursive: true });
const browser = await chromium.launch();
try {
  const home = await fetch(`${origin}/`);
  assert.equal(home.status, 200);
  report.headers = Object.fromEntries(
    [
      'content-type',
      'strict-transport-security',
      'x-frame-options',
      'content-security-policy',
      'x-content-type-options',
    ].map((name) => [name, home.headers.get(name)]),
  );
  const redirect = await fetch(origin.replace('https:', 'http:'), {
    redirect: 'manual',
  });
  report.httpRedirect = {
    status: redirect.status,
    location: redirect.headers.get('location'),
  };
  assert.ok([301, 302, 307, 308].includes(redirect.status));
  assert.ok(redirect.headers.get('location')?.startsWith(origin));
  const paths = (await readPages()).map((page) => {
    const relative = path.relative('dist', page.file).replaceAll('\\', '/');
    return `/${relative.replace(/(^|\/)index\.html$/, '$1')}`;
  });
  for (const path of [
    ...paths,
    '/robots.txt',
    '/sitemap-index.xml',
    '/sitemap-0.xml',
    '/feed.xml',
    '/EKRAMAH_s_CV..pdf',
  ]) {
    const response = await fetch(new URL(path, origin));
    const expected = path === '/404.html' ? [200, 404] : [200];
    report.routes.push({ path, status: response.status });
    assert.ok(
      expected.includes(response.status),
      `${path}: ${response.status}`,
    );
    if (path.includes('sitemap') || path === '/feed.xml') {
      const body = await response.text();
      for (const draft of sources.filter((article) => article.draft))
        assert.ok(!body.includes(`/${draft.id}/`), path);
    }
  }
  const missing = await fetch(
    `${origin}/this-page-does-not-exist-release-check/`,
  );
  assert.equal(missing.status, 404);
  report.routes.push({
    path: '/this-page-does-not-exist-release-check/',
    status: missing.status,
  });
  for (const draft of sources.filter((article) => article.draft)) {
    const path = `/writing/${draft.category}/${draft.id}/`;
    const response = await fetch(new URL(path, origin));
    report.routes.push({ path, status: response.status, draft: true });
    assert.equal(response.status, 404, path);
  }
  const pages = [
    ['home', '/'],
    ['portfolio', '/portfolio/'],
    ['services', '/services/'],
    ['writing', '/writing/'],
    ['article', `/writing/${published[0].category}/${published[0].id}/`],
  ];
  const page = await browser.newPage();
  const errors = [];
  const remote = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('request', (request) => {
    if (!request.url().startsWith(origin)) remote.push(request.url());
  });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, path] of pages) {
      const response = await page.goto(new URL(path, origin).href);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, `${width} ${path}`);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute('href'),
        new URL(path, origin).href,
      );
      assert.equal(
        await page
          .locator('meta[http-equiv="content-security-policy"]')
          .count(),
        1,
      );
      if (width !== 320)
        await page.screenshot({
          path: `qa/screenshots/live-${name}-${width}.png`,
          fullPage: true,
        });
      if (width === 1440 && name === 'home')
        await page.screenshot({
          path: 'qa/screenshots/live-home-viewport.png',
        });
      report.browser.push({ path, width, status: 'PASS', overflow });
    }
  }
  await page.goto(`${origin}/writing/`);
  await page.locator('#writing-query').fill('reproducible');
  assert.match(await page.locator('#writing-count').innerText(), /^1 article$/);
  await page.locator('button[type="reset"]').click();
  assert.equal(
    await page.locator('[data-article]:visible').count(),
    published.length,
  );
  for (const article of published) {
    await page.goto(`${origin}/writing/${article.category}/${article.id}/`);
    assert.equal(await page.locator('meta[name="robots"]').count(), 0);
    assert.ok(await page.locator('time').count());
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(remote, []);
  report.publishedArticles = published.map(({ id, category }) => ({
    id,
    category,
  }));
  report.consoleErrors = errors;
  report.thirdPartyRequests = remote;
  report.result = 'PASS';
  report.notes.push(
    'Chromium live smoke; cross-engine axe and publishing checks are recorded separately. Header values are observed hosting behaviour, not site-configured guarantees.',
  );
} catch (error) {
  report.result = 'FAIL';
  report.error = error.message;
  throw error;
} finally {
  await browser.close();
  await writeFile('qa/live-verification.json', JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify({
      result: report.result,
      routes: report.routes.length,
      browserChecks: report.browser.length,
      error: report.error,
    }),
  );
}
