import { Locator, Page, expect } from '@playwright/test';

export class SwitchToProductPage {

    constructor(private page: Page) { } 

    async switchToProductCruisePage() {

        const cruiseLink = this.page.getByRole('tab', { name: 'Cruises' });
        await expect(cruiseLink).toBeVisible();
        await cruiseLink.click();
        await expect(this.page).toHaveURL('https://stage_tmp.purchasingpower.travel/cruises');
        console.log('Successfully Redirected to the Cruises page', 'switchToProductCruisePage: success');
    }

    async switchToProductCarPage() {

        const carLink = this.page.getByRole('tab', { name: 'Cars' });
        await expect(carLink).toBeVisible();
        await carLink.click();
        await expect(this.page).toHaveURL('https://stage_tmp.purchasingpower.travel/cars');
        console.log('Successfully Redirected to the Cars page', 'switchToProductCarPage: success');
    }


}