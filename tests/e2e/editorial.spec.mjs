import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { articleSources } from '../../scripts/article-sources.mjs';
// Bound the representative sample as the library grows; all five launch essays
// are covered today, alongside the separate Markdown/MDX fixture checks.
const published = (await articleSources())
  .filter((a) => !a.data.draft)
  .slice(0, 5);

test('Home introduces the owner and Portfolio retains real research evidence', async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.profile-identity')).toBeVisible();
    await expect(page.locator('.research-evidence')).toHaveCount(0);
    await page.goto('/portfolio/');
    const figure = page.locator('.research-evidence');
    expect(
      await figure.evaluate((element) => element.getBoundingClientRect().top),
    ).toBeLessThan(750);
    await expect(figure.getByRole('img')).toBeVisible();
    await figure.getByText('Values & source', { exact: true }).click();
    await expect(figure.locator('tbody tr')).toHaveCount(2);
    await expect(figure).toContainText('0.936–0.962');
    await expect(figure).toContainText(
      'Upstream selection leakage cannot be excluded',
    );
    await expect(
      figure.getByRole('link', { name: 'Inspect the original result file' }),
    ).toHaveAttribute('href', /5893f20c9bdb6ca64e91cb7b2043dd7bfb7c1db6/);
  }
});

test('published code is keyboard-scrollable on mobile, including without JavaScript', async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const article of published) {
    await page.goto(article.url);
    const code = page.locator('.prose pre').first();
    if (!(await code.count())) continue;
    await page.getByRole('button', { name: 'Copy code' }).first().focus();
    await page.keyboard.press('Tab');
    await expect(code).toBeFocused();
    if (await code.evaluate((e) => e.scrollWidth > e.clientWidth)) {
      await page.keyboard.press('ArrowRight');
      await expect
        .poll(() => code.evaluate((e) => e.scrollLeft))
        .toBeGreaterThan(0);
    }
    const axe = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ])
      .analyze();
    expect(axe.violations, article.url).toEqual([]);
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const noScript = await context.newPage();
    await noScript.goto(
      'http://127.0.0.1:4321/writing/medicine-pharma/reading-amr-data-without-overclaiming/',
    );
    const code = noScript.locator('.prose pre').first();
    await code.focus();
    await noScript.keyboard.press('ArrowRight');
    await expect
      .poll(() => code.evaluate((e) => e.scrollLeft))
      .toBeGreaterThan(0);
  } finally {
    await context.close();
  }
});

test('library starts with readable articles and body text actually responds to enlargement', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/writing/');
  expect(
    await page
      .locator('.article-entry')
      .first()
      .evaluate((element) => element.getBoundingClientRect().top),
  ).toBeLessThan(750);
  for (const route of ['/', '/portfolio/', '/services/', '/writing/']) {
    await page.goto(route);
    const before = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).fontSize),
    );
    await page.evaluate(
      () => (document.documentElement.style.fontSize = '200%'),
    );
    const after = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).fontSize),
    );
    expect(after).toBeGreaterThanOrEqual(before * 1.99);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
