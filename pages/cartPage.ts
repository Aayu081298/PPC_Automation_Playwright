import { expect, Locator, Page } from '@playwright/test';
import { hotelTravelerInfoPage } from './hotel/HotelTravelerInfoPage';
import { cartPageLocators } from '../locators/cartPageLocators';

export class cartPage {
    constructor(private page: Page) { }

    
    async verifyHotelOnCartPage(): Promise<void> {

        const travelerPage = new hotelTravelerInfoPage(this.page);


        const hotelInfo = await travelerPage.verifyHotelInfoPage();
        console.log('Get Hotel name from details page => ', hotelInfo.hotelName);
        // console.log(hotelInfo.roomInfo);
        console.log(hotelInfo.addressInfo);

        const hotelNameLocator = cartPageLocators.validateHotelName(this.page);
        await expect(hotelNameLocator).toBeVisible({ timeout: 10000 });
        const hotelNameOnCart = (await hotelNameLocator.innerText()).trim();
        console.log('Hotel name on cart page => ', hotelNameOnCart);
        expect(hotelNameOnCart).toContain(hotelInfo.hotelName);



    }
}