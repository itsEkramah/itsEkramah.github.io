import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { articleSources } from '../../scripts/article-sources.mjs';
const published = (await articleSources()).filter(
  (article) => !article.data.draft,
);
const categoryCount = new Set(published.map((article) => article.data.category))
  .size;
const directory = process.env.QA_OUTPUT_DIR || 'qa';

test('recruiter follows the expanded resume and downloads the real CV', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Portfolio', exact: true })
    .click();
  await expect(page.locator('h1')).toHaveText('Muhammad Ekramah');
  await expect(page.locator('.qualification')).toHaveText(
    'BS Bioinformatics graduate, Quaid-i-Azam University',
  );
  const sections = page.locator('main .portfolio-section > h2');
  await expect(sections).toHaveText([
    'Education',
    'Professional Experience',
    'Technical Skills',
    'Selected Projects',
    'Additional Work',
    'Contact & Professional Links',
  ]);
  for (const [link, section] of [
    ['Education', '#education'],
    ['Experience', '#experience'],
    ['Technical Skills', '#skills'],
    ['Selected Projects', '#projects'],
  ]) {
    await page
      .getByRole('navigation', { name: 'Portfolio sections' })
      .getByRole('link', { name: link, exact: true })
      .click();
    await expect(page.locator(section)).toBeInViewport();
  }
  await expect(page.locator('#education')).toContainText('3.40 / 4.00');
  await expect(page.locator('#experience .timeline > li')).toHaveCount(2);
  await expect(page.locator('#experience')).toContainText(
    'National Institutes of Health',
  );
  await expect(page.locator('#experience')).toContainText(
    'Digital Empowerment Network',
  );
  await expect(page.locator('#skills dt')).toHaveCount(6);
  await expect(page.locator('#projects .project-entry')).toHaveCount(3);
  await expect(page.locator('#projects .project-facts')).toHaveCount(3);
  await expect(page.locator('#additional-work .project-entry')).toHaveCount(2);
  await expect(page.locator('a[href*="site-audit-kit"]')).toHaveCount(0);
  await expect(page.locator('main header')).not.toContainText('AI-assisted');
  await expect(
    page.locator('main [data-article], main .service-index'),
  ).toHaveCount(0);
  await page
    .locator('#projects .project-entry')
    .first()
    .getByRole('link', { name: 'Read case study' })
    .click();
  await expect(
    page.getByRole('link', { name: 'View source on GitHub' }),
  ).toBeVisible();
  const cv = await page.request.get('/EKRAMAH_s_CV..pdf');
  expect(cv.status()).toBe(200);
  expect(cv.headers()['content-type']).toContain('application/pdf');
});

test('client selects a service and follows scope and evidence to contact', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View services', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Services');
  await expect(page.locator('.service-index > article')).toHaveCount(5);
  await expect(
    page.locator('main .timeline, main .work-list, main [data-article]'),
  ).toHaveCount(0);
  for (const card of await page.locator('.service-index > article').all()) {
    await expect(
      card.getByRole('heading', { name: 'Possible deliverables' }),
    ).toBeVisible();
    await expect(card.locator('.service-tools')).not.toBeEmpty();
    await expect(card.locator('.service-method')).not.toBeEmpty();
    if ((await card.getAttribute('id')) === 'technical-seo') {
      await expect(card.locator('.service-evidence')).toHaveCount(0);
    } else {
      await expect(card.locator('.service-evidence a')).toHaveAttribute(
        'href',
        /^\/portfolio\//,
      );
    }
    await expect(
      card.getByRole('link', { name: 'Request a project' }),
    ).toHaveAttribute('href', '/contact/');
  }
  await page
    .getByRole('navigation', { name: 'Service categories' })
    .getByRole('link', {
      name: 'Software Development & AI Automation',
      exact: true,
    })
    .click();
  const service = page.locator('#python-development');
  await expect(service).toBeInViewport();
  await service.getByRole('link', { name: 'View service' }).click();
  await expect(page.locator('h1')).toHaveText(
    'Software Development & AI Automation',
  );
  await expect(
    page.getByRole('heading', { name: 'Typical deliverables' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Tools & approach' }),
  ).toBeVisible();
  await expect(page.locator('.evidence a').first()).toHaveAttribute(
    'href',
    /^\/portfolio\//,
  );
  await page.goto('/services/technical-seo/');
  await expect(
    page.getByRole('heading', { name: 'What you get' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'How I work' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Start with your website' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Boundaries' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Related work' }),
  ).toHaveCount(0);
  await expect(page.getByText('Site Audit Kit')).toHaveCount(0);
  expect((await page.request.get('/portfolio/site-audit-kit/')).status()).toBe(
    404,
  );
  await page.getByRole('link', { name: 'Discuss your task' }).click();
  await expect(
    page.getByRole('link', { name: 'Email', exact: true }),
  ).toHaveAttribute('href', 'mailto:its.ekramah@outlook.com');
  await expect(page.locator('body')).not.toContainText(
    'its.ekramah@outlook.com',
  );
});

test('reader browses visible categories, searches and reads an existing article', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Writing', exact: true })
    .click();
  await expect(page.locator('h1')).toHaveText('Writing Library');
  const categories = page.getByRole('navigation', {
    name: 'Writing categories',
  });
  await expect(categories.getByRole('link')).toHaveCount(categoryCount);
  await expect(
    page.locator('main .timeline, main .service-index, main .work-list'),
  ).toHaveCount(0);
  await expect(page.locator('[data-article]')).toHaveCount(published.length);
  await expect(page.locator('[data-article] .reading-estimate')).toHaveCount(
    published.length,
  );
  await page
    .getByRole('searchbox')
    .fill(
      'Reproducibility in Bioinformatics: Why It Matters and Where to Start',
    );
  await expect(page.locator('[data-article]:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await categories
    .getByRole('link', { name: 'Bioinformatics & Genomics', exact: true })
    .click();
  await expect(page.locator('h1')).toHaveText('Bioinformatics & Genomics');
  await page
    .getByRole('link', {
      name: 'Reproducibility in Bioinformatics: Why It Matters and Where to Start',
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(
    /\/writing\/bioinformatics\/reproducible-genomics-before-the-pipeline\/$/,
  );
  await expect(page.locator('.prose')).toBeVisible();
  await expect(page.locator('time').first()).toHaveText('15 November 2026');
  await expect(page.locator('.evidence a').first()).toBeVisible();
});

test('page purposes, active navigation, reflow and axe on desktop and mobile', async ({
  page,
}, info) => {
  await mkdir(`${directory}/screenshots`, { recursive: true });
  const names = [
    'Home',
    'Portfolio',
    'Services',
    'Writing',
    'About',
    'Contact',
    'CV',
    'GitHub',
  ];
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, route] of [
      ['home', '/'],
      ['portfolio', '/portfolio/'],
      ['services', '/services/'],
      ['writing', '/writing/'],
    ]) {
      await page.goto(route);
      const nav = page.getByRole('navigation', { name: 'Main navigation' });
      expect(
        (await nav.getByRole('link').allTextContents()).map((t) =>
          t.trim().replace(/\s*(PDF ↗|↗)$/, ''),
        ),
      ).toEqual(names);
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(nav.locator('[aria-current="page"]')).toHaveAttribute(
        'href',
        route,
      );
      for (const link of await nav.getByRole('link').all())
        await expect(link).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}: ${route}`,
      ).toBe(true);
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(result.violations, `${width}: ${route}`).toEqual([]);
        if (info.project.name === 'chromium') {
          // Full-page capture does not scroll through lazy figures itself.
          for (const figure of await page.locator('main img').all()) {
            await figure.scrollIntoViewIfNeeded();
            await expect
              .poll(() =>
                figure.evaluate(
                  (image) => image.complete && image.naturalWidth > 0,
                ),
              )
              .toBe(true);
          }
          await page.keyboard.press('Control+Home');
          await page.screenshot({
            path: `${directory}/screenshots/revised-${name}-${width}.png`,
            fullPage: true,
          });
          await page.screenshot({
            path: `${directory}/screenshots/revised-${name}-${width}-viewport.png`,
          });
        }
      }
    }
  }
});
