
import { Locator, Page } from '@playwright/test';

export const cruiseDetailsPageLocators = {

    noStateroomsAvailable: (page: Page): Locator =>
        page.getByRole('heading', { name: 'No Staterooms Available Right' }),

    backButton: (page: Page): Locator =>
        page.getByRole('button', { name: 'Back' }),

    selectCabin: (page: Page): Locator =>
        page.getByRole('button', { name: 'Select' }).first(),

}

