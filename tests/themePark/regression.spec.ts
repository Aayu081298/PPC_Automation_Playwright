
import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';
import { ThemeParkSearchPage } from '../../pages/themePark/ThemeParkSearchPage';
import { ThemeParkListPage } from '../../pages/themePark/ThemeParkListPage';


test('Theme Park Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    console.log('Current URL => ', page.url());


    const themeParkSearchPage = new ThemeParkSearchPage(page);
    const themeParkListPage = new ThemeParkListPage(page);
    await themeParkSearchPage.switchToThemeParkPage();

    const currentURL = page.url();
    const expectedURL = 'https://www.purchasingpower.travel/?page=theme_park';
    expect(currentURL).toBe(expectedURL);

    await themeParkSearchPage.searchThemeParks();
    await themeParkListPage.selectThemePark();


    await page.pause();
});