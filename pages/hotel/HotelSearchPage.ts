import { Page } from '@playwright/test';

export class SearchPage {
  private readonly destinationList = ['Miami', 'Orlando', 'New York'];

  constructor(private page: Page) {}

  async hotelSearch(): Promise<string> {
    const randomDestination = this.destinationList[
      Math.floor(Math.random() * this.destinationList.length)
    ];

    const destinationInput = this.page.getByRole('combobox', {
      name: 'Where are you going?'
    });
    await destinationInput.fill(randomDestination, { timeout: 10000 });

    const firstSuggestion = this.page.getByRole('option').first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 });

    const selectedDestination = (await firstSuggestion.textContent())?.trim() || randomDestination;
    await firstSuggestion.click();

    console.log('Selected Destination => ', selectedDestination);
    return selectedDestination;
  }

  private async selectVisibleOption(optionLabel: string) {
    await this.page
      .getByRole('listbox')
      .getByRole('option', { name: optionLabel, exact: true })
      .click();
  }

  async selectAdult() {
    await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).first().click();

    const randomAdult = Math.floor(Math.random() * 5) + 1;
    console.log('Selected Adults => ', randomAdult);

    await this.selectVisibleOption(`${randomAdult}`);
  }

  async selectChild() {
    await this.page.getByRole('button', { name: '0', exact: true }).first().click();
    await this.page.getByRole('button').nth(1).dblclick();

    const firstChildAge = Math.floor(Math.random() * 17) + 1;
    console.log('Selected First Child Age => ', firstChildAge);
    await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).first().click();
    await this.selectVisibleOption(`${firstChildAge}`);

    const secondChildAge = Math.floor(Math.random() * 17) + 1;
    console.log('Selected Second Child Age => ', secondChildAge);
    await this.page.getByRole('combobox', { name: 'Adults (Age 18+)' }).nth(1).click();
    await this.selectVisibleOption(`${secondChildAge}`);

    await this.page.getByRole('button', { name: 'Apply' }).first().click();
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Find Hotels' }).first().click();
  }
}
