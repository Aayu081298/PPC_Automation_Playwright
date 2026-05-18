import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';
import { SearchPage } from '../../pages/hotel/HotelSearchPage';

test('Hotel Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    await site_run.run();

    console.log('Current URL => ', page.url());

    await page.waitForTimeout(5000);


    const searchPage = new SearchPage(page);
    searchPage.hotel_search();
    // searchPage.select_date();
    searchPage.select_adult();
    searchPage.select_child();
    searchPage.submit();




    await page.pause();
});