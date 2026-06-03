import { expect, Locator, Page } from '@playwright/test';
import { hotelTravelerInfoPageLocators } from '../../locators/hotel/HotelTravelerInfoPageLocators';

export class hotelTravelerInfoPage {
    constructor(private page: Page) { }

    async verifyHotelInfoPage(): Promise<{ hotelName: string; roomInfo: string; addressInfo: string }> {
        // Verify that we are on the traveler info page by checking for a unique element
        const hotelInfoHeading = hotelTravelerInfoPageLocators.hotelInfoHeading(this.page);
        await expect(hotelInfoHeading).toBeVisible({ timeout: 10000 });
        const headingText = await hotelInfoHeading.innerText();
        console.log('Hotel Name => ', headingText);
    

        const roomInfo = hotelTravelerInfoPageLocators.roomInfo(this.page);
        await expect(roomInfo).toBeVisible({ timeout: 10000 });
        const roomInfoText = await roomInfo.innerText();
        console.log('Room Info => ', roomInfoText);


        const addressInfo = hotelTravelerInfoPageLocators.addressInfo(this.page);
        await expect(addressInfo).toBeVisible({ timeout: 10000 });
        const addressInfoText = await addressInfo.innerText();
        console.log('Address Info => ', addressInfoText);



        const noBrokenImage = hotelTravelerInfoPageLocators.hotelImage(this.page);
        await expect(noBrokenImage).toHaveAttribute('src');
        const imageSrc = await noBrokenImage.first().getAttribute('src');
        console.log('Hotel Image Src => ', imageSrc);

        return { hotelName: headingText, roomInfo: roomInfoText, addressInfo: addressInfoText };
 
        
    }

    private phone(): Locator {
        return hotelTravelerInfoPageLocators.phoneInput(this.page);
    }

    async fillTravelerInfo(): Promise<void> {
        // Fill in traveler information form
        await hotelTravelerInfoPageLocators.firstNameInput(this.page).fill('Test');
        await hotelTravelerInfoPageLocators.lastNameInput(this.page).fill('Test');
        await hotelTravelerInfoPageLocators.emailInput(this.page).fill('testd2496@gmail.com');
        const phoneInput = this.phone();
        await phoneInput.clear();
        await phoneInput.fill('+12123423433');

        await hotelTravelerInfoPageLocators.termsCheckbox(this.page).check();
        await hotelTravelerInfoPageLocators.addToCartButton(this.page).click();
        // Add more fields as necessary
    }


    async verifyRedirectedToCartPage(): Promise<void> {

        await expect(this.page).toHaveURL(/.*\/cart/, { timeout: 10000 });
        console.log('Successfully redirected to cart page');
    }

}