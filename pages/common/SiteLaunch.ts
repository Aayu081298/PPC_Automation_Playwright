import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export class SiteLaunch {

    constructor(private page: Page) {}

    async run(): Promise<boolean> {

        const url = process.env.PPC_STAGE_SITE;

        console.log('ENV URL => ', url);

        if (!url) {
            throw new Error('PPC_STAGE_SITE is missing');
        }

        const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        const status = response?.status();

        if (!response || status === 0 || status === 408) {
            console.log(`Network error or no response received from ${url}. status=${status}`);
            await this.page.context().browser()?.close();
            return false;
        }

        const bodyText = await this.page.locator('body').innerText();
        const pageTitle = await this.page.title();

        const errorPatterns = [
            /deployment/i,
            /service unavailable/i,
            /bad gateway/i,
            /gateway timeout/i,
            /maintenance/i,
            /temporarily unavailable/i,
            /502|503|504|500/i,
            /well,? that wasn'?t supposed to happen/i,
            /we'?ve got our best people on it/i,
            /try one of this page/i,
            /this page: Home/i
        ];

        const hasDeploymentOrServerError = errorPatterns.some((pattern) => pattern.test(bodyText));
        const hasErrorTitle = /(error|problem|unavailable|not found|service unavailable)/i.test(pageTitle);
        const hasStatusError = typeof status === 'number' && status >= 500;

        if (hasDeploymentOrServerError || hasErrorTitle || hasStatusError) {
            console.log('Deployment or server error detected. Closing browser and aborting test.');
            console.log(`Detected status=${status} on ${url}`);
            console.log(`Page title: ${pageTitle}`);
            await this.page.context().browser()?.close();
            return false;
        }

        console.log('Website Opened');
        return true;
    }
}