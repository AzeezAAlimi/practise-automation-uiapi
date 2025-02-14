import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pom/loginPage';

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  loginPage.goto('https://rahulshettyacademy.com/client');
  loginPage.validLogin('qaairbnb0@gmail.com', 'Test1234?');
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Example 1', async () => {
  const page = await webContext.newPage();
  await page.locator('.card-body b').first().waitFor();
  const cardTitles = page.locator('.card-body b');
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Example 2', async () => {
  const page = await webContext.newPage();
  await page.locator('.card-body b').first().waitFor();
  await page
    .locator('.card-body')
    .filter({ hasText: 'ZARA COAT 3' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();
  await page
    .getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();
  await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/cart');
  await expect(page.url()).toBe(
    'https://rahulshettyacademy.com/client/dashboard/cart',
  );
  await expect(page.getByRole('heading', { name: 'ZARA COAT 3' })).toBeVisible;
  await page.getByRole('button', { name: 'Checkout' }).click();
  expect(page.locator('[class="input txt text-validated"]').nth(0)).toHaveValue(
    '4542 9931 9292 2293',
  );
  const cardYearDropDown = page.locator('[class="input ddl"]').nth(0);
  await cardYearDropDown.click();
  await cardYearDropDown.selectOption('05');
  const cardDayDropDown = page.locator('[class="input ddl"]').nth(1);
  await cardDayDropDown.click();
  await cardDayDropDown.selectOption('30');
  await page.locator('[class="input txt"]').nth(0).fill('321');
  await page.locator('[class="input txt"]').nth(1).fill('Michael Jordan');
  await page.getByPlaceholder('Select Country').pressSequentially('Poland');
  await page.getByRole('button', { name: 'Poland' }).nth(0).click();
  await page.getByText('PLACE ORDER').click();
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
