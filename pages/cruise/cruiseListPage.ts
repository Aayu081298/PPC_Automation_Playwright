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

        await expect(viewCruiseDetailsButton.first()).toBeVisible({ timeout: 20000 });

        const count = await viewCruiseDetailsButton.count();
        console.log(`Found ${count} "View Detail" buttons on the cruise list page.`);
        if (count === 0) {
            throw new Error('No Select Cruise buttons were found');
        }

        const randomIndex = Math.floor(Math.random() * count);
        const selectedButton = viewCruiseDetailsButton.nth(randomIndex);

        await Promise.all([
            this.page.waitForURL(/.*cruise-details.*/i, { timeout: 30000 }).catch(() => null),
            selectedButton.click(),
        ]);

        await this.page.waitForLoadState('networkidle');
    }
}