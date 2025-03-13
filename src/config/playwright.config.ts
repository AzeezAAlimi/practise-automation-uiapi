import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30_000,
  globalTimeout: 10 * 60 * 1000,
  testDir: './src/tests/practise',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    trace: 'on',
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    headless: true,
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'setup',
      testMatch: '/.*\.setup\.ts/',
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], permissions: ['clipboard-read'] },
    },
    // {
    //   name: 'firefox',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Firefox'], permissions: ['clipboard-read'] },
    // },
    // {
    //   name: 'webkit',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Safari'], permissions: ['clipboard-read'] },
    // },
  ],
});
