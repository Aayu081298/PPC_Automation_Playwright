
import { Locator, Page } from '@playwright/test';

export const cruiseListPageLocators = {
    
    viewCruiseDetails: (page: Page): Locator =>
        page.getByRole('button', { name: 'View Detail' }).first(),
}

