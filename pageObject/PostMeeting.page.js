import {AddEditModal} from "./AddEditModal.js";
import { expect } from "@playwright/test";


export class PostMeetingPage {


    constructor(page) {
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

        this.editBriefSummaryButton = page.locator("div.summary-header__edit-summary").nth(0);
        this.editKeywordsButton = page.locator("div.summary-header__edit-summary").nth(1);
        this.editSummaryButton = page.locator("div.summary-header__edit-summary").nth(2);

        this.addSummaryButton = page.locator("button {hasText: 'Add summary'}")
        this.addBriefSummaryAndKeywordsButton = page.locator("button {hasText: 'Add brief summary and keywords'}")

        this.addEditModal = new AddEditModal(page)
    }


    //ELEMENTS

        //test
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


    //
    async isActiveTab(locator) {
            await locator.waitFor({state: "visible"})
            await expect.soft(locator, 'Active tab should have border with color #066fac').toHaveCSS("border-color", "rgb(6, 111, 172)");    //locator needs to be renamed //or check .isEnable method
    }
    //
    async openEditBriefModal() {
        await this.editBriefSummaryButton.click()
        await this.addEditModal.modalLocator.waitFor({state: "visible"})
    }
    //
    // async openEditKeywordsModal() {
    //     await this.editKeywordsButton.click()
    //     // await this.addEditModal.________.waitFor({state: "visible"})
    // }
    //
    async openEditSummaryModal() {
        await this.editSummaryButton.click()
        await this.addEditModal.modalLocator.waitFor({state: "visible"})
    }

    // public async openAddSummaryModal() {
    //     await this.addSummaryButton.click()
    //     await this.addEditModal.modalLocator.waitFor({state: "visible"})
    // }
    //
    // public async openBriefSummaryAndKeywordsModal() {
    //     await this.addBriefSummaryAndKeywordsButton.click()
    //     await this.addEditModal.modalLocator.waitFor({state: "visible"})
    // }

//******************************//

    //UI
    // public async allTabsIsDisplayed() {
    //     const allTabs = await this.tabs.locator('****'); //common CSS selector for tabs
    //     await expect(allTabs).toHaveCount(4)
    //     //await expect(allTabs).toHaveText(["Summary","Highlights","Transcript","Participants"])
    // }
    //
    // public async activeTabUI(tabLocator) {
    //         await expect(tabLocator).toHaveCSS("color", "#066FAC"); //Need to be checked via debugger
    //         return console.log("Tab UI check is pass")
    // }

}















































