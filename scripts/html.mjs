import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
export async function filesIn(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? filesIn(path.join(root, e.name))
          : path.join(root, e.name),
      ),
    )
  ).flat();
}
export const attributes = (html, attr) =>
  [...html.matchAll(new RegExp(`\\b${attr}=["']([^"']*)["']`, 'g'))].map((m) =>
    m[1].replaceAll('&amp;', '&'),
  );
export const siteOrigin = 'https://itsekramah.github.io';
export function outputPath(url, root = 'dist') {
  const pathname = decodeURIComponent(new URL(url, siteOrigin).pathname);
  return path.join(
    root,
    pathname.endsWith('/') ? `${pathname}index.html` : pathname,
  );
}
export async function exists(file) {
  return stat(file)
    .then((s) => s.isFile())
    .catch(() => false);
}
export async function readPages(root = 'dist') {
  return Promise.all(
    (await filesIn(root))
      .filter((f) => f.endsWith('.html'))
      .map(async (file) => ({ file, html: await readFile(file, 'utf8') })),
  );
}
