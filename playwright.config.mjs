import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 2,
  timeout: 120000,
  reporter: [['list'], ['json', { outputFile: 'qa/playwright-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: [
    {
      command: 'node scripts/serve.mjs dist 4321',
      url: 'http://127.0.0.1:4321',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'node scripts/serve.mjs .qa-build 4322',
      url: 'http://127.0.0.1:4322',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
