import { expect, type Locator, type Page } from '@playwright/test';

export class OrderSuccessPage {
  private page: Page;
  private successMessage: Locator;
  private orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.getByText('Thankyou for the order.');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async successfulOrder() {
    await expect(this.page.getByText('Thankyou for the order.')).toBeVisible();
    const orderId = (await this.page
      .locator('.em-spacer-1 .ng-star-inserted')
      .textContent()) as string;
    console.log(orderId);
  }
}
