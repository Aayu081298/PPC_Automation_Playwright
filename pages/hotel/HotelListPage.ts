import { expect, Locator, Page } from '@playwright/test';
import { hotelListPageLocators } from '../../locators/hotel/HotelListPageLocators';

export class HotelListPage {
  constructor(private page: Page) {}

  private hotelButtons(): Locator {
    return hotelListPageLocators.selectHotelButtons(this.page);
  }

  async verifyHotelListPage(expectedDestination: string, p0?: { timeout: number; }) {
    // Extract city and state from destination (e.g., "Miami, Florida" from "Miami, Florida, United States of America")
    const parts = expectedDestination.split(',').map(p => p.trim());
    const cityAndState = parts.slice(0, 2).join(', '); // Get city and state only
    
    // Match heading that contains at least city and state
    const heading = hotelListPageLocators.hotelListHeading(this.page, cityAndState);
    console.log('Verifying hotel list page for destination => ', expectedDestination);
    console.log('Looking for heading containing => ', cityAndState);
    // console.log('Heading count => ', await heading.count());
    await expect(heading).toBeVisible({ timeout: p0?.timeout || 10000 });
    console.log('Searched destination is visible on hotel list page => ', await heading.innerText());
  }

  private async getHotelNameFromButton(button: Locator): Promise<string> {
    const hotelContainer = hotelListPageLocators.hotelContainerFromButton(button);
    const title = hotelListPageLocators.hotelTitleHeading(hotelContainer);
    return (await title.innerText()).trim();
  }

  async selectRandomHotelAndGetName(): Promise<string> {
    const hotelButtons = this.hotelButtons();
    const count = await hotelButtons.count();
    if (count === 0) {
      throw new Error('No Select Hotel buttons were found');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const button = hotelButtons.nth(randomIndex);
    const hotelName = await this.getHotelNameFromButton(button);
    await button.click();
    return hotelName;
  }

  async selectHotelByName(hotelName: string): Promise<void> {
    const hotelButtons = this.hotelButtons().filter({ hasText: hotelName });
    const count = await hotelButtons.count();
    if (count === 0) {
      throw new Error(`No hotels found with name: ${hotelName}`);
    }

    await hotelButtons.first().click();
  }

  async selectRandomHotelByName(hotelName: string): Promise<void> {
    await this.selectHotelByName(hotelName);
  }

  async selectRandomHotel(): Promise<void> {
    const hotelButtons = this.hotelButtons();
    const count = await hotelButtons.count();
    if (count === 0) {
      throw new Error('No Select Hotel buttons were found');
    }

    const randomIndex = Math.floor(Math.random() * count);
    await hotelButtons.nth(randomIndex).click();
  }

  
}
