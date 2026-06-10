import { Locator, Page, expect } from '@playwright/test';

import { cruiseDetailsPageLocators } from '../../locators/cruise/CruiseDetailsPageLocators';
import { CruiseListPage } from './cruiseListPage';

export class CruiseDetailsPage {
    constructor(private page: Page) { }



async verifyCruiseDetails() {
    const stateroomsCabin = ['inside', 'outside', 'balcony', 'suite'];

    if (await cruiseDetailsPageLocators.noStateroomsAvailable(this.page).isVisible()) {
        console.log('No staterooms available for this cruise. Navigating back to the cruise list page.');
        await cruiseDetailsPageLocators.backButton(this.page).click();

        const cruiseList = new CruiseListPage(this.page);
        await cruiseList.selectRandomCruise();
        await this.verifyCruiseDetails();


    } else {
        console.log('Cruise details are available. Verifying the details page is displayed correctly.');

        await expect(cruiseDetailsPageLocators.noStateroomsAvailable(this.page)).not.toBeVisible();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);

        const cabinLabelMap: Record<string, string[]> = {
            inside: ['Inside', 'Interior'],
            outside: ['Outside', 'Oceanview'],
            balcony: ['Balcony'],
            suite: ['Suite'],
        };

        const availableTabs: { name: string; locator: Locator }[] = [];

        for (const cabin of stateroomsCabin) {
            const labels = cabinLabelMap[cabin] || [cabin];
            let found = false;

            for (const label of labels) {
                const tabLocator = this.page.getByRole('tab', { name: new RegExp(`^${label}$`, 'i') }).first();
                if (await tabLocator.count() > 0) {
                    availableTabs.push({ name: cabin, locator: tabLocator });
                    found = true;
                    break;
                }

                const buttonLocator = this.page.locator(`button:has-text("${label}"), [role="button"]:has-text("${label}"), a:has-text("${label}")`).first();
                if (await buttonLocator.count() > 0) {
                    availableTabs.push({ name: cabin, locator: buttonLocator });
                    found = true;
                    break;
                }
            }

            if (!found) {
                console.log(`Cabin label not found for: ${cabin} (searching for '${labels.join("', '")}')`);
            }
        }

        if (availableTabs.length === 0) {
            const allText = await this.page.locator('body').innerText();
            console.log('Page text snapshot for debugging cabin tab search:', allText.substring(0, 2000));
            throw new Error('No available stateroom cabin tabs were found on the cruise details page.');
        }

        let selectedTab = availableTabs[0];
        for (const tab of availableTabs) {
            if (await tab.locator.getAttribute('aria-selected') === 'true') {
                selectedTab = tab;
                break;
            }
        }

        console.log(`Available stateroom cabins: ${availableTabs.map(tab => tab.name).join(', ')}. Clicking: ${selectedTab.name}`);
        await expect(selectedTab.locator).toBeVisible({ timeout: 15000 });
        await selectedTab.locator.click();
        await this.page.waitForLoadState('networkidle');
        // Additional assertions to verify cruise details can be added here
    }
    
}
}