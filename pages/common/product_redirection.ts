import { Page, expect } from '@playwright/test';

export class SwitchToProductPage {

    constructor(private page: Page) { } 

    async switchToProductCruisePage() {
        const cruiseLink = this.page.getByRole('tab', { name: 'Cruises' });

        await expect(cruiseLink).toBeVisible({ timeout: 10000 });
        await cruiseLink.click();
        await expect(this.page).toHaveURL(/.*\/?page=cruise$/, { timeout: 10000 });
        console.log('Successfully Redirected to the Cruises page', 'switchToProductCruisePage: success');
    }

    async switchToProductCarPage() {
        const carLink = this.page.getByRole('tab', { name: 'Cars' });

        await expect(carLink).toBeVisible({ timeout: 10000 });
        await carLink.click();
        await expect(this.page).toHaveURL(/.*\/?page=car$/, { timeout: 10000 });
        console.log('Successfully Redirected to the Cars page', 'switchToProductCarPage: success');
    }


}