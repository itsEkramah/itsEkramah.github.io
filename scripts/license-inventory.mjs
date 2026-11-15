import { readFile, writeFile } from 'node:fs/promises';
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const rows = Object.entries(lock.packages)
  .filter(([key]) => key)
  .map(([key, pkg]) => ({
    path: key,
    version: pkg.version,
    license: pkg.license || 'Review package notice',
    development: !!pkg.dev,
  }));
await writeFile('qa/licenses.json', JSON.stringify(rows, null, 2));
console.log(
  `${rows.length} locked package entries inventoried. See qa/licenses.json; package notices remain in node_modules.`,
);
