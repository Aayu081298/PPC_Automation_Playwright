import { expect, Locator, Page } from '@playwright/test';
import { hotelDetailsPageLocators } from '../../locators/hotel/HotelDetailsPageLocators';

export class HotelDetailsPage {
    constructor(private page: Page) { }

    private bookNowButtons(): Locator {
        return hotelDetailsPageLocators.bookNowButtons(this.page);
    }

    async chooseRoom(): Promise<void> {
        const chooseRoomButtons = hotelDetailsPageLocators.chooseRoomButtons(this.page);

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
        const hotelNameLocator = hotelDetailsPageLocators.hotelNameHeading(this.page);
        await expect(hotelNameLocator).toBeVisible({ timeout: 10000 });
        const hotelName = (await hotelNameLocator.innerText()).trim();
        console.log('Hotel name on details page => ', hotelName);
        return hotelName;
    }
}