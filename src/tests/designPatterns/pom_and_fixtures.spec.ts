import { test, expect } from '../../page/pom/fixtures';

test('Should login using POM', async ({ page, loginPage }) => {
  await page.goto('https://binaryville.com/account/');
  loginPage.login('test@example.com', 'pass123');
  expect(page.url()).toContain('pass123');
});
