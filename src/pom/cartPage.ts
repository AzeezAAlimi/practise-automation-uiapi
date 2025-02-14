import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  }

  async goToCheckout() {
    await expect(this.page.locator('[class="itemNumber"]')).toBeVisible;
    await this.checkoutBtn.click();
  }
}
