import { expect, test } from '@playwright/test';
import { SiteLaunch } from '../pages/common/SiteLaunch';
import { ValidateHeader } from '../pages/common/Header';

test('Validate Header', async ({ page }) => {
    const validateHeader = new ValidateHeader(page);
    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    console.log('Current URL => ', page.url());

    await page.waitForTimeout(5000);

    await validateHeader.validateHeaderLogo();
    await validateHeader.validateHeaderMyBookings();
    await validateHeader.validateCart();
    await validateHeader.validatePurchasingPowerHome();

     console.log('Header validation completed.');
    // await page.pause();
});