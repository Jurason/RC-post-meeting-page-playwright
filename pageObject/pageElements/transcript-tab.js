import {Button, DownloadButton} from "../pageElements/tabs.js";
import {HeaderTab} from "../pageElements/header-tabs.js";
import {expect} from "@playwright/test";

const SEARCH_INPUT_SELECTOR = '.LiveTranscriptInput'
const BUTTON_CLEAR_SEARCH_INPUT_SELECTOR = '.IconButton'
const DOWNLOAD_BUTTON_SELECTOR = '.download-icon'
const KEYWORDS_CONTAINER_SELECTOR = '.keywords-container'
const KEYWORD_SELECTOR = '.one-line-list'
const EXPAND_KEYWORDS_BUTTON_SELECTOR = '.trigger-button'

const TRANSCRIPT_LIST_SELECTOR = '.transcript-tab'
const PHRASE_TRANSCRIPT_LIST_SELECTOR = '.user-phrase__phrase-content'
const WORD_TRANSCRIPT_LIST_SELECTOR = '.user-phrase-content__word'
const PARTICIPANT_NAME_SELECTOR = '.user-phrase__user-display-name'

const REPLAY_TRANSCRIPT_BUTTON_SELECTOR = '.me-icon-list__button'
const NAVIGATION_TOGGLE_SELECTOR = '.SearchNavigator'

const HIGHLIGHTED_WORD_SELECTOR = '.user-phrase-content__search'
const KARAOKE_MODE_CURRENT_WORD_SELECTOR = '.user-phrase-content__karaoke'

const IMAGE_NO_TRANSCRIPT_AVAILABLE_SELECTOR = '.informative-img'


export class TranscriptTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
        this.searchInput = lastLocator.locator(SEARCH_INPUT_SELECTOR)
        this.buttonClearSearchInput = lastLocator.locator(BUTTON_CLEAR_SEARCH_INPUT_SELECTOR)
        this.downloadButton = new DownloadButton(lastLocator, DOWNLOAD_BUTTON_SELECTOR)
        this.keywordsContainer = lastLocator.locator(KEYWORDS_CONTAINER_SELECTOR)
        this.expandKeywordsButton = lastLocator.locator(EXPAND_KEYWORDS_BUTTON_SELECTOR)
        this.transcriptList = lastLocator.locator(TRANSCRIPT_LIST_SELECTOR)
        this.transcriptPhrase = this.transcriptList.locator(PHRASE_TRANSCRIPT_LIST_SELECTOR)
        this.navigationToggle = new NavigationToggle(lastLocator, NAVIGATION_TOGGLE_SELECTOR)
        this.replayTranscriptButton = new Button(lastLocator, REPLAY_TRANSCRIPT_BUTTON_SELECTOR)
        this.highlightedPhrase = this.transcriptList.locator(HIGHLIGHTED_WORD_SELECTOR)

        this.imageNoTranscriptAvailable = lastLocator.locator(IMAGE_NO_TRANSCRIPT_AVAILABLE_SELECTOR)
    }
    async getSearchInputValue(){
        return await this.searchInput.inputValue()
    }
    async getHighlightedPhrase(){
        const searchText = await this.highlightedPhrase
        const count = await searchText.count()
        let text = ""
        for(let i = 0; i < count; i++)
            text += await searchText.nth(i).textContent()
        return text
    }
    async karaokeModeFunction(wordIndex, phraseIndex){
        let current = await this.transcriptPhrase.nth(phraseIndex).locator(WORD_TRANSCRIPT_LIST_SELECTOR).nth(wordIndex)
        await expect(current).toHaveClass(KARAOKE_MODE_CURRENT_WORD_SELECTOR)
    }
    async getWordFromTranscriptList(index){
        return await this.transcriptList.locator(WORD_TRANSCRIPT_LIST_SELECTOR).nth(index).textContent()
    }
    async getCurrentKaraokeWord(){
        return await this.transcriptList.locator(KARAOKE_MODE_CURRENT_WORD_SELECTOR).textContent()
    }
    async indexRandomReplayTranscriptButton(){
        const replayButton = await this.replayTranscriptButton.buttonLocator
        const count = await replayButton.count()
        return Math.floor(Math.random() * count)
    }
    async clickReplayTranscriptButton(index){
        await this.replayTranscriptButton.buttonLocator.nth(index).click()
    }
    async getCountOfKeywords(){
        return await this.keywordsContainer.locator(KEYWORD_SELECTOR).count()
    }
    async randomIndexKeyword(){
        const keyword = await this.keywordsContainer.locator(KEYWORD_SELECTOR)
        const count = await keyword.count()
        return Math.floor(Math.random() * count)
    }
    async clickKeyword(index) {
        await this.keywordsContainer.locator(KEYWORD_SELECTOR).nth(index).click()
    }
    async getKeywordText(index){
        return await this.keywordsContainer.locator(KEYWORD_SELECTOR).nth(index).textContent()
    }
    async getParticipantName(index){
        return await this.transcriptList.locator(PARTICIPANT_NAME_SELECTOR).nth(index).textContent()
    }

}

const TEXT_NAVIGATION_TOGGLE = '.SearchNavigator__caption'
const BUTTON_UP_NAVIGATION_TOGGLE = '.SearchNavigator__button-up'
const BUTTON_DOWN_NAVIGATION_TOGGLE = '.SearchNavigator__button-down'

class NavigationToggle {
    constructor(lastLocator, toggleLocator) {
        this.toggleLocator = lastLocator.locator(toggleLocator)
        this.toggleText = this.toggleLocator.locator(TEXT_NAVIGATION_TOGGLE)
        this.upButton = this.toggleLocator.locator(BUTTON_UP_NAVIGATION_TOGGLE)
        this.downButton = this.toggleLocator.locator(BUTTON_DOWN_NAVIGATION_TOGGLE)
    }
    async getToggleText(){
        return this.toggleText.textContent()
    }
    async getCurrentToggleCounter(){
        let text = await this.getToggleText()
        text = parseInt(text.split(' ')[0])
        return text
    }
    async getMaxToggleCounter(){
        let text = await this.getToggleText()
        text = parseInt(text.split(' ')[2])
        return text
    }
}
