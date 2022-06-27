// import {Page} from "@playwright/test";
import loginData from "../utils/login-data.js";

export class LoginPage {

    // let page;
    constructor(page) {
        this.page = page;
    }

//it could be changed by API request, POST credential directly to server without UI clicking
    async login() {
        await this.page.goto(loginData.urlDemoServer)
        await this.page.locator("#signin-btn").click()
        await this.page.locator("input#credential").fill(loginData.username)
        await this.page.locator("input#credential").press('Enter');
        await this.page.locator("input#password").fill(loginData.password)
        await this.page.locator("input#password").press('Enter');
        await this.page.locator("button.btn.btn-primary").click()
        await this.page.locator("button.btn.btn-primary").click()
    }
}
