import { Locator, Page, expect } from '@playwright/test';

import { cruiseListPageLocators } from '../../locators/cruise/CruiseListPageLocators';

export class CruiseListPage {
    constructor(private page: Page) { }


    private viewCruiseDetailsButton(): Locator {
        return cruiseListPageLocators.viewCruiseDetails(this.page);
    }
    async selectRandomCruise() {

        const viewCruiseDetailsButton = this.viewCruiseDetailsButton();

        await expect(viewCruiseDetailsButton).toBeVisible();
        const count = await viewCruiseDetailsButton.count();
        if (count === 0) {
            throw new Error('No Select Hotel buttons were found');
        }

        const randomIndex = Math.floor(Math.random() * count);
        await viewCruiseDetailsButton.nth(randomIndex).click();

    }
}