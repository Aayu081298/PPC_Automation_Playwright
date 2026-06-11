import { Locator, Page } from '@playwright/test';

export const themeParkSearchPageLocators = {

    chooseDate: (page: Page): Locator =>
        page.locator("button[aria-label='Choose date'], button:has-text('Choose date')"),

    enterParkName: (page: Page): Locator =>
        page.locator("#combo-box-demo, input[id='combo-box-demo'], input[placeholder*='park'], input[aria-label*='park'], input[role='combobox']"),


    findThemeParksButton: (page: Page): Locator => {
        return page.locator("(//button[normalize-space()='Find Theme Park'])[1]") || page.locator(':text-is("Find Theme Park")');
    },

    nextMonthButton: (page: Page): Locator => {
        return page.locator("//button[@title='Next month']//*[name()='svg']") || page.locator("button[title='Next month'] svg");
    },

    selectAnydateFromCalendar: (page: Page): Locator => {
        return page.locator("//button[@role='gridcell' and not(@disabled)]") || page.locator('div.MuiDayCalendar-monthContainer.css-i6bazn')
    }
}