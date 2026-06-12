import { Locator, Page } from '@playwright/test';

export const themeParkDetailPageLocators = {

click_on_guest: (page: Page): Locator =>
    page.locator('#composition-button'),

    checkAvailability: (page: Page): Locator =>
        page.getByRole('button', { name: 'Check Availability' }),

    select: (page: Page): Locator =>
        page.getByRole('button', { name: 'Select', exact: true }),



}