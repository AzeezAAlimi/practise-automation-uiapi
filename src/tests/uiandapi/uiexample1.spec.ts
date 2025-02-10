import { test, expect } from '@playwright/test';

test('Example 1', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await page
    .getByRole('textbox', { name: 'Username' })
    .fill('rahulshettyacademy');
  await page.getByRole('textbox', { name: 'Password' }).fill('learning');
  const dropDown = page.locator('select.form-control');
  await dropDown.selectOption('teach');
  await page.getByRole('radio', { name: 'User' }).click();
  await page.getByRole('button', { name: 'Okay' }).click();
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
  console.log(allTitles);
});

test('Example 2', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
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