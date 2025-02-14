import { test, expect } from '@playwright/test';

test('Example 2', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route('**/*.css', (route) => route.abort());
  await page.route('**/*.{jpg,png,jpeg}', (route) => route.abort());
  page.on('request', (request) => console.log(request.url()));
  page.on('response', (response) =>
    console.log(response.url(), response.status()),
  );
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");
  await documentLink.waitFor();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);
  await newPage.waitForLoadState();
  const text = await newPage.locator('.red').textContent();
  console.log(text);
});
