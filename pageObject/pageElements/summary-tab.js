import {EditedSign} from "./edited-sign.js";
import {AddButton, CopyButton, EditButton} from "./tabs.js";
import {HeaderTab} from "./header-tabs.js";

const BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container  >> nth=0'
const KEYWORDS_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=1'
const SUMMARY_SECTION_CONTAINER_SELECTOR = '.summaries-container >> nth=2'
const NO_MATERIAL_AVAILABLE_CONTAINER_SELECTOR = '.summary-tab__alternative-container'

export class SummaryTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);            //В данном месте, через наследование, я связываю Хэдэр и тело табы.
        this.briefSummarySection = new SummaryTabSection(lastLocator, BRIEF_SUMMARY_SECTION_CONTAINER_SELECTOR)
        this.keywordSection = new KeywordSection(lastLocator, KEYWORDS_SECTION_CONTAINER_SELECTOR)
        this.summarySection = new SummaryTabSection(lastLocator, SUMMARY_SECTION_CONTAINER_SELECTOR)

        this.moMaterialSection = new NoMaterialSummaryTabSection(lastLocator, NO_MATERIAL_AVAILABLE_CONTAINER_SELECTOR)
    }
}

const EDIT_BUTTON_SELECTOR = '.summary-header__edit-summary'
const COPY_BUTTON_SELECTOR = 'span.summary-header__copy-icon.icon-copy'
const EDITED_SIGN_SELECTOR = '.edit-sign'
const SECTION_TITLE = '.summary-header__title'

export class SummaryTabSection {
    constructor(lastLocator, sectionSelector) {
        this.modalSectionLocator = lastLocator.locator(sectionSelector)
        this.editedSign = new EditedSign(this.modalSectionLocator, EDITED_SIGN_SELECTOR);
        this.editButton = new EditButton(this.modalSectionLocator, EDIT_BUTTON_SELECTOR);
        this.copyButton = new CopyButton(this.modalSectionLocator, COPY_BUTTON_SELECTOR);
    }
    getTitle() {
        return this.modalSectionLocator.locator(SECTION_TITLE).textContent()
    }
    async getInnerText() {
        let innerText = await this.modalSectionLocator.innerText()
        innerText = innerText.split('\n')[4];
        return innerText
    }
}
export class KeywordSection extends SummaryTabSection {
    constructor(lastLocator, sectionSelector) {
        super(lastLocator, sectionSelector);
    }
    async clickRandomKeyword() {
        const keyword = await this.modalSectionLocator.locator('li')
        const count = await this.getCountOfKeywords()
        const randomIndex = Math.floor(Math.random() * count)
        await keyword.nth(randomIndex).click()
    }
    async getLastKeywordBoxText() {
        return await this.modalSectionLocator.locator('li').last().innerText()
    }
    async getCountOfKeywords(){
        return await this.modalSectionLocator.locator('li').count()
    }
}

const IMAGE_NO_SUMMARY_AVAILABLE_SELECTOR = '.informative-img'
const NO_DATA_TEXT = 'div >> nth=0'
const NO_DATA_SORRY_TEXT = 'div >> nth=1'
const ADD_SUMMARY_BUTTON_SELECTOR = 'button >> nth=0'
const ADD_BRIEF_SUMMARY_AND_KEYWORDS_BUTTON_SELECTOR = 'button >> nth=1'

export class NoMaterialSummaryTabSection {
    constructor(lastLocator, sectionSelector) {
        this.noMaterialSectionLocator = lastLocator.locator(sectionSelector)
        this.imageNoSummaryAvailable = this.noMaterialSectionLocator.locator(IMAGE_NO_SUMMARY_AVAILABLE_SELECTOR)
        this.addSummaryButton = new AddButton(this.noMaterialSectionLocator, ADD_SUMMARY_BUTTON_SELECTOR)
        this.addBriefSummaryAndKeywordsButton = new AddButton(this.noMaterialSectionLocator, ADD_BRIEF_SUMMARY_AND_KEYWORDS_BUTTON_SELECTOR)
    }
    async getText(){

    }
}
