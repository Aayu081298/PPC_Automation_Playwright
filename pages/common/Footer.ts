import { Locator, Page, expect } from '@playwright/test';

export class ValidateFooter {

    constructor(private page: Page) { }

    private getFooterLinkPaths() {
        // const siteEnv = process.env.PPC_SITE_ENV?.toLowerCase() || 'stage';

        // if (siteEnv === 'prod' || siteEnv === 'production') {
        //     return {
        //         privacy: process.env.PPC_FOOTER_PRIVACY_LINK || '/links/page/prod-privacy-path/',
        //         terms: process.env.PPC_FOOTER_TERMS_LINK || '/links/page/prod-terms-path/',
        //         faqs: process.env.PPC_FOOTER_FAQS_LINK || '/links/page/prod-faqs-path/',
        //         purchasingPower: process.env.PPC_FOOTER_PURCHASING_POWER_LINK || 'https://s1.purchasingpower.com/store',
        //     };
        // }

        return {
            privacy: process.env.PPC_FOOTER_PRIVACY_LINK || 'https://stage_tmp.purchasingpower.travel/links/page/0d6e713a-6950-4ee1-882a-bd2d31e84494',
            terms: process.env.PPC_FOOTER_TERMS_LINK || 'https://stage_tmp.purchasingpower.travel/links/page/30a7f912-574b-4607-b8bf-0ce661cef899',
            faqs: process.env.PPC_FOOTER_FAQS_LINK || 'https://stage_tmp.purchasingpower.travel/links/page/61c4d2da-e7cc-4ca8-9ad8-b47d3b5d4cd1',
            purchasingPower: process.env.PPC_FOOTER_PURCHASING_POWER_LINK || 'https://s1.purchasingpower.com/store',
        };
    }

    private async clickFooterLink(link: Locator) {
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeVisible();
        await link.click();
    }

    // validate privacy policy link in footer
    async validatePrivacyPolicyLink() {
        const { privacy } = this.getFooterLinkPaths();
        const privacyLink = this.page.getByRole('link', { name: 'Privacy Policy' }).first();
        await this.clickFooterLink(privacyLink);
        await expect(this.page).toHaveURL(privacy);
        console.log('validatePrivacyPolicyLink: success');
    }

    async validateTermsAndConditionsLink() {
        const { terms } = this.getFooterLinkPaths();
        const termsLink = this.page.getByRole('link', { name: 'Terms and Conditions' }).first();
        await this.clickFooterLink(termsLink);
        await expect(this.page).toHaveURL(terms);
        console.log('validateTermsAndConditionsLink: success');
    }

    async validateFaqSLink() {
        const { faqs } = this.getFooterLinkPaths();
        const faqsLink = this.page.getByRole('link', { name: 'FAQs' }).first();
        await this.clickFooterLink(faqsLink);
        await expect(this.page).toHaveURL(faqs);
        console.log('validateFaqSLink: success');
    }

    async validatePurchasingPowerLink() {
        const { purchasingPower } = this.getFooterLinkPaths();
        const purchasingPowerLink = this.page.getByText('Purchasing Power', { exact: true }).first();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            purchasingPowerLink.click()
        ]);

        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(purchasingPower);
        console.log('validatePurchasingPowerLink: success');
    }
}