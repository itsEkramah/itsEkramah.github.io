import {
  readPages,
  attributes,
  outputPath,
  exists,
  siteOrigin,
} from './html.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
export async function auditLinks(root = 'dist') {
  const pages = await readPages(root);
  const errors = [];
  let checked = 0;
  for (const { file, html } of pages) {
    const route = file
      .replaceAll('\\', '/')
      .replace(`${root}/`, '')
      .replace(/index\.html$/, '');
    const base = `${siteOrigin}/${route}`;
    for (const href of [
      ...attributes(html, 'href'),
      ...attributes(html, 'src'),
    ]) {
      if (/^(mailto:|https?:\/\/)/.test(href) && !href.startsWith(siteOrigin))
        continue;
      const url = new URL(href, base);
      const target = outputPath(url.href, root);
      checked++;
      if (!(await exists(target))) errors.push(`${file}: missing ${href}`);
      else if (url.hash && target.endsWith('.html')) {
        const content = await readFile(target, 'utf8');
        if (
          !attributes(content, 'id').includes(
            decodeURIComponent(url.hash.slice(1)),
          )
        )
          errors.push(`${file}: missing fragment ${href}`);
      }
    }
  }
  return { pages: pages.length, checked, errors };
}
if (process.argv[1]?.endsWith('audit-links.mjs')) {
  const result = await auditLinks();
  await mkdir('qa', { recursive: true });
  await writeFile('qa/link-audit.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
