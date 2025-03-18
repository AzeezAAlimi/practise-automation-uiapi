import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly passwordLocator: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.getByRole('textbox', { name: 'Email' });
    this.passwordLocator = page.getByRole('textbox', { name: 'Password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto('https://binaryville.com/account/');
  }
}
