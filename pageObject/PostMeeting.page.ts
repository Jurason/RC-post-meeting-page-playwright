import {expect, Locator, Page} from "@playwright/test";
import { ElementPropertiesUI } from "../utils/elementData";
import {AddEditModal} from "./AddEditModal";


export class PostMeetingPage {

    //Main blocks on the page
    readonly page: Page;
    readonly header: Locator;
    readonly player: Locator;
    readonly tabs: Locator;

    readonly summaryTab: Locator;

    readonly briefSummaryContainer : Locator;
    readonly keywordsContainer : Locator;
    readonly summaryContainer : Locator;

    readonly editBriefSummaryButton : Locator;
    readonly editKeywordsButton : Locator;
    readonly editSummaryButton : Locator;

    public addEditModal : AddEditModal;


    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("div.new-post-meeting-page__header")
        this.player = page.locator("div.new-post-meeting-page__player-summary-panel")
        this.tabs = page.locator("div.post-meeting-tabs")

        this.summaryTab = page.locator("label[for='summaries']")
        //transcript
        //highlights
        //participants

        this.briefSummaryContainer = page.locator("div.summaries-container", {hasText: 'Brief'});
        this.keywordsContainer = page.locator("div.summaries-container", {hasText: 'Keywords'});
        this.summaryContainer = page.locator("div.summaries-container", {hasText: 'Summary'});

        this.editBriefSummaryButton = page.locator("div.summary-header__edit-summary").nth(0); //"button:right-of(:text('Brief'))"
        this.editKeywordsButton = page.locator("div.summary-header__edit-summary").nth(1); //"button:right-of(:text('Keywords'))"
        this.editSummaryButton = page.locator("div.summary-header__edit-summary").nth(2); //"button:right-of(:text('Summary'))"

        this.addEditModal = new AddEditModal(page)
    }


    //ELEMENTS

        //Tabs
        // public get summaryTab() {
        //     return this.page.locator("label[for='summaries']")
        // }

        // public get transcriptTab() {
        //     return this.tabs.locator("label[for='transcript']")
        // }
        //
        // public get highlightTab() {
        //     return this.tabs.locator("label[for='highlight']")
        // }
        //
        // public get participantsTab() {
        //     return this.tabs.locator("label[for='participants']")
        // }

            //Containers inside Summary Tab
            // readonly briefSummaryContainer = this.summaryTab.locator("div.summaries-container {hasText: 'Brief'}");
            // readonly keywordsContainer = this.summaryTab.locator("div.summaries-container {hasText: 'Keywords'}");
            // readonly summaryContainer = this.summaryTab.locator("div.summaries-container {hasText: 'Summary'}");

            //Elements inside Summary Tab (No material state)
            // private addSummaryButton = this.summaryTab.locator("button {hasText: 'Add summary'}");
            // private addBriefSummaryAndKeywordsButton = this.summaryTab.locator("button {hasText: 'Add brief summary and keywords'}");


                //Elements inside Summary tab containers
                // private editBriefSummaryButton = this.briefSummaryContainer.locator("div.summary-header__edit-summary").nth(0); //"button:right-of(:text('Brief'))"
                // private editKeywordsButton = this.keywordsContainer.locator("div.summary-header__edit-summary").nth(1); //"button:right-of(:text('Keywords'))"
                // private editSummaryButton = this.summaryContainer.locator("div.summary-header__edit-summary").nth(2); //"button:right-of(:text('Summary'))"

                // readonly briefSummaryContainerContent = this.briefSummaryContainer.innerText()
                // readonly keywordsContainerContent = this.keywordsContainer.locator("****")
                // readonly summaryContainerContent = this.summaryContainer.innerText()


//******************************//
    //function

    //Choose recording by keywords existing (because keywords existing means full material recording condition (isn't it?)
    public async openRecordingWithMaterial() {
        await this.page.locator("div.recording-item__cell.recording-item__cell--keywords").first().click(); //Refactor locator
        // await this.page.waitForLoadState()
    }

    public async isActiveTab(locator) {
        try {
            await expect(locator).toHaveClass("Tabs__item Tabs__item--active drag-handle");    //locator needs to be renamed //or check .isEnable method
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

    // public async openAddSummaryModal() {
    //     await this.addSummaryButton.click()
    //     await this.page.waitForLoadState()
    // }
    //
    // public async openBriefSummaryAndKeywordsModal() {
    //     await this.addBriefSummaryAndKeywordsButton.click()
    //     await this.page.waitForLoadState()
    // }

//******************************//

    //UI
    public async allTabsIsDisplayed() {
        const allTabs = await this.tabs.locator('****'); //common CSS selector for tabs
        await expect(allTabs).toHaveCount(4)
        //await expect(allTabs).toHaveText(["Summary","Highlights","Transcript","Participants"])
    }

    public async activeTabUI(tabLocator) {
        try {
            await expect(tabLocator).toHaveCSS("color", "#066FAC"); //Need to be checked via debugger
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















































