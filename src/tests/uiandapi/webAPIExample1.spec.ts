import { test, expect, request, APIRequestContext } from '@playwright/test';
import { APIUtils } from '../../utilities/apiUtils';

const loginPayload = {
  userEmail: 'qaairbnb0@gmail.com',
  userPassword: 'Test1234?',
};
const orderPayload = {
  orders: [{ country: 'Poland', productOrderedId: '67a8dde5c0d3e6622a297cc8' }],
};

let response: { token: string; orderId: string };

test.beforeAll(async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('Example 1', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('.card-body b').first().waitFor();
  const cardTitles = page.locator('.card-body b');
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Example 2', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('.card-body b').first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = (await rows
      .nth(i)
      .locator('th')
      .textContent()) as string;
    console.log({ rowOrderId });
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = (await page
    .locator('.col-text')
    .textContent()) as string;
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
