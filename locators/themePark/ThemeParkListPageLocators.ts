import { Locator, Page } from '@playwright/test';

export const themeParkSearchPageLocators = {


 selectPark: (page: Page): Locator =>
    page.locator('button').filter({ hasText: 'Select Theme Park' }).last(),



 re_enterParkName: (page: Page): Locator =>
    page.getByRole('combobox', { name: 'Theme Park Name' }),

 modifySearchButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Modify Search' }),
}
