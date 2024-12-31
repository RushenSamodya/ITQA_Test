import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from "@playwright/test";
import { PageFixtures } from '../../hooks/pageFixtures';

setDefaultTimeout(60 * 1000 *2);

Given('User navigates to the application', async function () {
    await PageFixtures.page.goto(process.env.BASEURL);
});

Given('User click on the login link', async function () {
    await PageFixtures.page.locator("(//span[text()=' Login ']/following-sibling::span)[2]").click();
});


Given('User enter the username as {string}', async function (username) {
    await PageFixtures.page.locator("//input[@formcontrolname='username']").fill(username);
});

Given('User enter the password as {string}', async function (password) {
    await PageFixtures.page.locator("//input[@placeholder='Password']").fill(password);
});


When('User click on the login button', async function () {
    await PageFixtures.page.locator("(//span[text()='Login']/following-sibling::span)[2]").click();
});

Then('Login should be success', async function () {
    const text = await PageFixtures.page.locator("//span[normalize-space(text())='ortoni11']").textContent();
});

When('Login should fail', async function () {
    const failureMessage = PageFixtures.page.locator("mat-error[aria-atomic='true']");
    await expect(failureMessage).toBeVisible();
});