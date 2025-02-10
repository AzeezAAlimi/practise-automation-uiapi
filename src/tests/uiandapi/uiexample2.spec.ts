import { test, expect } from '@playwright/test';

test.beforeEach('UI example login 2', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('input[id="userEmail"]').fill('qaairbnb0@gmail.com');
  await page.locator('input[id="userPassword"]').fill('Test1234?');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash');
  expect(page.url()).toBe(
    'https://rahulshettyacademy.com/client/dashboard/dash',
  );
});

test('Example 1', async ({ page }) => {
  await page.locator('.card-body b').first().waitFor();
  const cardTitles = page.locator('.card-body b');
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Example 2', async ({ page }) => {
  await page.locator('.card-body b').first().waitFor();
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
});
