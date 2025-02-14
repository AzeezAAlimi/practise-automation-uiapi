import { test, expect, request, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../../pom/loginPage';
import { APIUtils } from '../../utilities/apiUtils';
const loginPayload = {
  userEmail: 'qaairbnb0@gmail.com',
  userPassword: 'Test1234?',
};
const orderPayload = {
  orders: [{ country: 'Poland', productOrderedId: '67a8dde5c0d3e6622a297cc8' }],
};
const fakePayLoadOrders = { data: [], message: 'No Orders' };

let response: { token: string; orderId: string };
test.beforeAll(async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('Example 1', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  const loginPage = new LoginPage(page);
  loginPage.goto('https://rahulshettyacademy.com/client');
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting response - API response->{Fake response}->browser-render data on frontend
    },
  );
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
  );
});
