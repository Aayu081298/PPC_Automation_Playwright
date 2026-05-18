import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export class SiteLaunch {

    constructor(private page: Page) {}

    async run() {

        const url = process.env.PPC_STAGE_SITE;

        console.log('ENV URL => ', url);

        if (!url) {
            throw new Error('PPC_STAGE_SITE is missing');
        }

        await this.page.goto(url);
        console.log('Website Opened');
    }
}