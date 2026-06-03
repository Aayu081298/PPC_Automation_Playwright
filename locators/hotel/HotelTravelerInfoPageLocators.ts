import { Locator, Page } from '@playwright/test';

export const hotelTravelerInfoPageLocators = {
  hotelInfoHeading: (page: Page): Locator =>
    page.locator('div > div > div.custom-attractionDetailList > div.custom-attrNameField > h4'),

  roomInfo: (page: Page): Locator =>
    page.locator('div > div > div.custom-attractionDetailList > div.custom-resortOptionField > div > span:nth-child(2)'),

  addressInfo: (page: Page): Locator =>
    page.locator('div.custom-locationField > ul > li > div.MuiListItemText-root.css-1tsvksn > span'),

  hotelImage: (page: Page): Locator =>
    page.locator('div > div > div.custom-attractionImgBox  > img'),

  firstNameInput: (page: Page): Locator =>
    page.getByRole('textbox', { name: 'First name' }),

  lastNameInput: (page: Page): Locator =>
    page.getByRole('textbox', { name: 'Last name' }),

  emailInput: (page: Page): Locator =>
    page.getByRole('textbox', { name: 'Email' }),

  phoneInput: (page: Page): Locator =>
    page.getByRole('textbox', { name: '1 (702) 123-' }),

  termsCheckbox: (page: Page): Locator =>
    page.getByRole('checkbox'),

  addToCartButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Add to Cart' }),
};
