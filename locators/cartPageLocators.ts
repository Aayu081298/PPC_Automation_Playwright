import { Locator, Page } from '@playwright/test';

export const cartPageLocators = {

    validateHotelName: (page: Page): Locator =>
    page.locator('/html/body/div[1]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[2]/table/tbody/tr/td[2]/span'),
};





