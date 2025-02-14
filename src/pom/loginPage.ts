import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private userEmail: Locator;
  private userPassword: Locator;
  private loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmail = page.locator('input[id="userEmail"]');
    this.userPassword = page.locator('input[id="userPassword"]');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async goto(website: string) {
    await this.page.goto(website);
  }

  async validLogin(emailAddress: string, password: string) {
    await this.userEmail.fill(emailAddress);
    await this.userPassword.fill(password);
    await this.loginBtn.click();
    await this.page.waitForURL(
      'https://rahulshettyacademy.com/client/dashboard/dash',
    );
    expect(this.page.url()).toBe(
      'https://rahulshettyacademy.com/client/dashboard/dash',
    );
  }
}
