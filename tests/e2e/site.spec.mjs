import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { articleSources } from '../../scripts/article-sources.mjs';
const sources = await articleSources();
const qaDirectory = process.env.QA_OUTPUT_DIR || 'qa';
const retained = sources.find(
  (a) => a.id === 'reproducible-genomics-before-the-pipeline',
);
const routes = [
  '/',
  '/portfolio/',
  '/portfolio/genomic-amr/',
  '/portfolio/notch2-rnaseq/',
  '/portfolio/pathoscope/',
  '/portfolio/data-quality-workbench/',
  '/portfolio/reviewflow/',
  '/portfolio/site-audit-kit/',
  '/services/',
  '/services/web-development/',
  '/services/technical-seo/',
  '/services/analysis-figures/',
  '/services/python-development/',
  '/services/bioinformatics-support/',
  '/writing/',
  '/about/',
  '/contact/',
];
const article =
  'http://127.0.0.1:4322/writing/bioinformatics/reproducible-genomics-before-the-pipeline/';
const suppliedIds = [
  'reproducible-genomics-before-the-pipeline',
  'reading-amr-data-without-overclaiming',
  'first-hour-with-a-messy-dataset',
  'small-websites-fast-accessible-maintainable',
  'what-ninety-days-can-prove-about-seo',
];
const demos = sources.filter((article) => suppliedIds.includes(article.id));
test('direct routes, console, network privacy and axe', async ({ page }) => {
  const errors = [];
  const remote = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:')) remote.push(r.url());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const result = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
  expect(errors).toEqual([]);
  expect(remote).toEqual([]);
});
test('layouts reflow at required widths', async ({ page }, testInfo) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/portfolio/',
      '/services/',
      '/writing/',
      '/about/',
      '/contact/',
      article,
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}: ${route}`,
      ).toBe(true);
      if (
        testInfo.project.name === 'chromium' &&
        [390, 768, 1440].includes(width) &&
        !['/about/', '/contact/'].includes(route)
      ) {
        const name =
          route === article
            ? 'article-review'
            : route === '/'
              ? 'home'
              : route.split('/')[1];
        await page.screenshot({
          path: `${qaDirectory}/screenshots/${name}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});
test('recruiter and client paths work in two clicks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore portfolio' }).click();
  await page.getByRole('link', { name: 'Read case study' }).first().click();
  await expect(
    page.getByRole('link', { name: 'View source on GitHub' }),
  ).toBeVisible();
  await page.goto('/');
  await page.getByRole('link', { name: 'View services' }).click();
  await page.getByRole('link', { name: 'Discuss a project' }).click();
  await expect(
    page.getByRole('link', { name: 'Email', exact: true }),
  ).toHaveAttribute('href', 'mailto:its.ekramah@outlook.com');
  for (const route of ['/', '/portfolio/', '/contact/']) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(
      'its.ekramah@outlook.com',
    );
    await expect(
      page.locator('[data-nosnippet] a').filter({ hasText: 'Email' }),
    ).toHaveAttribute('href', 'mailto:its.ekramah@outlook.com');
  }
  const cv = await page.request.get('/EKRAMAH_s_CV..pdf');
  expect(cv.status()).toBe(200);
  expect(cv.headers()['content-type']).toContain('application/pdf');
});
test('keyboard skip link, visible navigation and enlarged rem sizing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const name of ['Portfolio', 'Services', 'Writing', 'About', 'Contact'])
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name, exact: true }),
    ).toBeVisible();
  // This tests enlarged rem-based sizing. Fixed-pixel body text is unaffected;
  // native browser zoom and assistive-technology review remain separate checks.
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test('review article, search, category, empty state and URL restoration', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:4322/writing/');
  await expect(page.getByText('Local review:', { exact: false })).toBeVisible();
  const search = page.getByRole('searchbox');
  await search.fill('impossibleterm');
  await expect(page.locator('#no-results')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-article]:visible')).toHaveCount(
    sources.length,
  );
  await search.fill('genomic');
  await page
    .getByRole('combobox', { name: 'Category', exact: true })
    .selectOption('bioinformatics');
  await page.reload();
  await expect(search).toHaveValue('genomic');
  const matches = sources.filter(
    (a) =>
      a.data.category === 'bioinformatics' &&
      `${a.data.title} ${a.data.description} ${(a.data.tags || []).join(' ')}`
        .toLowerCase()
        .includes('genomic'),
  );
  await expect(page.locator('[data-article]:visible')).toHaveCount(
    matches.length,
  );
  await page.locator(`.article-entry a[href="${retained.url}"]`).click();
  if (retained?.data.draft !== false)
    await expect(
      page.getByText('Review draft · Not published · Awaiting author approval'),
    ).toBeVisible();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});
test('articles and navigation remain readable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(article);
  await expect(page.locator('main .prose')).toBeVisible();
  expect(
    (await page.locator('main .prose').innerText()).length,
  ).toBeGreaterThan(100);
  await page.goto('http://127.0.0.1:4322/writing/');
  await expect(page.locator('.article-entry').first()).toBeVisible();
  await expect(page.locator('#writing-query')).toBeDisabled();
  await expect(page.locator('#writing-category')).toBeDisabled();
  await expect(page.locator('noscript p')).toBeVisible();
  await expect(page.locator('noscript p')).toContainText(
    'Search needs JavaScript.',
  );
  await page
    .getByRole('link', { name: 'Bioinformatics & Genomics', exact: true })
    .click();
  await expect(page.locator('h1')).toHaveText('Bioinformatics & Genomics');
  await context.close();
});
test('production excludes drafts and returns a real 404 locally', async ({
  page,
}) => {
  const response = await page.goto('/writing/bioinformatics/amr-validation/');
  expect(response.status()).toBe(404);
  const missing = await page.goto('/this-page-does-not-exist/');
  expect(missing.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A missing page, a way forward.',
  );
  await page.goto('/writing/');
  if (!sources.some((a) => a.data.draft === false))
    await expect(
      page.getByText('No articles published yet.', { exact: true }),
    ).toBeVisible();
});

test('retained article has dates, category routes and the revised homepage order', async ({
  page,
}, testInfo) => {
  expect(demos).toHaveLength(1);
  await page.goto('http://127.0.0.1:4323/');
  await expect(page.locator('.featured-article')).toHaveCount(1);
  await expect(page.locator('.home-service-links li')).toHaveCount(5);
  await expect(page.locator('.compact-work article')).toHaveCount(2);
  expect(
    await page
      .locator('main .home-section')
      .evaluateAll((sections) =>
        sections
          .slice(0, 3)
          .map((section) => section.getAttribute('aria-labelledby')),
      ),
  ).toEqual(['featured-writing', 'services-title', 'selected-work']);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, url] of [
      ['home-demo', '/'],
      ['writing-demo', '/writing/'],
      ['article-demo', demos[0].url],
      ['category-demo', `/writing/${demos[0].data.category}/`],
    ]) {
      await page.goto(`http://127.0.0.1:4323${url}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (testInfo.project.name === 'chromium')
        await page.screenshot({
          path: `${qaDirectory}/screenshots/${name}-${width}.png`,
          fullPage: true,
        });
    }
  }
  for (const demo of demos) {
    await page.goto(`http://127.0.0.1:4323${demo.url}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).not.toContainText('DEMO DRAFT');
    expect(
      (await page.locator('.prose').innerText()).split(/\s+/).length,
    ).toBeGreaterThan(900);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.locator('time').first()).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    const production = await page.request.get(
      `http://127.0.0.1:4321${demo.url}`,
    );
    expect(production.status()).toBe(200);
    await page.goto(`http://127.0.0.1:4321${demo.url}`);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('time').first()).toHaveText('15 November 2026');
  }
});
