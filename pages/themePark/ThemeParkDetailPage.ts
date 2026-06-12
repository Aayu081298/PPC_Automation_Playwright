import { Locator, Page, expect } from '@playwright/test';

import { themeParkDetailPageLocators } from '../../locators/themePark/ThemeParkDetailPageLocators';


export class ThemeParkDetailPage {
    constructor(private page: Page) { }

    async checkAvailability() {
        const check_availability = themeParkDetailPageLocators.checkAvailability(this.page);

        if (await check_availability.isVisible()) {
            await check_availability.click();
        } else {
            console.log('Check Availability button is not visible on the theme park detail page.');
        }


    }


    async selectThemePark() {
        const select_button = themeParkDetailPageLocators.select(this.page);
        if (await select_button.isVisible()) {
            await select_button.click();
        } else {
            console.log('Select button is not visible on the theme park detail page.');
        }
    }
}