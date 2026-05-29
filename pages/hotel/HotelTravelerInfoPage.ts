import { expect, Locator, Page } from '@playwright/test';

export class hotelTravelerInfoPage {
    constructor(private page: Page) { }

    async verifyHotelInfoPage(): Promise<{ hotelName: string; roomInfo: string; addressInfo: string }> {
        // Verify that we are on the traveler info page by checking for a unique element
        const hotelInfoHeading = this.page.locator('div > div > div.custom-attractionDetailList > div.custom-attrNameField > h4');
        await expect(hotelInfoHeading).toBeVisible({ timeout: 20000 });
        const headingText = await hotelInfoHeading.innerText();
        console.log('Hotel Name => ', headingText);
    

        const roomInfo = this.page.locator('div > div > div.custom-attractionDetailList > div.custom-resortOptionField > div > span:nth-child(2)');
        await expect(roomInfo).toBeVisible({ timeout: 10000 });
        const roomInfoText = await roomInfo.innerText();
        console.log('Room Info => ', roomInfoText);


        const addressInfo = this.page.locator('div.custom-locationField > ul > li > div.MuiListItemText-root.css-1tsvksn > span');
        await expect(addressInfo).toBeVisible({ timeout: 10000 });
        const addressInfoText = await addressInfo.innerText();
        console.log('Address Info => ', addressInfoText);



        const noBrokenImage = this.page.locator('div > div > div.custom-attractionImgBox  > img');
        await expect(noBrokenImage).toHaveAttribute('src');
        const imageSrc = await noBrokenImage.first().getAttribute('src');
        console.log('Hotel Image Src => ', imageSrc);

        return { hotelName: headingText, roomInfo: roomInfoText, addressInfo: addressInfoText };
 
        
    }

    private async phone() {
         const getPhone = await this.page.getByRole('textbox', { name: '1 (702) 123-' });
        return getPhone;
    }

    async fillTravelerInfo(): Promise<void> {
        // Fill in traveler information form

        const getName = await this.page.getByRole('textbox', { name: 'First name' }).fill('Test');
        console.log('First Name Input Value => ', getName);

        // await this.page.getByRole('textbox', { name: 'First name' }).fill('Test');

        const getLastName = await this.page.getByRole('textbox', { name: 'Last name' }).fill('Test');
        console.log('Last Name Input Value => ', getLastName);
        // await this.page.getByRole('textbox', { name: 'Last name' }).fill('Test');

        const getEmail = await this.page.getByRole('textbox', { name: 'Email' }).fill('testd2496@gmail.com');
        console.log('Email Input Value => ', getEmail);

        // await this.page.getByRole('textbox', { name: 'Email' }).fill('testd2496@gmail.com');
        const phoneInput = await this.phone();
        await phoneInput.clear();
        // await phoneInput.fill('+1');
        await phoneInput.fill('+12123423433');

        // await this.page.getByRole('textbox', { name: '1 (702) 123-' }).clear().fill('2123423433');
        await this.page.getByRole('checkbox').check();
        await this.page.getByRole('button', { name: 'Add to Cart' }).click();
        // Add more fields as necessary
    }


    async verifyRedirectedToCartPage(): Promise<void> {

        await expect(this.page).toHaveURL(/.*\/cart/, { timeout: 10000 });
        console.log('Successfully redirected to cart page');
    }

}