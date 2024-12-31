import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { PageFixtures } from './pageFixtures';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    PageFixtures.page = page;
});

After(async function ({ pickle, result }) {
    // Take a screenshot after each scenario
    console.log("result.status", result.status);
    if (result.status === Status.FAILED) {
        const img = await PageFixtures.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
        await this.attach(img, "image/png");
    }

    await PageFixtures.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});