import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';
import { SearchPage } from '../../pages/hotel/HotelSearchPage';
import { HotelListPage } from '../../pages/hotel/HotelListPage';

test('Hotel Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    console.log('Current URL => ', page.url());

    await page.waitForTimeout(5000);


    const searchPage = new SearchPage(page);
    const selectedDestination = await searchPage.hotelSearch();
    console.log('Selected Destination => ', selectedDestination);
    // await searchPage.select_date();
    await searchPage.selectAdult();
    await searchPage.selectChild();
    await searchPage.submit();

    // await page.pause();

    const hotelListPage = new HotelListPage(page);
    await hotelListPage.verifyHotelListPage(selectedDestination);
    // const selectedHotel = await hotelListPage.selectRandomHotelAndGetName();
    // console.log('Selected Hotel => ', selectedHotel);
    // await hotelListPage.selectRandomHotelByName(selectedHotel);
    await hotelListPage.selectRandomHotel();
    await page.pause();

});