import { Locator, Page, expect } from '@playwright/test';

import { cruiseListPageLocators } from '../../locators/cruise/CruiseListPageLocators';

export class CruiseListPage {
    constructor(private page: Page) { }


    // private viewCruiseDetailsButton(): Locator {
    //     return cruiseListPageLocators.viewCruiseDetails(this.page);
    // }
    async selectRandomCruise() {

        const viewCruiseDetailsButton = cruiseListPageLocators.viewCruiseDetails(this.page);
        console.log('Locating "View Detail" buttons on the cruise list page...', viewCruiseDetailsButton);

        // await expect(viewCruiseDetailsButton).toBeVisible();
        const count = await viewCruiseDetailsButton.count();

        await this.page.waitForTimeout(10000);
        // await expect(count).toBeGreaterThan(0);
        console.log(`Found ${count} "View Detail" buttons on the cruise list page.`);
        await expect(viewCruiseDetailsButton).toBeVisible();
        if (count === 0) {
            throw new Error('No Select Cruise buttons were found');
        }

        const randomIndex = Math.floor(Math.random() * count);
        await viewCruiseDetailsButton.nth(randomIndex).click();

    }
}