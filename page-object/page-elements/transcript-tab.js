import {Button, DownloadButton} from "./tabs.js";
import {HeaderTab} from "./header-tabs.js";
import {expect} from "@playwright/test";
import {SearchDownloadContainer} from "./search-download-container.js";

const SEARCH_CONTAINER_SELECTOR = '.tab-header__search-download-container'
const KEYWORDS_CONTAINER_SELECTOR = '.keywords-container'
const KEYWORD_SELECTOR = '.one-line-list'
const EXPAND_KEYWORDS_BUTTON_SELECTOR = '.trigger-button'

const TRANSCRIPT_LIST_SELECTOR = '.transcript-tab'
const PARTICIPANT_NAME_SELECTOR = '.user-phrase__user-display-name'
const PHRASE_BLOCK_TRANSCRIPT_LIST_SELECTOR = '.user-phrase__phrase-block'
const PHRASE_TEXT_TRANSCRIPT_LIST_SELECTOR = '.user-phrase__phrase-content'
const PHRASE_ADDED_TO_HIGHLIGHTS_SIGN_SELECTOR = '.user-phrase__highlight'
const WORD_TRANSCRIPT_LIST_SELECTOR = '.user-phrase-content__word'

const REPLAY_TRANSCRIPT_BUTTON_SELECTOR = '.transcript-user-phrase-menu__me-icon-list >> button.me-icon-list__button'
const CREATE_HIGHLIGHT_BUTTON_SELECTOR = '.TranscriptSelectionMenu__menu >> button.me-icon-list__button >> nth=0'
const COPY_SELECTED_TRANSCRIPT_BUTTON_SELECTOR = '.TranscriptSelectionMenu__menu >> button.me-icon-list__button >> nth=1'
const NAVIGATION_TOGGLE_SELECTOR = '.SearchNavigator'
//karaoke-mode
const HIGHLIGHTED_WORD_SELECTOR = '.user-phrase-content__search'
const KARAOKE_MODE_CURRENT_WORD_SELECTOR = '.user-phrase-content__karaoke'
//no transcripts' material
const IMAGE_NO_TRANSCRIPT_AVAILABLE_SELECTOR = '.informative-img'

export class TranscriptTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
        this.searchDownloadContainer = new SearchDownloadContainer(lastLocator, SEARCH_CONTAINER_SELECTOR)
        this.keywordsContainer = lastLocator.locator(KEYWORDS_CONTAINER_SELECTOR)
        this.expandKeywordsButton = lastLocator.locator(EXPAND_KEYWORDS_BUTTON_SELECTOR)
        this.transcriptList = lastLocator.locator(TRANSCRIPT_LIST_SELECTOR)
        this.transcriptPhraseContainer = this.transcriptList.locator(PHRASE_BLOCK_TRANSCRIPT_LIST_SELECTOR)
        this.transcriptPhraseTextContent = this.transcriptPhraseContainer.locator(PHRASE_TEXT_TRANSCRIPT_LIST_SELECTOR)
        this.replayTranscriptButton = this.transcriptList.locator(REPLAY_TRANSCRIPT_BUTTON_SELECTOR)
        this.navigationToggle = new NavigationToggle(lastLocator, NAVIGATION_TOGGLE_SELECTOR)
        this.highlightedPhrase = this.transcriptList.locator(HIGHLIGHTED_WORD_SELECTOR)

        this.imageNoTranscriptAvailable = lastLocator.locator(IMAGE_NO_TRANSCRIPT_AVAILABLE_SELECTOR)
    }

    async getHighlightedPhrase(){
        const searchText = await this.highlightedPhrase
        const count = await searchText.count()
        let text = ""
        for(let i = 0; i < count; i++)
            text += await searchText.nth(i).textContent()
        return text
    }
    async getPhraseTextContent(index){
        return this.transcriptPhraseTextContent.nth(index).textContent()
    }
    async isAddedToHighlights(index){
        return await this.transcriptPhraseContainer.nth(index).locator(PHRASE_ADDED_TO_HIGHLIGHTS_SIGN_SELECTOR).isVisible()
    }
    async karaokeModeFunction(wordIndex, phraseIndex){
        let current = await this.transcriptPhraseContainer.nth(phraseIndex).locator(WORD_TRANSCRIPT_LIST_SELECTOR).nth(wordIndex)
        await expect(current).toHaveClass(KARAOKE_MODE_CURRENT_WORD_SELECTOR)
    }
    async getWordFromTranscriptList(index){
        return await this.transcriptList.locator(WORD_TRANSCRIPT_LIST_SELECTOR).nth(index).textContent()
    }
    async getCurrentKaraokeWord(){
        return await this.transcriptList.locator(KARAOKE_MODE_CURRENT_WORD_SELECTOR).textContent()
    }
    async randomIndex(){
        const replayButton = await this.transcriptList.locator(REPLAY_TRANSCRIPT_BUTTON_SELECTOR)
        const count = await replayButton.count()
        return Math.floor(Math.random() * count)
    }
    async clickReplayTranscriptButton(index){
        await this.transcriptPhraseContainer.nth(index).hover()
        await this.replayTranscriptButton.nth(index).click()
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
    async clickCreateDeleteHighlightButton(){
        await this.transcriptList.locator(CREATE_HIGHLIGHT_BUTTON_SELECTOR).click()
    }
}

const TEXT_NAVIGATION_TOGGLE = '.SearchNavigator__caption'
const BUTTON_UP_NAVIGATION_TOGGLE = '.SearchNavigator__button-up'
const BUTTON_DOWN_NAVIGATION_TOGGLE = '.SearchNavigator__button-down'

export class NavigationToggle {
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
