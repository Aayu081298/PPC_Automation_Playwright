import { test, expect, Page } from '@playwright/test';

export class SearchPage {

    constructor(private page: Page) { }

    destination_list = [
        'Miami',
        'Orlando',
        'New York'
    ];

    // enter and select location
    async hotel_search() {

        const randomDestination =
            this.destination_list[
            Math.floor(Math.random() * this.destination_list.length)
            ];

        await this.page
            .getByRole('combobox', { name: 'Where are you going?' })
            .fill(randomDestination, {timeout: 10000});

        const firstSuggestion = this.page
            .locator('[role="option"]',)
            .first();

             await this.page.waitForTimeout(5000);

        await firstSuggestion.waitFor({
            state: 'visible', timeout: 10000
        });

        await firstSuggestion.click();

    }


    // select dates

    // async select_date() {


    //     // Open calendar
    //     await this.page
    //         .locator('.MuiGrid2-root.MuiGrid2-direction-xs-row.MuiGrid2-grid-sm-6').first()
    //         .click();

    //     // Generate random future date within 90 days
    //     const today = new Date();

    //     const randomDays = Math.floor(Math.random() * 90) + 1;

    //     const futureDate = new Date();

    //     futureDate.setDate(today.getDate() + randomDays);

    //     const targetDay = futureDate.getDate();

    //     const targetMonth = futureDate.toLocaleString('default', {
    //         month: 'long'
    //     });

    //     const targetYear = futureDate.getFullYear();

    //     const targetMonthYear = `${targetMonth} ${targetYear}`;

    //     console.log('Target => ', targetMonthYear);

    //     // Loop until target month appears
    //     while (true) {

    //         // Current visible month in calendar
    //         const visibleMonth = await this.page
    //             .locator('.react-datepicker__current-month')
    //             .first()
    //             .textContent();

    //         console.log('Visible Month => ', visibleMonth);

    //         if (visibleMonth?.includes(targetMonthYear)) {
    //             break;
    //         }

    //         // Click next month button
    //         await this.page
    //             .getByRole('button', { name: 'Next month' })
    //             .click();
    //     }

    //     // Select day
    //     await this.page
    //         .locator(`//div[contains(@class,'day') and text()='${targetDay}']`)
    //         .first()
    //         .click();
    // }


    async select_adult() {

        await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).first().click();

        // Random number between 1–5
        const randomAdult = Math.floor(Math.random() * 5) + 1;

        console.log('Selected Adults => ', randomAdult);

        // Click random option
        await this.page
            .getByRole('option', {
                name: `${randomAdult}`
            })
            .click();
    }

    async select_child() {
        await this.page.getByRole('button', { name: '0', exact: true }).first().click();
        await this.page.getByRole('button').nth(1).dblclick();

        // Select First child age
        await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).first().click();

        // All age options
        const ageOptions = this.page.getByRole('option');

        // Random age between 1–17
        const randomAge = Math.floor(Math.random() * 17) + 1;

        console.log('Selected Child Age => ', randomAge);

        // Click random age
        await this.page
            .getByRole('option', {
                name: `${randomAge}`,
                exact: true
            })
            .click();

            // Select Secont child age
            await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).nth(1).first().click();

            // Click random age
        await this.page
            .getByRole('option', {
                name: `${randomAge}`
            })
            .click();


            // Click on the apply button

            await this.page.getByRole('button', { name: 'Apply' }).first().click();

    }

    async submit(){
        await this.page.getByRole('button', { name: 'Find Hotels' }).first().click();
    }
}