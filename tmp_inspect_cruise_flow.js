const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'https://www.purchasingpower.travel/app/Home?jwt=eyJhbGciOiJIUzUxMiJ9.eyJwYXl0bmVyTmFtZSI6IlBQQyIsImNsaWVudElkIjoiOTAwMCIsInVzZXJGaXJzdE5hbWUiOiJTYW1pIiwidXNlckxhc3ROYW1lIjoiUnVkZHkiLCJ1c2VyRW1haWwiOiJzYW1pcnVkZHlAaG90ZWxibG94LmNvbSIsInByaWNpbmdSdWxlSWQiOiIiLCJidXNpbmVzc1J1bGVJZCI6IiIsInNwZW5kaW5nTGltaXQiOiIzNTAwLjAiLCJwYXlDeWNsZXNQZXJZZWFyIjoyNiwiY2xpZW50TG9nb1VybCI6Imh0dHBzOi8vaW1hZ2VzLnB1cmNoYXNpbmdwb3dlci5jb20vY2xpZW50cy9sb2dvcy90ZXN0X2xvZ28uanBnIiwiY2FydFBheWxvYWRVcmwiOiJodHRwczovL3d3dy5wdXJjaGFzaW5ncG93ZXIuY29tL3N0b3JlL2NhcnQ_cmVjYWxjdWxhdGU9dHJ1ZSZyZXN0b3JlQ2FydD10cnVlIiwicGFydG5lckNhcnRVcmwiOiJodHRwczovL3d3dy5wdXJjaGFzaW5ncG93ZXIuY29tL3N0b3JlL2NhcnQ_cmVjYWxjdWxhdGU9dHJ1ZSZyZXN0b3JlQ2FydD10cnVlIiwicmV0dXJuVXJsIjoiaHR0cHM6Ly93d3cucHVyY2hhc2luZ3Bvd2VyLmNvbS9zdG9yZSJ9._GnMn70i7pCih3Z05PCrwho9Qf_HiN-cLpU2-54gXlXaw2jRs11Hn7gE01ATmo-yC_uvcZifOCMZwHUeK9d_Ig';

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('home page url', page.url());
  const cruiseTab = await page.$('button[role="tab"]:has-text("Cruises")');
  if (cruiseTab) {
    console.log('found cruise tab role button');
    await cruiseTab.click();
  } else {
    const cruiseLink = await page.$('a:has-text("Cruises")');
    console.log('found cruise link', !!cruiseLink);
    if (cruiseLink) await cruiseLink.click();
  }
  await page.waitForTimeout(3000);
  console.log('after cruise click url', page.url());

  const findButton = await page.$('button:has-text("Find Cruises")');
  console.log('find cruises button exists', !!findButton);
  if (!findButton) {
    const text = await page.locator('body').innerText();
    console.log('body text after cruise click', text.slice(0, 2000));
    await browser.close();
    return;
  }

  const goingToDropdown = await page.$('input[aria-label="Going to Departing Port"], [role="combobox"]:has-text("Going to Departing Port")');
  console.log('goingToDropdown', !!goingToDropdown);
  if (goingToDropdown) {
    await goingToDropdown.fill('Caribbean');
    await page.waitForTimeout(500);
    const firstOption = await page.$('li[id^="combo-box-demo-option-"]');
    if (firstOption) await firstOption.click();
  }

  const monthSelect = await page.$('#demo-simple-select-5');
  console.log('monthSelect', !!monthSelect);
  if (monthSelect) {
    await monthSelect.click();
    await page.waitForTimeout(500);
    const option = await page.$('ul.MuiList-root li');
    if (option) await option.click();
  }

  const cruiseLineSelect = await page.$('text=Cruse Line|text=Cruise Line|text=Cruise Line (Any)');
  console.log('cruiseLineSelect', !!cruiseLineSelect);
  if (cruiseLineSelect) {
    await cruiseLineSelect.click();
    await page.waitForTimeout(500);
    const firstOption = await page.$('[role="option"]');
    if (firstOption) await firstOption.click();
  }

  const travelerSelect = await page.$('#demo-simple-select-8');
  console.log('travelerSelect', !!travelerSelect);
  if (travelerSelect) {
    await travelerSelect.click();
    await page.waitForTimeout(500);
    const travelerOption = await page.$('[role="option"]');
    if (travelerOption) await travelerOption.click();
  }

  await page.waitForTimeout(500);
  await findButton.click();
  await page.waitForTimeout(4000);
  console.log('after search url', page.url());
  const viewDetailsCount = await page.$$eval('button:has-text("View Detail"), [role="button"]:has-text("View Detail")', els => els.length);
  console.log('view details count', viewDetailsCount);
  if (viewDetailsCount === 0) {
    console.log('page body', (await page.locator('body').innerText()).slice(0, 2000));
    await browser.close();
    return;
  }
  const viewDetail = await page.$('button:has-text("View Detail"), [role="button"]:has-text("View Detail")');
  await Promise.all([
    page.waitForTimeout(5000),
    viewDetail.click(),
  ]);
  await page.waitForTimeout(5000);
  console.log('after detail click url', page.url());
  const bodyText = await page.locator('body').innerText();
  console.log('details body start', bodyText.slice(0, 2000));
  const interesting = await page.$$eval('*', els => els.map(el => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role') || '',
    text: el.innerText.trim().replace(/\s+/g, ' ').slice(0, 120),
    ariaLabel: el.getAttribute('aria-label') || '',
    ariaSelected: el.getAttribute('aria-selected') || ''
  })).filter(item => /outside|balcony|inside|suite|stateroom|select a stateroom|cruise details/i.test(item.text)).slice(0, 80));
  console.log('interesting items', JSON.stringify(interesting, null, 2));
  await browser.close();
})();
