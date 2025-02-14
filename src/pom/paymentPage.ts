import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage {
  private page: Page;
  private creditCardNumberInput: Locator;
  private cardYearDropdown: Locator;
  private cardDayDropdown: Locator;
  private cvvCodeInput: Locator;
  private cardNameInput: Locator;
  private selectCountryInput: Locator;
  private selectCountryResult: Locator;
  private placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.creditCardNumberInput = page
      .locator('[class="input txt text-validated"]')
      .nth(0);
    this.cardYearDropdown = page.locator('[class="input ddl"]').nth(0);
    this.cardDayDropdown = page.locator('[class="input ddl"]').nth(1);
    this.cvvCodeInput = page.locator('[class="input txt"]').nth(0);
    this.cardNameInput = page.locator('[class="input txt"]').nth(1);
    this.selectCountryInput = page.getByPlaceholder('Select Country');
    this.selectCountryResult = page
      .locator('[class="ta-results list-group ng-star-inserted"]')
      .nth(0);
    this.placeOrderBtn = page.getByText('PLACE ORDER');
  }

  async creditCard(
    creditCardNo: string,
    cardYear: string,
    cardDay: string,
    cvv: string,
    cardName: string,
    country: string,
  ) {
    await this.creditCardNumberInput.fill(creditCardNo);
    expect(this.creditCardNumberInput).toHaveValue(creditCardNo);
    await this.cardYearDropdown.click();
    await this.cardYearDropdown.selectOption(cardYear);
    await this.cardDayDropdown.click();
    await this.cardDayDropdown.selectOption(cardDay);
    await this.cvvCodeInput.fill(cvv);
    await this.cardNameInput.fill(cardName);
    await this.selectCountryInput.pressSequentially(country);
    await this.selectCountryResult.click();
    await this.placeOrderBtn.click();
  }
}
