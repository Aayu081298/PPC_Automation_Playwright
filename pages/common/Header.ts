import { Locator, Page, expect } from '@playwright/test';

export class ValidateHeader {

    constructor(private page: Page) { } 
    
    async validateHeaderLogo() {
        const headerLogo = this.page.getByRole('link', { name: 'Purchasing Power' }).nth(1);
        await headerLogo.waitFor({ timeout: 10000 });
        await expect(headerLogo).toBeVisible();
        await headerLogo.click();
        await expect(this.page).toHaveURL('https://stage_tmp.purchasingpower.travel/app/Home');
        console.log('validateHeaderLogo: success');
    }

    async validatePurchasingPowerHome() {
        const headerHomeLink = this.page.getByRole('link', { name: 'Purchasing Power Home' });
        await expect(headerHomeLink).toBeVisible();
        await headerHomeLink.click();
        await expect(this.page).toHaveURL('https://s1.purchasingpower.com/store');
        console.log('validatePurchasingPowerHome: success');
    }   

    async validateHeaderMyBookings() {
        const headerMyBookingsLink = this.page.getByRole('link', { name: 'My Bookings' });
        await expect(headerMyBookingsLink).toBeVisible();
        await headerMyBookingsLink.click();
        await this.page.waitForTimeout(10000);
        await expect(this.page).toHaveURL('https://stage_tmp.purchasingpower.travel/my-bookings');
        console.log('validateHeaderMyBookings: success');
    }

    async validateCart() {
        const cartLink = this.page.getByRole('link', { name: 'Cart' });
        await expect(cartLink).toBeVisible();
        await cartLink.click();
        await expect(this.page).toHaveURL('https://stage_tmp.purchasingpower.travel/cart');
        console.log('validateCart: success');
    }
}