import { test } from '@playwright/test';
import { LoginPagePractice } from '../../../login/loginPage';

test('login without page object', async ({ page }) => {
  const loginPage = new LoginPagePractice(page);
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
});
