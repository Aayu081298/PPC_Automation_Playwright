import { Locator, Page } from '@playwright/test';

export const hotelListPageLocators = {
  selectHotelButtons: (page: Page): Locator =>
    page.getByRole('button', { name: 'Select Hotel' }),

  hotelListHeading: (page: Page, cityAndState: string): Locator =>
    page.getByRole('heading').filter({ hasText: new RegExp(cityAndState, 'i') }),

  hotelContainerFromButton: (button: Locator): Locator =>
    button.locator('xpath=ancestor::*[.//h1 or .//h2 or .//h3 or .//h4][1]'),

  hotelTitleHeading: (hotelContainer: Locator): Locator =>
    hotelContainer.locator('xpath=.//h1|.//h2|.//h3|.//h4').first(),
};
