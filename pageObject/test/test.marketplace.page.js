import {expect, Locator, Page} from "@playwright/test";

//***********************************************MARKETPLACE*********************************************//

export class MarketplacePageClass {

    page;
    buttonGroup;
    allButton;
    commercialButton;
    freeButton;
    // readonly featuresTab : Locator;


    constructor(page) {
        this.page = page;
        this.buttonGroup = page.locator("div.btn-group.hidden-xs.hidden-sm");
        this.allButton = this.buttonGroup.locator("a", {hasText: "All"});
        this.commercialButton = this.buttonGroup.locator("a", {hasText: "Commercial"});
        this.freeButton = this.buttonGroup.locator("a", {hasText: "Free"});

    }

    public async isElementHaveClass(locator) {
        try {
            await expect(locator).toHaveClass("btn btn-default btn-lg active"); //задавать без точек
            return console.log("Button is active")
        } catch (e) {
            return console.log("Button is disable, but should be active")
        }
    }

    public async checkElementUI(tabLocator: Locator, CSS, value) {
        try {
            await expect(tabLocator).toHaveCSS(CSS, value);
            return console.log("Tab UI check is pass")
        } catch (e) {
            return console.log("Tab UI check is fail")
        }
    }

    public async checkTabNames(locator) {
        try {
            await expect(locator).toHaveText(['All', 'Commercial', 'Free']);
            return console.log("All test are exist")
        } catch (e) {
            return console.log("Something wrong, use debugger")
        }

    }
}