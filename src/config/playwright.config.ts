import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/uiandapi',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { outputFolder: 'my-report' }]],
  use: {
    headless: false,
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'on',
  },
});