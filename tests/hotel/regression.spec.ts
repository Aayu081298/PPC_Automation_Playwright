import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';
import { SearchPage } from '../../pages/hotel/HotelSearchPage';
import { HotelListPage } from '../../pages/hotel/HotelListPage';
import { HotelDetailsPage } from '../../pages/hotel/HotelDetailsPage';
import { hotelTravelerInfoPage } from '../../pages/hotel/HotelTravelerInfoPage';
import { cartPage } from '../../pages/cartPage';

test('Hotel Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    console.log('Current URL => ', page.url());

    const searchPage = new SearchPage(page);
    const selectedDestination = await searchPage.hotelSearchWithRetry(3);
    console.log('Selected Destination => ', selectedDestination);

    const hotelListPage = new HotelListPage(page);
    await hotelListPage.verifyHotelListPage(selectedDestination, { timeout: 10000 });
   
    // const selectedHotel = await hotelListPage.selectRandomHotelAndGetName();
    // console.log('Selected Hotel => ', selectedHotel);
    // await hotelListPage.selectRandomHotelByName(selectedHotel);
    await hotelListPage.selectRandomHotel();

    const hotelDetailsPage = new HotelDetailsPage(page);
    // const hotelNameOnDetailsPage = await hotelDetailsPage.getHotelName();
    await hotelDetailsPage.chooseRoom();
    await hotelDetailsPage.bookRoom();
    // console.log('Hotel name on details page => ', hotelNameOnDetailsPage);

    const hotelTravelerInfo = new hotelTravelerInfoPage(page);
    await hotelTravelerInfo.verifyHotelInfoPage();
    await hotelTravelerInfo.fillTravelerInfo();
    await hotelTravelerInfo.verifyRedirectedToCartPage();
    
    const cart = new cartPage(page);
    await cart.verifyHotelOnCartPage();
     await page.pause();

    

});