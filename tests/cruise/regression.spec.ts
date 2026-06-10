import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';
import { CruiseSearchPage } from '../../pages/cruise/cruiseSearchPage';
import { CruiseListPage } from '../../pages/cruise/cruiseListPage';
import { CruiseDetailsPage } from '../../pages/cruise/cruiseDetailsPage';

test('Cruise Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    await page.waitForTimeout(5000);

    const cruiseSearchPage = new CruiseSearchPage(page);
    await cruiseSearchPage.switchToCruisePage();

    await cruiseSearchPage.searchCruises();


    const cruiseListPage = new CruiseListPage(page);
    
    await cruiseListPage.selectRandomCruise();

    const cruiseDetailsPage = new CruiseDetailsPage(page);
    await cruiseDetailsPage.verifyCruiseDetails();

    await page.pause();
    


});