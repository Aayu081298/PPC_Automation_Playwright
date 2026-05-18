import { expect, Locator, Page } from '@playwright/test';

export class HotelListPage {
  constructor(private page: Page) {}

  private hotelButtons() {
    return this.page.getByRole('button', { name: 'Select Hotel' });
  }

  async verifyHotelListPage(expectedDestination: string) {
    const heading = this.page
      .getByRole('heading')
      .filter({ hasText: expectedDestination });

    await expect(heading.first()).toBeVisible();
  }

  private async getHotelNameFromButton(button: Locator): Promise<string> {
    const hotelContainer = button.locator('xpath=ancestor::*[.//h1 or .//h2 or .//h3 or .//h4][1]');
    const title = hotelContainer.locator('xpath=.//h1|.//h2|.//h3|.//h4').first();
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
