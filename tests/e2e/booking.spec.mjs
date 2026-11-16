import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('booking is opt-in, isolated and usable without JavaScript', async ({
  page,
  browser,
}) => {
  const remote = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:'))
      remote.push(request.url());
  });
  // Do not create appointments or depend on a third party during CI. The real
  // event/calendar rendering is checked separately in the browser handoff.
  await page.route('https://calendly.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html lang="en"><head><title>Booking test fixture</title></head><body><h1>Calendar test fixture</h1><button type="button">Choose a time</button></body></html>',
    }),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact/');
  await expect(
    page.getByRole('link', { name: 'Book a free 15-minute call', exact: true }),
  ).toHaveAttribute('href', '/contact/#booking');
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(remote).toEqual([]);
  await expect(
    page.getByRole('link', { name: 'Open on Calendly', exact: true }),
  ).toHaveAttribute('href', 'https://calendly.com/its-ekramah/30min');
  const open = page.getByRole('button', { name: 'Show booking calendar' });
  await open.click();
  const frame = page.locator('#booking-calendar iframe');
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox',
  );
  const source = new URL(await frame.getAttribute('src'));
  expect(source.origin).toBe('https://calendly.com');
  expect(source.pathname).toBe('/its-ekramah/30min');
  expect(source.searchParams.get('hide_event_type_details')).toBe('1');
  expect(source.searchParams.has('hide_gdpr_banner')).toBe(false);
  await expect(
    page
      .frameLocator('#booking-calendar iframe')
      .getByRole('heading', { name: 'Calendar test fixture' }),
  ).toBeVisible();
  expect(remote).toHaveLength(1);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
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
  expect(axe.violations).toEqual([]);
  await page.getByRole('button', { name: 'Close calendar' }).click();
  await expect(frame).toHaveCount(0);
  await expect(open).toBeFocused();
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const noScript = await context.newPage();
    await noScript.goto('http://127.0.0.1:4321/contact/');
    await expect(noScript.locator('iframe')).toHaveCount(0);
    await expect(
      noScript.getByRole('button', { name: 'Show booking calendar' }),
    ).toBeHidden();
    await expect(
      noScript.getByRole('link', { name: 'Open on Calendly', exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});
