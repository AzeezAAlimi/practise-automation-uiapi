import { test, expect } from '@playwright/test';

test('Second', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/auth/login');
  console.log(await page.title());
  await page
    .getByRole('textbox', { name: 'email@example.com' })
    .fill('qaairbnb0@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Test1234?');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash');
  expect(page.url()).toBe(
    'https://rahulshettyacademy.com/client/dashboard/dash',
  );
  const cardTitles = page.locator('.card-body b');
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles)
});