import { Locator, Page } from '@playwright/test';

export const hotelSearchPageLocators = {
    destinationInput: (page: Page): Locator =>
        page.getByRole('combobox', { name: 'Where are you going?' }),

    firstSuggestion: (page: Page): Locator =>
        page.getByRole('option').first(),

    noResultsText: (page: Page): Locator =>
        page.locator('text=Sorry, No hotels found for this search.'),

    listbox: (page: Page): Locator =>
        page.getByRole('listbox'),

    visibleOption: (page: Page, optionLabel: string): Locator =>
        page
            .getByRole('listbox')
            .getByRole('option', { name: optionLabel, exact: true }),

    adultsCombobox: (page: Page): Locator =>
        page.getByRole('combobox', { name: 'Adults (Age 18+)' }),

    childCountButtonZero: (page: Page): Locator =>
        page.getByRole('button', { name: '0', exact: true }).first(),

    secondButton: (page: Page): Locator => page.getByRole('button').nth(1),

    applyButton: (page: Page): Locator =>
        page.getByRole('button', { name: 'Apply' }).first(),

    findHotelsButton: (page: Page): Locator =>
        page.getByRole('button', { name: 'Find Hotels' }).first(),
};
