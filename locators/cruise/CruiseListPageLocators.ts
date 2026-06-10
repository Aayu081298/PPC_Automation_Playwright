
import { Locator, Page } from '@playwright/test';

export const cruiseListPageLocators = {

    viewCruiseDetails: (page: Page): Locator =>
        page.locator('button:has-text("View Detail"), [role="button"]:has-text("View Detail")'),

}

