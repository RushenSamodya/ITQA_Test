import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect } from "@playwright/test";
import { PageFixtures } from '../../hooks/pageFixtures';

setDefaultTimeout(60 * 1000 *2);

Given('user search for a {string}', async function (book) {
    await PageFixtures.page.waitForTimeout(2000);
    await PageFixtures.page.locator("input[type='search']").fill(book);
    await PageFixtures.page.waitForTimeout(2000);
    await PageFixtures.page.locator("div#mat-autocomplete-0>mat-option>span").click();
    await PageFixtures.page.waitForTimeout(2000);
});

When('user add the book to the cart', async function () {
    await PageFixtures.page.locator("//span[normalize-space(text())='Add to Cart']").click();
    await PageFixtures.page.waitForTimeout(2000);
});

Then('the cart badge should get updated', async function () {
    await PageFixtures.page.waitForTimeout(2000);
    const cartBadgeNumber = await PageFixtures.page.locator("#mat-badge-content-0").textContent();
    await PageFixtures.page.waitForTimeout(2000);
    console.log("cartBadgeNumber " ,cartBadgeNumber);
    expect(Number(cartBadgeNumber)).toBeGreaterThan(0);
});