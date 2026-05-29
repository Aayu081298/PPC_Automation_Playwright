import { expect, Locator, Page } from '@playwright/test';
import { hotelTravelerInfoPage } from './hotel/HotelTravelerInfoPage';
// import {  } from './hotel/HotelTravelerInfoPage';
export class cartPage {
    constructor(private page: Page) { }

    
    async verifyHotelSectionIsVisible(): Promise<void> {
        const hotelSectionHeading = this.page.locator(' div > div:nth-child(2) > div > div.custom-cruisesPersonDetail > div.custom-sectionTitle > h3');
        await expect(hotelSectionHeading).toBeVisible();
    }
    
    
    async verifyHotelOnCartPage(): Promise<void> {

        const travelerPage = new hotelTravelerInfoPage(this.page);


        const hotelInfo = await travelerPage.verifyHotelInfoPage();
        console.log(hotelInfo.hotelName);
        console.log(hotelInfo.roomInfo);
        console.log(hotelInfo.addressInfo);

        const hotelNameLocator = this.page.locator('div.MuiTableContainer-root.responsive-table-wrapper.custom-cbdTable.css-kge0eu > table > tbody > tr > td:nth-child(2) > span');
            console.log('Hotel Name on Cart Page => ', await hotelNameLocator.innerText());
        await expect(hotelNameLocator).toHaveText(hotelInfo.hotelName, { timeout: 10000 });

       const roomInfoLocator = this.page.locator('div.MuiTableContainer-root.responsive-table-wrapper.custom-cbdTable.css-kge0eu > table > tbody > tr > td:nth-child(3) > span');
            console.log('Room Info on Cart Page => ', await roomInfoLocator.innerText());
       await expect(roomInfoLocator).toHaveText(hotelInfo.roomInfo, { timeout: 10000 });
    }



    async verifyTravelerData(): Promise<void> {

       

        // TODO: implement traveler data verification using travelerPage
    }
}