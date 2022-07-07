import {EditedSign} from "./edited-sign.js";
import {expect} from "@playwright/test";


const SUMMARY_TAB_BUTTON_SELECTOR = ':has-text("Summary")'
const TRANSCRIPT_TAB_BUTTON_SELECTOR = ':has-text("Transcript")'
const HIGHLIGHTS_TAB_BUTTON_SELECTOR = ':has-text("Highlights")'

export class TabPanel {
    constructor(lastLocator, tabPanelSelector) {
        this.tabPanelLocator = lastLocator.locator(tabPanelSelector)
        this.summaryTab = new SummaryTab(this.tabPanelLocator, SUMMARY_TAB_BUTTON_SELECTOR)
        this.transcriptTab = new TranscriptTab(this.tabPanelLocator, TRANSCRIPT_TAB_BUTTON_SELECTOR)
        this.highlightsTab = new HighlightsTab(this.tabPanelLocator, HIGHLIGHTS_TAB_BUTTON_SELECTOR)
    }
}

const TAB_CONTAINER_SELECTOR = '.Tabs__item'
                //фактически HeaderTab класс нужен только для использования функции tabIsActive
                //То есть HeaderTab класс нужен для всех таб, поэтому мы его выносим на уровень выше
                //в строгом смысле не является родительским классом для класса SummaryTab, это просто указатель на хэдэр
                //поэтому селектор в классе SummaryTab не чейнится с селектором из класса HeaderTab, потому что в
                //DOM они расположены параллельно на одном уровне
class HeaderTab {
    constructor(lastLocator, containerSelector) {
        this.headerTab = lastLocator.locator(`${TAB_CONTAINER_SELECTOR}${containerSelector}`)
    }
    async tabIsActive(){
        await this.headerTab.waitFor({state: "visible"})
        await expect.soft(this.headerTab, 'Active tab should have border with color #066fac').toHaveCSS("border-color", "rgb(6, 111, 172)");
    }
    async clickOnTab(){
        await this.headerTab.click()
    }
}

const BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container  >> nth=0'
const KEYWORDS_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=1'
const SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=2'
const NO_MATERIAL_AVAILABLE_CONTAINER_SELECTOR = '.summary-tab__alternative-container'

class SummaryTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);            //В данном месте, через наследование, я связываю Хэдэр и тело табы.
        this.briefSummarySection = new SummaryTabSection(lastLocator, BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR)
        this.keywordSection = new SummaryTabSection(lastLocator, KEYWORDS_SECTION_CONTAINER_SELECTOR)
        this.summarySection = new SummaryTabSection(lastLocator, SUMMARY_SECTION_CONTAINER_SELECTOR)

        this.moMaterialSection = new NoMaterialSummaryTabSection(lastLocator, NO_MATERIAL_AVAILABLE_CONTAINER_SELECTOR)
    }
}

class TranscriptTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
    }
}

class HighlightsTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
    }
}

const EDIT_BUTTON_SELECTOR = '.summary-header__edit-summary'
const COPY_BUTTON_SELECTOR = 'span.summary-header__copy-icon.icon-copy'
const EDITED_SIGN_SELECTOR = '.edit-sign'

class SummaryTabSection {
    constructor(lastLocator, sectionSelector) {
        this.modalSectionLocator = lastLocator.locator(sectionSelector)
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

    async getLastKeywordBoxText() {
        return await this.modalSectionLocator.locator('li').last().innerText()
    }

    async getCountOfKeywords(){
        return await this.modalSectionLocator.locator('li').count()
    }
}

const NO_SUMMARY_AVAILABLE_IMAGE_SELECTOR = '.informative-img'
const NO_DATA_TEXT = 'div >> nth=0'
const NO_DATA_SORRY_TEXT = 'div >> nth=1'
const ADD_SUMMARY_BUTTON_SELECTOR = 'button >> nth=0'
const ADD_BRIEF_SUMMARY_AND_KEYWORDS_BUTTON_SELECTOR = 'button >> nth=1'

class NoMaterialSummaryTabSection {
    constructor(lastLocator, sectionSelector) {
        this.noMaterialSectionLocator = lastLocator.locator(sectionSelector)
        this.noSummaryAvailableImage = this.noMaterialSectionLocator.locator(NO_SUMMARY_AVAILABLE_IMAGE_SELECTOR)
        this.addSummaryButton = new AddButton(this.noMaterialSectionLocator, ADD_SUMMARY_BUTTON_SELECTOR)
        this.addBriefSummaryAndKeywordsButton = new AddButton(this.noMaterialSectionLocator, ADD_BRIEF_SUMMARY_AND_KEYWORDS_BUTTON_SELECTOR)
    }
    async getText(){

    }
}

class Button {
    constructor(lastLocator, buttonLocator) {
        this.buttonLocator = lastLocator.locator(buttonLocator);
    }
}
    class CopyButton extends Button{
        async copyContent() {
            await this.buttonLocator.click()
        }
    }
    class EditButton extends Button{
        async openModal() {
            await this.buttonLocator.click()
        }
    }
    class AddButton extends Button{
        async openModal() {
            await this.buttonLocator.click()
        }
    }

