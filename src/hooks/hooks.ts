import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { PageFixtures } from './pageFixtures';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../util/logger';
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({pickle}) {
    const scenarioName = pickle.name+pickle.id;
    context = await browser.newContext({
        recordVideo: { 
            dir: `./test-result/videos/${scenarioName}` 
        },
        // viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    PageFixtures.page = page;
    PageFixtures.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    let videoPath = "";
    // Take a screenshot after each scenario
    console.log("result.status", result.status);
    if (result.status === Status.FAILED) {
        const img = await PageFixtures.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
        await this.attach(img, "image/png");
        videoPath = await PageFixtures.page.video().path();
        await this.attach(
            fs.readFileSync(videoPath),
            "video/mp4");
    }
    
    await PageFixtures.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
    PageFixtures.logger.close();
});