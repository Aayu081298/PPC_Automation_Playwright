const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'https://www.purchasingpower.travel/app/Home?jwt=eyJhbGciOiJIUzUxMiJ9.eyJwYXJ0bmVyTmFtZSI6IlBQQyIsImNsaWVudElkIjoiOTAwMCIsInVzZXJGaXJzdE5hbWUiOiJTYW1pIiwidXNlckxhc3ROYW1lIjoiUnVkZHkiLCJ1c2VyRW1haWwiOiJzYW1pcnVkZHlAaG90ZWxibG94LmNvbSIsInByaWNpbmdSdWxlSWQiOiIiLCJidXNpbmVzc1J1bGVJZCI6IiIsInNwZW5kaW5nTGltaXQiOiIzNTAwLjAiLCJwYXlDeWNsZXNQZXJZZWFyIjoyNiwiY2xpZW50TG9nb1VybCI6Imh0dHBzOi8vaW1hZ2VzLnB1cmNoYXNpbmdwb3dlci5jb20vY2xpZW50cy9sb2dvcy90ZXN0X2xvZ28uanBnIiwiY2FydFBheWxvYWRVcmwiOiJodHRwczovL3d3dy5wdXJjaGFzaW5ncG93ZXIuY29tL3N0b3JlL2NhcnQ_cmVjYWxjdWxhdGU9dHJ1ZSZyZXN0b3JlQ2FydD10cnVlIiwicGFydG5lckNhcnRVcmwiOiJodHRwczovL3d3dy5wdXJjaGFzaW5ncG93ZXIuY29tL3N0b3JlL2NhcnQ_cmVjYWxjdWxhdGU9dHJ1ZSZyZXN0b3JlQ2FydD10cnVlIiwicmV0dXJuVXJsIjoiaHR0cHM6Ly93d3cucHVyY2hhc2luZ3Bvd2VyLmNvbS9zdG9yZSJ9._GnMn70i7pCih3Z05PCrwho9Qf_HiN-cLpU2-54gXlXaw2jRs11Hn7gE01ATmo-yC_uvcZifOCMZwHUeK9d_Ig';
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const currentUrl = page.url();
  const navItems = await page.$$eval('a, button, [role="tab"], [role="link"], [role="button"]', els => els.map(el => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role') || '',
    text: el.innerText.trim().replace(/\s+/g, ' ').slice(0, 100),
    href: el.getAttribute('href') || '',
    ariaSelected: el.getAttribute('aria-selected') || '',
    ariaLabel: el.getAttribute('aria-label') || '',
    outer: el.outerHTML.slice(0, 300)
  })).filter(item => /cruises?|cruise|home|cart|bookings?|hotels?|flights?|cars?|attractions?|theme parks?/i.test(item.text)));
  console.log('URL:', currentUrl);
  console.log('NAV ITEMS:', JSON.stringify(navItems, null, 2));

  const cruiseItems = await page.$$eval('*', els => els.map(el => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role') || '',
    text: el.innerText.trim().replace(/\s+/g, ' ').slice(0, 100),
    ariaLabel: el.getAttribute('aria-label') || '',
    ariaSelected: el.getAttribute('aria-selected') || '',
  })).filter(item => /cruise/i.test(item.text)).slice(0, 60));
  console.log('CRUISE TEXT ITEMS:', JSON.stringify(cruiseItems, null, 2));
  await browser.close();
})();
