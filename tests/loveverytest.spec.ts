import { BrowserContext, chromium, test, expect } from '@playwright/test';

test('Lovevery basic test', async ({ page }) => {
    let browser = await chromium.launch({ headless: false, slowMo: 50 });
    // await browser.newContext(httpCredentials: 'devtest+automation@lovevery.com', 'test@1234');
    let browserContext = await browser.newContext();
	page = await browserContext.newPage();
    await page.goto('')
});