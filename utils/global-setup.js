import {chromium} from '@playwright/test';
import {LoginPage} from "../pageObject/Login.page.js";

async function globalSetup(config) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const login = new LoginPage(page)
    await login.login()
    await page.context().storageState({ path: storageState });
    await browser.close();
}

export default globalSetup;

