import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/uiandapi',
  retries: 1,
  workers: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { outputFolder: 'my-report' }]],
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'on',
  },
});
