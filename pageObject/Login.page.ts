import {Page} from "@playwright/test";
import * as loginData from "../utils/loginData.json";

export class LoginPage {

    private page : Page;
    constructor(page: Page) {
        this.page = page;
    }

    //permissions
    // public async permissions(){
    //     this.page.context().grantPermissions(['camera', 'microphone'])
    // }

    //functions
    public async open(){
        await this.page.goto(loginData.url)
    }

//it can be changed by API request, POST credential directly to server without UI clicking
    public async login() {
        await this.page.locator("#signin-btn").click()
        await this.page.locator("input#credential").fill(loginData.username)
        await this.page.locator("input#credential").press('Enter');
        await this.page.locator("input#password").fill(loginData.password)
        await this.page.locator("input#password").press('Enter');
        await this.page.locator("button.btn.btn-primary").click()
        await this.page.locator("button.btn.btn-primary").click()

    }
}
