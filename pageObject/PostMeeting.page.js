import { expect } from "@playwright/test";
import {Modal} from "./pageElements/modal.js";
import {Header} from "./pageElements/header.js";
import {TabPanel} from "./pageElements/tabs.js";
import {Player} from "./pageElements/player.js";

const TAB_PANEL_SELECTOR = '.post-meeting-tabs'
const HEADER_SELECTOR = '.new-post-meeting-page__header'
const PLAYER_SELECTOR = '.new-post-meeting-page__player-summary-panel'
const MODAL_SELECTOR = '#modal'

export class PostMeetingPage {
    constructor(page) {
        this.page = page;
        this.tabs = new TabPanel(this.page, TAB_PANEL_SELECTOR)
        this.header = new Header(this.page, HEADER_SELECTOR)
        this.modal = new Modal(this.page, MODAL_SELECTOR)
        this.player = new Player(this.page, PLAYER_SELECTOR);
    }

//*****************************************************************************************************//

    //     constructor(page) {
    //     this.page = page;
    //     this.header = page.locator("div.new-post-meeting-page__header")
    //     this.player = page.locator("div.new-post-meeting-page__player-summary-panel")
    //     this.tabs = page.locator("div.post-meeting-tabs")
    //
    //     this.summaryTab = page.locator("label[for='summaries']")
    //     //transcript
    //     //highlights
    //     //participants
    //
    //     this.briefSummaryContainer = page.locator("div.summaries-container", {hasText: 'Brief'});
    //     this.keywordsContainer = page.locator("div.summaries-container", {hasText: 'Keywords'});
    //     this.summaryContainer = page.locator("div.summaries-container", {hasText: 'Summary'});
    //
    //     this.editBriefSummaryButton = page.locator("div.summary-header__edit-summary").nth(0);
    //     this.editKeywordsButton = page.locator("div.summary-header__edit-summary").nth(1);
    //     this.editSummaryButton = page.locator("div.summary-header__edit-summary").nth(2);
    //
    //     this.addSummaryButton = page.locator("button {hasText: 'Add summary'}")
    //     this.addBriefSummaryAndKeywordsButton = page.locator("button {hasText: 'Add brief summary and keywords'}")
    //
    //     this.addEditModal = new AddEditModal(page)
    // }


    //
    // async openEditBriefModal() {
    //     await this.editBriefSummaryButton.click()
    //     await this.addEditModal.modalLocator.waitFor({state: "visible"})
    // }
    //
    // async openEditKeywordsModal() {
    //     await this.editKeywordsButton.click()
    //     // await this.addEditModal.________.waitFor({state: "visible"})
    // }
    //
    // async openEditSummaryModal() {
    //     await this.editSummaryButton.click()
    //     await this.addEditModal.modalLocator.waitFor({state: "visible"})
    // }

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















































