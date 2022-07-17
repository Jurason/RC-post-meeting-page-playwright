import {DownloadButton} from "./tabs.js";

const DOWNLOAD_BUTTON_SELECTOR = '.download-icon'
const SEARCH_INPUT_SELECTOR = '.LiveTranscriptInput'
const BUTTON_CLEAR_SEARCH_INPUT_SELECTOR = '.IconButton'

export class SearchDownloadContainer {
    constructor(lastLocator, elementLocator) {
        this.searchContainerLocator =lastLocator.locator(elementLocator)
        this.searchInput = this.searchContainerLocator.locator(SEARCH_INPUT_SELECTOR)
        this.buttonClearSearchInput = this.searchContainerLocator.locator(BUTTON_CLEAR_SEARCH_INPUT_SELECTOR)
        this.downloadButton = new DownloadButton(this.searchContainerLocator, DOWNLOAD_BUTTON_SELECTOR)
    }
    async getSearchInputValue(){
        return await this.searchInput.inputValue()
    }

}