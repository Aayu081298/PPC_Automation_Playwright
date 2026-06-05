import { Locator, Page } from '@playwright/test';

export const cruiseSearchPageLocators = {

    selectGoingTo: (page: Page): Locator =>
        page.getByRole('combobox', { name: 'Going to Departing Port' }),

    getListOption: (page: Page,): Locator =>
        page.locator("//li[@id='combo-box-demo-option-0']"),

    selectMonth: (page: Page): Locator =>
        page.locator('#demo-simple-select-5'),

    monthOptions: (page: Page): Locator =>
        page.locator('ul.MuiList-root.MuiList-padding.MuiMenu-list.css-r8u8y9'),

    getMonthOption: (page: Page, month: string): Locator =>
         page.getByText(month),

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


