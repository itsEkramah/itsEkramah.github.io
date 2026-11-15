import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { readPages, attributes, exists } from './html.mjs';
const patterns = [
  /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})/g,
  /AKIA[0-9A-Z]{16}/g,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
  /sk-(?:proj-)?[A-Za-z0-9_-]{30,}/g,
];
const findings = [];
let scanned = 0;
function scan(text, label) {
  scanned++;
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text))
      findings.push({
        file: label,
        issue: 'Potential credential pattern — value withheld',
      });
  }
}
const sourceFiles = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard'],
  { encoding: 'utf8' },
)
  .trim()
  .split('\n')
  .filter(Boolean);
for (const file of [...new Set(sourceFiles)].filter((f) =>
  /\.(astro|[cm]?js|ts|json|mdx?|ya?ml|html|css|svg|txt|toml)$/.test(f),
))
  if (await exists(file)) scan(await readFile(file, 'utf8'), file);
const revisions = execFileSync('git', ['rev-list', '--all'], {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);
for (const revision of revisions)
  scan(
    execFileSync('git', ['show', '--format=', '--no-ext-diff', revision], {
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    }),
    `git:${revision.slice(0, 12)}`,
  );
for (const { file, html } of await readPages()) {
  scan(html, file);
  if (/\bon\w+\s*=|javascript:|<iframe\b/i.test(html))
    findings.push({ file, issue: 'Unsafe HTML surface' });
  for (const src of attributes(html, 'src'))
    if (/^https?:/.test(src)) findings.push({ file, issue: 'Remote resource' });
  if (attributes(html, 'href').some((h) => h.startsWith('http:')))
    findings.push({ file, issue: 'Insecure HTTP link' });
  for (const match of html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/g))
    if (!/rel=["'][^"']*noopener/.test(match[0]))
      findings.push({ file, issue: 'New tab without noopener' });
}
const result = {
  scanned,
  historyCommits: revisions.length,
  findings,
  limitation:
    'Pattern-based source/history/output scan; does not prove the absence of secrets.',
};
await writeFile('qa/security-scan.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (findings.length) process.exitCode = 1;
