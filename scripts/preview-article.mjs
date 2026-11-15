import { spawnSync } from 'node:child_process';
const result = spawnSync(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
    'build',
    '--mode',
    'review',
    '--outDir',
    '.qa-build',
  ],
  { stdio: 'inherit' },
);
process.exit(result.status ?? 1);
