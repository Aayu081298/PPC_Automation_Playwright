import { Locator, Page } from '@playwright/test';

export const cruiseSearchPageLocators = {

    selectGoingTo: (page: Page): Locator =>
        page.getByRole('combobox', { name: 'Going to Departing Port' }),


    selectMonth: (page: Page): Locator =>
        page.locator('#demo-simple-select-5'),

    getMonthOption: (page: Page, month: string): Locator =>
        page.getByRole('option', { name: month }),

    selectCruiseLine: (page: Page): Locator =>
        page.getByText('Cruise Line (Any)'),

    getCruiseLineOption: (page: Page, cruiseLine: string): Locator =>
        page.getByRole('option', { name: cruiseLine }),

    selectTravelers: (page: Page): Locator =>
        page.locator('#demo-simple-select-8'),

    getTravelersOption: (page: Page, travelers: string): Locator =>
        page.getByRole('option', { name: travelers }),

    executeSearchButton: (page: Page): Locator =>
        page.getByRole('button', { name: 'Find Cruises' }),
}


