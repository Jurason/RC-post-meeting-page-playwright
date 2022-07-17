import {TranscriptTab} from "../pageElements/transcript-tab.js";
import {HighlightsTab} from "../pageElements/highlights-tab.js";
import {SummaryTab} from "./summary-tab.js";

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

export class Button {
    constructor(lastLocator, buttonLocator) {
        this.buttonLocator = lastLocator.locator(buttonLocator);
    }
}
    export class CopyButton extends Button{
        async copyContent() {
            await this.buttonLocator.click()
        }
    }
    export class EditButton extends Button{
        async openModal() {
            await this.buttonLocator.click()
        }
    }
    export class AddButton extends Button{
        async openModal() {
            await this.buttonLocator.click()
        }
    }
    export class DownloadButton extends Button {
        async downloadContent() {
            await this.buttonLocator.click()
        }
    }

