import { test, expect, request } from '@playwright/test';

const loginPayload = {
  userEmail: 'qaairbnb0@gmail.com',
  userPassword: 'Test1234?',
};
const orderPayload = {
  orders: [{ country: 'Poland', productOrderedId: '67a8dde5c0d3e6622a297cc8' }],
};

let token;
let orderId;

test.beforeAll(async () => {
  // Login API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: loginPayload,
    },
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = JSON.parse(await loginResponse.text());
  token = loginResponseJson.token;
  console.log(token);

  //
  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        'content-Type': 'application/json',
      },
    },
  );
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test.beforeEach(({}) => {});

test('Example 1', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
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
      }, token);
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
