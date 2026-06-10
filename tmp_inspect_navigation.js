const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = 'https://www.purchasingpower.travel/app/Home?jwt=eyJhbGciOiJIUzUxMiJ9.eyJhbGciOiJIUzUxMiJ9';
  await page.goto(url, { waitUntil: 'networkidle' });
  const items = await page.$$eval('[role=tab],[role=button],a,button', els => els.map(el => ({
    role: el.getAttribute('role') || el.tagName.toLowerCase(),
    text: el.innerText.trim().slice(0, 120),
    href: el.getAttribute('href') || '',
    ariaSelected: el.getAttribute('aria-selected') || '',
    ariaLabel: el.getAttribute('aria-label') || ''
  })).filter(item => item.text.length));
  console.log(JSON.stringify(items.slice(0, 120), null, 2));
  await browser.close();
})();
