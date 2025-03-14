import { test, expect } from '@playwright/test';

test('Sign in button is visible', async ({ page }) => {
  await page.goto('https://binaryville.com/account');
  const signInbutton = page.getByRole('button', { name: 'Sign in' });
  await expect(signInbutton).toBeVisible();
});
