import { test, expect } from '@playwright/test';

test('real research evidence and its limitations are available in the opening', async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
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
