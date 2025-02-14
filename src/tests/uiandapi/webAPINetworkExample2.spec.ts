import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pom/loginPage';

test('Security test request intercept', async ({ page }) => {
  // Login and reach orders page
  const loginPage = new LoginPage(page);
  loginPage.goto('https://rahulshettyacademy.com/client');
  loginPage.validLogin('qaairbnb0@gmail.com', 'Test1234?');
  await page.locator('.card-body b').first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route) =>
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67ae51bdc019fb1ad6f7bd79',
      }),
  );
  await page.getByRole('button', { name: 'View' }).nth(0).click();
  await page.pause();
});
