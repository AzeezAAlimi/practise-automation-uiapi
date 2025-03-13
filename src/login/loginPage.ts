import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPagePractice {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("[data-test='email']");
    this.passwordInput = page.locator("[data-test='password']");
    this.loginBtn = page.locator("[data-test='login-submit']");
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com' + '/auth/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await expect(this.page.locator("[data-test='nav-menu']")).toContainText(
      'Jane Doe',
    );
  }
}
