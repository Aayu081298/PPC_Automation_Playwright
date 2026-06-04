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
        await goingToDropdown.click();
        await goingToDropdown.getByRole('option', { name: 'Caribbean' }).click();

        const selectedMonth = this.getRandomMonthAfterMonths(3);
        const selectMonth = cruiseSearchPageLocators.selectMonth(this.page);
        await expect(selectMonth).toBeVisible();
        await selectMonth.click();
        await cruiseSearchPageLocators.getMonthOption(this.page, selectedMonth).click();

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

    private getRandomMonthAfterMonths(monthsAhead: number): string {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const today = new Date();
        const startIndex = (today.getMonth() + monthsAhead) % 12;
        const availableMonths = [] as string[];

        for (let i = 0; i < 12; i++) {
            const index = (startIndex + i) % 12;
            availableMonths.push(monthNames[index]);
        }

        return availableMonths[Math.floor(Math.random() * availableMonths.length)];
    }

    private getRandomTravelerCount(): number {
        return Math.floor(Math.random() * 5) + 1;
    }
}