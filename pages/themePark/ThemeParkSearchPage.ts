import { Locator, Page, expect } from '@playwright/test';
import { SwitchToProductPage } from '../common/product_redirection';
import { themeParkSearchPageLocators } from '../../locators/themePark/ThemeParkSearchPageLocators';


export class ThemeParkSearchPage {
    constructor(private page: Page) { }



    async switchToThemeParkPage() {
        const switchToProductPage = new SwitchToProductPage(this.page);
        await switchToProductPage.switchToProductThemeParkPage();
    }


    async searchThemeParks() {

        const themeParkList = [
            'Disneyland Resort Theme Parks',
            'Disney World® Theme Parks',
            'Universal Studios Hollywood',
            'SeaWorld Orlando'
        ];

        // Click on the "Choose date" button to open the calendar
        const click_on_choose_date = themeParkSearchPageLocators.chooseDate(this.page);
        try {
            await click_on_choose_date.waitFor({ state: 'visible', timeout: 30000 });
            await click_on_choose_date.click();

            // Click on the "Next month" button a random number of times (between 3 and 6) to navigate through the calendar months
            const click_on_next_month = themeParkSearchPageLocators.nextMonthButton(this.page);
            const clickCount = Math.floor(Math.random() * 4) + 3; // 3 to 6

            for (let i = 0; i < clickCount; i++) {
                if (await click_on_next_month.isVisible()) {
                    await click_on_next_month.click();
                } else {
                    console.log('Next month button is not visible on the calendar.');
                    break;
                }
            }
            // After navigating through the months, select any available date from the calendar
            const select_any_date_from_calendar = themeParkSearchPageLocators.selectAnydateFromCalendar(this.page);
            const count = await select_any_date_from_calendar.count();
            console.log('Checking for available dates in the calendar after navigating through months.', count);
            if (count > 0) {
                console.log('Available dates count:', count);
                const randomIndex = Math.floor(Math.random() * count);
                console.log('Random index for date selection:', randomIndex);
                await select_any_date_from_calendar.nth(randomIndex).click();
            }
        } catch (error) {
            console.log('Choose date button is not visible or did not become visible in time on the theme park search page.');
        }

        // Enter a park name in the "Enter park name" input field

        const randomPark = themeParkList[Math.floor(Math.random() * themeParkList.length)];

        console.log(`Selected Park: ${randomPark}`);

        const enter_park_name = themeParkSearchPageLocators.enterParkName(this.page);
        try {
            await enter_park_name.waitFor({ state: 'visible', timeout: 15000 });
            await enter_park_name.fill(randomPark);

            // Dropdown se exact option select karo
            const parkOption = this.page.getByText(randomPark, { exact: true });
            await parkOption.waitFor({ state: 'visible', timeout: 30000 });
            await parkOption.click();
        } catch (error) {
            console.log('Enter park name input field is not visible or not ready on the theme park search page.');
        }

        

        // Click on the "Find Theme Park" button to perform the search
        const find_theme_parks_button = themeParkSearchPageLocators.findThemeParksButton(this.page);
        try {
            await find_theme_parks_button.waitFor({ state: 'visible', timeout: 30000 });
            await find_theme_parks_button.click();
            console.log('Clicked on the Find Theme Park button to perform the search.');
        } catch (error) {
            console.log('Find Theme Park button is not visible or did not become visible in time on the theme park search page.');
        }

    }

}