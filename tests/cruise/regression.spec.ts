import { test, expect } from '@playwright/test';
import { SiteLaunch } from '../../pages/common/SiteLaunch';

test('Cruise Regression', async ({ page }) => {

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    await page.pause();

    });