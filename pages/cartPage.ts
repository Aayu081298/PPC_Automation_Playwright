import { expect, Locator, Page } from '@playwright/test';
import { hotelTravelerInfoPage } from './hotel/HotelTravelerInfoPage';
export class cartPage {
    constructor(private page: Page) { }

    
    async verifyHotelOnCartPage(): Promise<void> {

        const travelerPage = new hotelTravelerInfoPage(this.page);


        const hotelInfo = await travelerPage.verifyHotelInfoPage();
        // console.log(hotelInfo.hotelName);
        console.log(hotelInfo.roomInfo);
        console.log(hotelInfo.addressInfo);
    }
}