
import { Locator, Page } from '@playwright/test';

export const cruiseDetailsPageLocators = {

    noStateroomsAvailable: (page: Page): Locator =>
        page.getByRole('heading', { name: 'No Staterooms Available Right' }),

    backButton: (page: Page): Locator =>
        page.getByRole('button', { name: 'Back' }),

    selectCabin: (page: Page): Locator =>
        page.getByRole('button', { name: 'Select' }).first(),

    getAllCabinTabs: (page: Page): Locator =>
        page.locator("(//div[@role='tablist'])[2]/button"),

    selectCabinTab: (page: Page, tabName: string): Locator =>
        page.getByRole('tab', { name: tabName }).first(),


    stateroomsSection: (page: Page): Locator =>
        page.locator('div.custom-selectListField:visible'),

    selectStateroomButtons: (page: Page, stateroom: number): Locator =>
        page.getByRole('button', { name: 'Select' }).nth(stateroom),

    notAvailableMessage: (page: Page): Locator =>
        page.getByText('Not Available'),
}

