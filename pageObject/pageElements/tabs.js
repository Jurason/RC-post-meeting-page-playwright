import {EditedSign} from "./edited-sign.js";
import {expect} from "@playwright/test";


const SUMMARY_TAB_CONTAINER_SELECTOR = ':has-text("Summary")'
const TRANSCRIPT_TAB_CONTAINER_SELECTOR = ':has-text("Transcript")'
const HIGHLIGHTS_TAB_CONTAINER_SELECTOR = ':has-text("Highlights")'

export class TabPanel {
    constructor(lastLocator, tabPanelSelector) {
        this.tabPanelLocator = lastLocator.locator(tabPanelSelector)
        this.summaryTab = new SummaryTab(this.tabPanelLocator, SUMMARY_TAB_CONTAINER_SELECTOR)
        this.transcriptTab = new TranscriptTab(this.tabPanelLocator, TRANSCRIPT_TAB_CONTAINER_SELECTOR)
        this.highlightsTab = new HighlightsTab(this.tabPanelLocator, HIGHLIGHTS_TAB_CONTAINER_SELECTOR)
    }
}

const TAB_CONTAINER_SELECTOR = '.Tabs__item'

class Tab {
    constructor(lastLocator, containerSelector) {
        this.modalContainer = lastLocator.locator(`${TAB_CONTAINER_SELECTOR}${containerSelector}`)
    }
    async tabIsActive(){
        await this.modalContainer.waitFor({state: "visible"})
        await expect.soft(this.modalContainer, 'Active tab should have border with color #066fac').toHaveCSS("border-color", "rgb(6, 111, 172)");
    }

}

const BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container  >> nth=0'
const KEYWORDS_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=1'
const SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=2'

class SummaryTab extends Tab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
        this.briefSummarySection = new SummaryTabSection(lastLocator, BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR)
        this.keywordSection = new SummaryTabSection(lastLocator, KEYWORDS_SECTION_CONTAINER_SELECTOR)
        this.summarySection = new SummaryTabSection(lastLocator, SUMMARY_SECTION_CONTAINER_SELECTOR)
    }
}

class TranscriptTab {
    constructor() {

    }
}

class HighlightsTab {
    constructor() {

    }
}

const EDIT_BUTTON_SELECTOR = '.summary-header__edit-summary'
const COPY_BUTTON_SELECTOR = 'span.summary-header__copy-icon.icon-copy'
const EDITED_SIGN_SELECTOR = '.edit-sign'

class SummaryTabSection {
    constructor(lastLocator, containerSelector) {
        this.modalSectionLocator = lastLocator.locator(containerSelector)
        this.editedSign = new EditedSign(this.modalSectionLocator, EDITED_SIGN_SELECTOR);
        this.editButton = new EditButton(this.modalSectionLocator, EDIT_BUTTON_SELECTOR);
        this.copyButton = new CopyButton(this.modalSectionLocator, COPY_BUTTON_SELECTOR);
    }

    // getTitle() {
    //     return this.container.locator("p.summary-header__title").innerText()
    // }
    //
    // getEditedSignText() {
    //     return this.container.locator("div.edit-sign").innerText()
    // }
    //
    async getInnerText() {
        let innerText = await this.modalSectionLocator.innerText()
        innerText = innerText.split('\n')[4];
        return innerText
    }
    //
    async getLastKeywordText() {
        return await this.modalSectionLocator.locator('li').last().innerText()
    }

    async getCountOfKeywords(){
        return await this.modalSectionLocator.locator('li').count()
    }

}

class CopyButton {
    constructor(lastLocator, buttonLocator) {
        this.copyButton = lastLocator.locator(buttonLocator);
    }


}

class EditButton {

    constructor(lastLocator, buttonLocator) {
        this.editButton = lastLocator.locator(buttonLocator);
    }

    async openModal() {
        await this.editButton.click()
    }
}