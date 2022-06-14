import {expect, Locator, Page} from "@playwright/test";
import { ElementPropertiesUI } from "../utils/elementData";
import {AddEditModal} from "./AddEditModal";


export class PostMeetingPage {

    //Main blocks on the page
    readonly page: Page;
    readonly header: Locator;
    readonly player: Locator;
    readonly tabs: Locator;

    public addEditModal : AddEditModal;


    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("div.new-post-meeting-page__header")
        this.player = page.locator("div.new-post-meeting-page__player-summary-panel")
        this.tabs = page.locator("div.post-meeting-tabs")

        this.addEditModal = new AddEditModal(page)
    }


    //ELEMENTS

        //Tabs
        public get summaryTab() {
            return this.tabs.locator("*****")
        }

        public get transcriptTab() {
            return this.tabs.locator("*****")
        }

        public get highlightTab() {
            return this.tabs.locator("*****")
        }

        public get participantsTab() {
            return this.tabs.locator("*****")
        }

            //Containers inside Summary Tab
            readonly briefSummaryContainer = this.summaryTab.locator("****");
            readonly keywordsContainer = this.summaryTab.locator("****");
            readonly summaryContainer = this.summaryTab.locator("****");

            //Elements inside Summary Tab (No material state)
            private addSummaryButton = this.summaryTab.locator("****");
            private addBriefSummaryAndKeywordsButton = this.summaryTab.locator("****");


                //Elements inside Summary tab containers
                private editBriefSummaryButton = this.briefSummaryContainer.locator("****");    //right-of
                private editKeywordsButton = this.keywordsContainer.locator("****");        //right-of
                private editSummaryButton = this.summaryContainer.locator("****");      //right-of

                readonly briefSummaryContainerContent = this.briefSummaryContainer.locator("****")
                readonly keywordsContainerContent = this.keywordsContainer.locator("****")
                readonly summaryContainerContent = this.summaryContainer.locator("****")


//******************************//
    //function

    //Choose recording by keywords existing (because keywords existing means full material recording condition (isn't it?)
    public async openRecordingWithMaterial() {
        await this.page.locator("div.recording-item__cell.recording-item__cell--keywords").first().click(); //Refactor locator
        await this.page.waitForNavigation()
    }

    public async isActiveTab(locator) {
        try {
            await expect(locator).toHaveClass(/active/);    //locator needs to be renamed //or check .isEnable method
            return console.log("Tab is active")
        } catch (e) {
            return console.log("Tab is disable, but should be active")
        }
    }

    public async openEditBriefModal() {
        await this.editBriefSummaryButton.click()
        await this.page.waitForLoadState()
    }

    public async openEditKeywordsModal() {
        await this.editKeywordsButton.click()
        await this.page.waitForLoadState()
    }

    public async openEditSummaryModal() {
        await this.editSummaryButton.click()
        await this.page.waitForLoadState()
    }

    public async openAddSummaryModal() {
        await this.addSummaryButton.click()
        await this.page.waitForLoadState()
    }

    public async openBriefSummaryAndKeywordsModal() {
        await this.addBriefSummaryAndKeywordsButton.click()
        await this.page.waitForLoadState()
    }

//******************************//

    //UI
    public async allTabsIsDisplayed() {
        const allTabs = await this.tabs.locator('****'); //common CSS selector for tabs
        await expect(allTabs).toHaveCount(4)
    }

    public async activeTabUI(tabLocator: Locator, CSS, value) {
        try {
            await expect(tabLocator).toHaveCSS(CSS, value);
            return console.log("Tab UI check is pass")
        } catch (e) {
            return console.log("Tab UI check is fail")
        }
    }



    // public get briefSummaryContainer() {
    //     return this.summaryTab.locator("*****")
    // }
    //
    // public get keywordsContainer() {
    //     return this.summaryTab.locator("*****")
    // }
    //
    // public get summaryContainer() {
    //     return this.summaryTab.locator("*****")
    // }



    // public get editBriefSummaryButton() {
    //     return this.briefSummaryContainer.locator("*****")
    // }
    //
    // public get editKeywordsButton() {
    //     return this.keywordsContainer.locator("*****")
    // }
    //
    // public get editSummaryButton() {
    //     return this.summaryContainer.locator("*****")
    // }
    //
    //
    // public get copyButton(containerName : Locator) {
    //     return containerName.
    // }















    // public async getElementName(){
    //
    //     // return await this.tabs.locator().getAttribute("textContent")
    // }
    //
    // async getElementProperties(locatorName: Locator): Promise<ElementPropertiesUI> {
    //     const elementProperties = new ElementPropertiesUI()
    //
    //     elementProperties.name = await this.getElementName()
    //
    //     return elementProperties
    // }



    


    //functions
    // public get header() {
    //     return this.page.locator("div.new-post-meeting-page__header")
    // }
    // public get player() {
    //     return this.page.locator("div.new-post-meeting-page__player-summary-panel")
    // }
    // public get tabs() {
    //     return this.page.locator("div.post-meeting-tabs")
    // }


    //Describe page's frames

}















































