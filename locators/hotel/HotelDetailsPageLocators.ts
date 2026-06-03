import { Locator, Page } from '@playwright/test';

export const hotelDetailsPageLocators = {
  bookNowButtons: (page: Page): Locator =>
    page.getByRole('button', { name: 'Book Now' }),

  chooseRoomButtons: (page: Page): Locator =>
    page.getByRole('button', { name: 'Choose Room' }),

  hotelNameHeading: (page: Page): Locator =>
    page.getByRole('heading', { name: /.+/ }).first(),
};
