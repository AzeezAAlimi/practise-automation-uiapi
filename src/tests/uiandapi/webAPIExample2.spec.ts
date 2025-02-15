import { test, expect, BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pom/loginPage';
import { DashBoardPage } from '../../pom/dashBoardPage';
import { CartPage } from '../../pom/cartPage';
import { PaymentPage } from '../../pom/paymentPage';
import { OrderSuccessPage } from '../../pom/orderSuccessPage';
import data from '../../utilities/testData/placeOrderData.json';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  loginPage.goto('https://rahulshettyacademy.com/client');
  loginPage.validLogin(data.emailAddress, data.password);
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Example 1', async ({ page }) => {
  const dashBoardPage = new DashBoardPage(page);
  await dashBoardPage.searchProductLoop(data.productName);
  await dashBoardPage.navigateToCart();
  const cartPage = new CartPage(page);
  await cartPage.goToCheckout();
  const paymentPage = new PaymentPage(page);
  await paymentPage.creditCard(
    '4542 9931 9292 2293',
    '05',
    '30',
    '321',
    'Michael Jordan',
    'Poland',
  );
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  const orderId = (await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent()) as string;
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = (await rows
      .nth(i)
      .locator('th')
      .textContent()) as string;
    console.log({ rowOrderId });
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = (await page
    .locator('.col-text')
    .textContent()) as string;
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
