
import { Locator, Page } from '@playwright/test';

export const cruiseListPageLocators = {

    // First "View Detail" button on the page
    viewCruiseDetails: (page: Page): Locator =>
        page.locator('button', { hasText: /View Detail/i }).first(),


}

