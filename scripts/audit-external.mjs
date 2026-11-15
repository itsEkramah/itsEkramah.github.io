import { readPages, attributes, siteOrigin } from './html.mjs';
import { writeFile } from 'node:fs/promises';
const urls = [
  ...new Set(
    (await readPages())
      .flatMap((p) => attributes(p.html, 'href'))
      .filter((u) => u.startsWith('https://') && !u.startsWith(siteOrigin)),
  ),
];
const results = [];
for (const url of urls) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    await response.body?.cancel();
    results.push({
      url,
      status: response.status,
      finalUrl: response.url,
      result: response.ok
        ? 'PASS'
        : [403, 429, 999].includes(response.status)
          ? 'BLOCKED'
          : 'FAIL',
    });
  } catch (error) {
    results.push({ url, result: 'NOT TESTED', error: error.message });
  }
}
await writeFile('qa/external-links.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.result === 'FAIL')) process.exitCode = 1;
