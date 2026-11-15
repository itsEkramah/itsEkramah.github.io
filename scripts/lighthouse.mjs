import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
const ownedServers = [];
for (const [directory, port] of [
  ['dist', 4321],
  ['.qa-build', 4322],
]) {
  const url = `http://127.0.0.1:${port}/`;
  if (
    !(await fetch(url)
      .then((r) => r.ok)
      .catch(() => false))
  ) {
    const child = spawn(
      process.execPath,
      ['scripts/serve.mjs', directory, String(port)],
      { stdio: 'ignore', windowsHide: true },
    );
    ownedServers.push(child);
    for (let attempt = 0; attempt < 50; attempt++) {
      if (
        await fetch(url)
          .then((r) => r.ok)
          .catch(() => false)
      )
        break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
});
const pages = [
  ['home', 'http://127.0.0.1:4321/'],
  ['work', 'http://127.0.0.1:4321/portfolio/'],
  ['services', 'http://127.0.0.1:4321/services/'],
  ['writing', 'http://127.0.0.1:4321/writing/'],
  [
    'article-review',
    'http://127.0.0.1:4322/writing/bioinformatics/amr-validation/',
  ],
];
const summary = [];
await mkdir('qa/raw', { recursive: true });
try {
  for (const [name, url] of pages) {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      logLevel: 'error',
    });
    await writeFile(`qa/raw/lighthouse-${name}.json`, result.report);
    const lhr = result.lhr;
    summary.push({
      page: name,
      url,
      fetchTime: lhr.fetchTime,
      lighthouseVersion: lhr.lighthouseVersion,
      environment: lhr.environment,
      throttling: lhr.configSettings.throttling,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      metrics: {
        LCP: lhr.audits['largest-contentful-paint'].displayValue,
        CLS: lhr.audits['cumulative-layout-shift'].displayValue,
      },
      failedAudits: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            a.details?.type !== 'opportunity',
        )
        .map((a) => ({
          id: a.id,
          title: a.title,
          score: a.score,
          displayValue: a.displayValue,
        })),
    });
  }
  await writeFile(
    'qa/lighthouse-summary.json',
    JSON.stringify(summary, null, 2),
  );
  console.log(
    JSON.stringify(
      summary.map(({ page, scores, metrics }) => ({ page, scores, metrics })),
      null,
      2,
    ),
  );
} finally {
  chrome.kill();
  for (const server of ownedServers) server.kill();
}
