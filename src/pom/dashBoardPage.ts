import { expect, type Locator, type Page } from '@playwright/test';

export class DashBoardPage {
  private page: Page;
  private products: Locator;
  private productsText: Locator;
  private cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cartBtn = page
      .getByRole('listitem')
      .getByRole('button', { name: 'Cart' });
  }

  async displayAvailableProduct() {
    const cardTitles = await this.productsText;
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
  }

  async searchProductLoop(productName: string) {
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }

  async searchProduct(productName: string) {
    await this.page
      .locator('.card-body')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to Cart' })
      .click();
  }

  async navigateToCart() {
    await this.cartBtn.click();
    await this.page.waitForURL(
      'https://rahulshettyacademy.com/client/dashboard/cart',
    );
    await expect(this.page.url()).toBe(
      'https://rahulshettyacademy.com/client/dashboard/cart',
    );
  }
}
