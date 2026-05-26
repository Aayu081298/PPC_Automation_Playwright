import { Page } from '@playwright/test';
// Provide a minimal ambient declaration for `process.env` to satisfy TypeScript
// when Node types (@types/node) are not installed.
declare const process: {
  env: { [key: string]: string | undefined };
};

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
    
    // Wait for element to be visible before interacting
    await destinationInput.waitFor({ state: 'visible', timeout: 15000 });
    
    // Click to focus the field first
    await destinationInput.click({ timeout: 10000 });
    
    // Clear any existing text and fill with new destination
    await destinationInput.clear();
    await destinationInput.fill(randomDestination, { timeout: 10000 });

    const firstSuggestion = this.page.getByRole('option').first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 });

    const selectedDestination = (await firstSuggestion.textContent())?.trim() || randomDestination;
    await firstSuggestion.click();

    console.log('Selected Destination from search page => ', selectedDestination);
    return selectedDestination;
  }

  private getBaseUrl(): string {
    const siteEnv = process.env.PPC_SITE_ENV?.toLowerCase() || 'stage';
    return siteEnv === 'prod' || siteEnv === 'production'
      ? process.env.PPC_PROD_SITE || process.env.PPC_STAGE_SITE || ''
      : process.env.PPC_STAGE_SITE || '';
  }

  private async returnToHome(): Promise<void> {
    const url = this.getBaseUrl();
    if (!url) {
      throw new Error('PPC_STAGE_SITE or PPC_PROD_SITE is missing');
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(5000);
  }

  async hotelSearchWithRetry(maxAttempts = 3): Promise<string> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const selectedDestination = await this.hotelSearch();
      await this.selectAdult();
      await this.selectChild();
      await this.submit();
      await this.page.waitForTimeout(5000);

      const noResults = await this.page.locator('text=Sorry, No hotels found for this search.').count();
      if (noResults === 0) {
        console.log(`hotelSearchWithRetry: results found on attempt ${attempt}`);
        return selectedDestination;
      }

      console.log(`hotelSearchWithRetry: no hotels found on attempt ${attempt}. Retrying...`);
      if (attempt < maxAttempts) {
        await this.returnToHome();
      }
    }

    throw new Error('Sorry, No hotels found for this search after multiple attempts.');
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
