import { test, expect } from '@playwright/test';

test('Example 1', async ({ page }) => {
  const month = '6';
  const date = '15';
  const year = '2027';
  const expectedList = [month, date, year];
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page
    .locator(
      '[class="react-date-picker__calendar-button react-date-picker__button"]',
    )
    .click();
  await page.locator('[class="react-calendar__navigation__label"]').click();
  await page.locator('[class="react-calendar__navigation__label"]').click();
  await page.getByText(year).click();
  await page
    .locator('[class*="react-calendar__year-view__months__month"]')
    .nth(Number(month) - 1)
    .click();
  await page.locator("//abbr[text()='" + date + "']").click();
  const values = await page.locator(
    '[class*="react-date-picker__inputGroup inout"]',
  );
  for (let i = 0; i < (await values.count()); i++) {
    const value = await values.nth(i).getAttribute('value');
    expect(value).toEqual(expectedList[i]);
  }
});
