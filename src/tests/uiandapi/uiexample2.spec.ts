import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pom/loginPage';
import { DashBoardPage } from '../../pom/dashBoardPage';
import { CartPage } from '../../pom/cartPage';
import { PaymentPage } from '../../pom/paymentPage';
import { OrderSuccessPage } from '../../pom/orderSuccessPage';
import data from '../../utilities/testData/placeOrderData.json';

test.beforeEach('UI example login 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://rahulshettyacademy.com/client');
  await loginPage.validLogin(data.emailAddress, data.password);
});

test('Example 1', async ({ page }) => {
  const dashBoardPage = new DashBoardPage(page);
  await dashBoardPage.displayAvailableProduct();
});

test('Example 2', async ({ page }) => {
  const dashBoardPage = new DashBoardPage(page);
  await dashBoardPage.searchProduct(data.productName);
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

// const dropDown = page.locator('.ta-results');
// await dropDown.waitFor();
// const optionsCount = await dropDown.locator('button').count();
// for (let i = 0; i < optionsCount; ++i) {
//   const text = await dropDown.locator('button').nth(i).textContent();
//   if (text === ' Poland') {
//     await dropDown.locator('button').nth(i).click();
//     break;
//   }
// }

test('Example 3', async ({ page }) => {
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