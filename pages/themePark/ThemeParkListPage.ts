import { Locator, Page, expect } from '@playwright/test';
import { themeParkSearchPageLocators } from '../../locators/themePark/ThemeParkListPageLocators';


export class ThemeParkListPage {
    constructor(private page: Page) { }

    async selectThemePark() {


        const selectThemePark = themeParkSearchPageLocators.selectPark(this.page);

        if (await selectThemePark.isVisible({ timeout: 15000 })) {
            await this.page.timeout(5000);/
            console.log('Select Theme Park button is visible on the theme park list page.');

            const count = await selectThemePark.count();
            const randomIndex = Math.floor(Math.random() * count);

            await selectThemePark.nth(randomIndex).click();
        } else {
            console.log('Select Theme Park button is not visible on the theme park list page.');
            this.refinementFilter();

        }



    }




    async refinementFilter() {

        const themeParkList = [
            'Disneyland Resort Theme Parks',
            'Disney World® Theme Parks',
            'Universal Studios Hollywood',
            'Universal Orlando Resort',
            'SeaWorld Orlando'
        ];

        const randomPark = themeParkList[Math.floor(Math.random() * themeParkList.length)];

        console.log(`Selected Park: ${randomPark}`);

        const enter_park_name = themeParkSearchPageLocators.re_enterParkName(this.page);
        try {
            await enter_park_name.waitFor({ state: 'visible', timeout: 15000 });
            await enter_park_name.fill(randomPark);

            // Dropdown se exact option select karo
            const parkOption = this.page.getByText(randomPark, { exact: true });
            await parkOption.waitFor({ state: 'visible', timeout: 15000 });
            await parkOption.click();
        } catch (error) {
            console.log('Enter park name input field is not visible or not ready on the theme park search page.');
        }

         // Click on the "Modify Search" button to perform the search
                const find_theme_parks_button = themeParkSearchPageLocators.modifySearchButton(this.page);
                try {
                    await find_theme_parks_button.waitFor({ state: 'visible', timeout: 15000 });
                    await find_theme_parks_button.click();
                } catch (error) {
                    console.log('Modify Search button is not visible or did not become visible in time on the theme park search page.');
                }
    }


}

