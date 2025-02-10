import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/api',
  retries: 3,
  workers: 2,
  timeout: 30000, // for the overral test
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    actionTimeout: 15000,
    trace: 'retain-on-failure',
  },
  expect: {
    timeout: 900000, // for assertions
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};

export default config;
