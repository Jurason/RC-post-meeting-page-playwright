import {expect, Locator, Page} from "@playwright/test";

export class TestClass {

    page : Page;
    header : Locator;
    featuresTab : Locator;


    constructor(page) {
        this.page = page;
        this.header = page.locator("div.container", {has: page.locator("div.navbar-header")});
        this.featuresTab = this.header.locator("a", {hasText: "Features"})
    }
}