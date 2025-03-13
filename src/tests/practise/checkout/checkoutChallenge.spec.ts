import { test, expect } from '@playwright/test';

test.describe('Checkout challenge', async () => {
  test.use({ storageState: '.auth/customer01.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
  });

  test('Buy now pay later', async ({ page, headless }) => {
    await page.getByText('Claw Hammer with Shock Reduction Grip').click();
    await page.locator("[data-test='add-to-cart']").click();
    await expect(page.locator("[id='lblCartCount']")).toHaveText('1');
    await page.locator("[data-test='nav-cart']").click();
    await page.locator("[data-test='proceed-1']").click();
    await page.locator("[data-test='proceed-2']").click();
    await page.getByRole('textbox', { name: 'Street' }).clear();
    await page.getByRole('textbox', { name: 'Street' }).fill('123 Testing Way');
    await page.getByRole('textbox', { name: 'City' }).clear();
    await page.getByRole('textbox', { name: 'City' }).fill('Sacramento');
    await page.getByRole('textbox', { name: 'State' }).clear();
    await page.getByRole('textbox', { name: 'State' }).fill('California');
    await page.getByRole('textbox', { name: 'Country' }).clear();
    await page.getByRole('textbox', { name: 'Country' }).fill('USA');
    await page.getByRole('textbox', { name: 'Postal code' }).clear();
    await page.getByRole('textbox', { name: 'Postal code' }).fill('08765');
    await page.locator("[data-test='proceed-3']").click();
    await expect(page.locator("[data-test='finish']")).toBeDisabled();
    await page
      .locator("[data-test='payment-method']")
      .selectOption('Buy Now Pay Later');
    await page
      .locator("[data-test='monthly_installments']")
      .selectOption('6 Monthly Installments');
    await page.locator("[data-test='finish']").click();
    await expect(page.locator('.help-block')).toHaveText(
      'Payment was successful',
    );
    headless
      ? await test.step('Visual test', async () => {
          await expect(page).toHaveScreenshot('checkout.png', {
            mask: [page.getByTitle('Practice Software Testing - Toolshop')],
          });
        })
      : console.log('Running in Headed mode, no screenshot comparison');
  });
});
