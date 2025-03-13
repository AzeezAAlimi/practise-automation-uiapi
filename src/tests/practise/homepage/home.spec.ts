import { test, expect } from '@playwright/test';

test.describe('Home page with no auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });
  test('Visual test', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page-no-auth.png', {
      mask: [page.getByTitle('Practice Software Testing - Toolshop')],
    });
  });
  test('Check sign in', async ({ page }) => {
    await expect(page.locator("[data-test='nav-sign-in']")).toHaveText(
      'Sign in',
    );
  });

  test('Validate page title', async ({ page }) => {
    await expect(page).toHaveTitle(
      'Practice Software Testing - Toolshop - v5.0',
    );
  });

  test('Grid loads with 9 items', async ({ page }) => {
    const productGrid = page.locator('.col-md-9');
    await expect(productGrid.getByRole('link')).toHaveCount(9);
    expect(await productGrid.getByRole('link').count()).toBe(9);
  });

  test('Search for Thor HAmmer', async ({ page }) => {
    const productGrid = page.locator('.col-md-9');
    await page.locator("[data-test='search-query']").fill('Thor Hammer');
    await page.locator("[data-test='search-submit']").click();
    await expect(productGrid.getByRole('link')).toHaveCount(1);
    await expect(page.getByAltText('Thor Hammer')).toBeVisible();
    // await page.getByTestId('nav-sign-in').click()
    // await page.getByTestId('email').fill('customer@practicesoftwaretesting.com')
    // await page.getByTestId('password').fill('welcome01')
    // await page.getByTestId('login-submit').click()
  });
});

test.describe('Home page customer 01 auth', () => {
  test.use({ storageState: '.auth/customer01.json' });
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });
  test('Visual test authorized', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page-customer01.png', {
      mask: [page.getByTitle('Practice Software Testing - Toolshop')],
    });
  });
  test('Check customer 01 is signed in', async ({ page }) => {
    await expect(page.locator("[data-test='nav-sign-in']")).not.toBeVisible();
    await expect(page.locator("[data-test='nav-menu']")).toContainText(
      'Jane Doe',
    );
  });
});
