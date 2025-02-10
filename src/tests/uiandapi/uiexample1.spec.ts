import { test, expect } from '@playwright/test';

test('First', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await page
    .getByRole('textbox', { name: 'Username' })
    .fill('rahulshettyacademy');
  await page.getByRole('textbox', { name: 'Password' }).fill('learning');
  await page
    .getByRole('checkbox', { name: 'I Agree to the terms and conditions' })
    .click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
  expect(page.url()).toBe(
    'https://rahulshettyacademy.com/angularpractice/shop',
  );
  const cardTitles = page.locator('.card-body a');
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles)
});
