import { expect, test } from '@playwright/test';
import { ValidateFooter } from '../pages/common/Footer';
import { SiteLaunch } from '../pages/common/SiteLaunch';
import { addAbortListener } from 'node:events';

test('Validate Footer', async ({ page }) => {
    const validateFooter = new ValidateFooter(page);

    const site_run = new SiteLaunch(page);

    const siteIsReady = await site_run.run();
    if (!siteIsReady) {
        console.log('Test stopped because deployment/server error was detected.');
        return;
    }

    console.log('Current URL => ', page.url());

    await page.waitForTimeout(5000);

    await validateFooter.validatePrivacyPolicyLink();
    await validateFooter.validateTermsAndConditionsLink();
    await validateFooter.validateFaqSLink();
    await validateFooter.validatePurchasingPowerLink();

     console.log('Footer validation completed.');
    // await page.pause();

})