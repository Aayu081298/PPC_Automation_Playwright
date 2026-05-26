import { expect, Locator, Page } from '@playwright/test';

export class HotelDetailsPage {
    constructor(private page: Page) { }

    private bookNowButtons() {
        return this.page.getByRole('button', { name: 'Book Now' });
    }

    async chooseRoom(): Promise<void> {
        const chooseRoomButtons = this.page.getByRole('button', { name: 'Choose Room' });

        await chooseRoomButtons.first().click();



    }

    async bookRoom(): Promise<void> {
        const bookNowButton = this.bookNowButtons();
        const count = await bookNowButton.count();
        if (count === 0) {
            throw new Error('No Book Now buttons were found');
        }

        if (count === 1) {
            await bookNowButton.first().click();
            return;
        }


        // Wait until at least one button contains the text 'Book Now'

        const randomIndex = Math.floor(Math.random() * count);
        await bookNowButton.nth(randomIndex).click();

    }


    async getHotelName(): Promise<string> {
        const hotelNameLocator = this.page.getByRole('heading', { name: /.+/ }).first();
        await expect(hotelNameLocator).toBeVisible({ timeout: 10000 });
        const hotelName = (await hotelNameLocator.innerText()).trim();
        console.log('Hotel name on details page => ', hotelName);
        return hotelName;
    }
}