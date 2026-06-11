import { Locator, Page, expect } from '@playwright/test';

import { cruiseDetailsPageLocators } from '../../locators/cruise/CruiseDetailsPageLocators';
import { CruiseListPage } from './cruiseListPage';

export class CruiseDetailsPage {
    constructor(private page: Page) { }

    private getRandomIndex(count: number): number {
        return Math.floor(Math.random() * count);
    }

    private async getAvailableCabinTabs(): Promise<Locator[]> {
        const cabinTabsLocator = cruiseDetailsPageLocators.getAllCabinTabs(this.page);
        await expect(cabinTabsLocator.first()).toBeVisible({ timeout: 15000 });
        const cabinTabCount = await cabinTabsLocator.count();
        const availableCabinTabs: Locator[] = [];

        for (let index = 0; index < cabinTabCount; index++) {
            const tabLocator = cabinTabsLocator.nth(index);
            if (await tabLocator.isVisible()) {
                availableCabinTabs.push(tabLocator);
            }
        }

        return availableCabinTabs;
    }

    async verifyCruiseDetails() {


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
            await this.page.waitForTimeout(10000);

            // Click on an available Cabin tab
            const availableCabinTabs = await this.getAvailableCabinTabs();
            console.log('Available cabin tabs count:', availableCabinTabs.length);
            if (availableCabinTabs.length === 0) {
                throw new Error('No available cabin tabs found on the cruise details page.');
            }

            const randomIndexCabinTab = this.getRandomIndex(availableCabinTabs.length);
            const selectedCabinTab = availableCabinTabs[randomIndexCabinTab];
            const selectedTabText = (await selectedCabinTab.innerText())?.trim() ?? 'unknown';
            console.log('Selected cabin tab:', selectedTabText);

            await expect(selectedCabinTab).toBeVisible({ timeout: 15000 });
            await selectedCabinTab.click();

            // Select the Cabin
            await this.selectCabin();
            // const selectCabinButton = cruiseDetailsPageLocators.selectCabin(this.page);
            // await expect(selectCabinButton).toBeVisible({ timeout: 15000 });
            // console.log('Select Cabin button is visible. Clicking the button to proceed with cabin selection.');

            // const selectCabinCount = await selectCabinButton.count();
            // const randomIndexCabin = this.getRandomIndex(selectCabinCount);
            // const selectedButton = selectCabinButton.nth(randomIndexCabin);
            // await selectedButton.click();

            const notAvailable = cruiseDetailsPageLocators.notAvailableMessage(this.page);
            if (await notAvailable.isVisible()) {
                await this.selectCabin();
            } else {
                // Select the stateroom
                const stateroomsSection = cruiseDetailsPageLocators.stateroomsSection(this.page);
                if (await stateroomsSection.isVisible({ timeout: 15000 })) {
                    console.log('Staterooms section is visible. Verifying stateroom options are displayed correctly.');

                    const selectStateroomButtons = cruiseDetailsPageLocators.selectStateroomButtons(this.page, 0); // Pass the stateroom index
                    const stateroomButtonCount = await selectStateroomButtons.count();
                    const randomIndexStateroomButtons = this.getRandomIndex(stateroomButtonCount);
                    await selectStateroomButtons.nth(randomIndexStateroomButtons).click();

                }
            }

        }

    }


    async selectCabin() {
        // Select the Cabin
        const selectCabinButton = cruiseDetailsPageLocators.selectCabin(this.page);
        await expect(selectCabinButton).toBeVisible({ timeout: 15000 });
        console.log('Select Cabin button is visible. Clicking the button to proceed with cabin selection.');

        const selectCabinCount = await selectCabinButton.count();
        const randomIndexCabin = this.getRandomIndex(selectCabinCount);
        const selectedButton = selectCabinButton.nth(randomIndexCabin);
        await selectedButton.click();
    }
}
