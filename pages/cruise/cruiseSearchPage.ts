import { Locator, Page, expect } from '@playwright/test';
import { SwitchToProductPage } from '../common/product_redirection';
import { cruiseSearchPageLocators } from '../../locators/cruise/CruiseSearchPageLocators';

export class CruiseSearchPage {
    constructor(private page: Page) { }

    async switchToCruisePage() {
        const switchToProductPage = new SwitchToProductPage(this.page);
        await switchToProductPage.switchToProductCruisePage();
    }

     async searchCruises() {
        const goingToDropdown = cruiseSearchPageLocators.selectGoingTo(this.page);
        await expect(goingToDropdown).toBeVisible();
        // await goingToDropdown.click();
        await goingToDropdown.fill('Caribbean');
        await cruiseSearchPageLocators.getListOption(this.page).click();

        const selectMonth = cruiseSearchPageLocators.selectMonth(this.page);
        await expect(selectMonth).toBeVisible();
        await selectMonth.click();

        const monthOptions = cruiseSearchPageLocators.monthOptions(this.page);
        await expect(monthOptions.first()).toBeVisible();
        const selectedMonthIndex = await this.getRandomMonthIndexAfterMonths(3, monthOptions);
        const selectedMonth = (await monthOptions.nth(selectedMonthIndex).innerText()).trim();
        await monthOptions.nth(selectedMonthIndex).click();

        const selectedCruiseLine = this.getRandomCruiseLine();
        const selectCruiseLine = cruiseSearchPageLocators.selectCruiseLine(this.page);
        await expect(selectCruiseLine).toBeVisible();
        await selectCruiseLine.click();
        await cruiseSearchPageLocators.getCruiseLineOption(this.page, selectedCruiseLine).click();

        const selectedTravelers = this.getRandomTravelerCount();
        const selectTravelers = cruiseSearchPageLocators.selectTravelers(this.page);
        await expect(selectTravelers).toBeVisible();
        await selectTravelers.click();
        await cruiseSearchPageLocators.getTravelersOption(this.page, `${selectedTravelers} Travelers`).click();

        // execute the search
        await cruiseSearchPageLocators.executeSearchButton(this.page).click();

        console.log('Executed cruise search with the following criteria:');

        console.log('Selected cruise search values:', {
            cruiseLine: selectedCruiseLine,
            departureMonth: selectedMonth,
            travelers: selectedTravelers,
        });
    }

    private getRandomCruiseLine(): string {
        const cruiseLines = ['Carnival', 'Norwegian', 'Royal Caribbean'];
        return cruiseLines[Math.floor(Math.random() * cruiseLines.length)];
    }

    private async getRandomMonthIndexAfterMonths(monthsAhead: number, monthOptions: Locator): Promise<number> {
        const count = await monthOptions.count();
        const startIndex = Math.min(monthsAhead, Math.max(0, count - 1));
        const availableCount = Math.max(1, count - startIndex);
        return startIndex + Math.floor(Math.random() * availableCount);
    }

    private getRandomTravelerCount(): number {
        return Math.floor(Math.random() * 4) + 1;
    }
}