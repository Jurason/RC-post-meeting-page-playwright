import {HeaderTab} from "./header-tabs.js";
import {SearchDownloadContainer} from "./search-download-container.js";
import {NavigationToggle} from "./transcript-tab.js";
import {DeleteConfirmationModal} from "./modal.js";

const SEARCH_CONTAINER_SELECTOR = '.tab-header__search-download-container'

const PARTICIPANT_NAME_SELECTOR = '.user-phrase__user-display-name'
const PHRASE_BLOCK_HIGHLIGHTS_LIST_SELECTOR = '.user-phrase-menu'
const PHRASE_CONTENT_HIGHLIGHTS_LIST_SELECTOR = '.user-phrase__phrase-content'
const BUTTON_REPLAY_HIGHLIGHTS_SELECTOR = 'me-icon-list__button >> nth=0'
const BUTTON_FIND_IN_TRANSCRIPT_SELECTOR = 'me-icon-list__button >> nth=1'
const BUTTON_DELETE_HIGHLIGHT_SELECTOR = 'me-icon-list__button >> nth=2'

const NAVIGATION_TOGGLE_SELECTOR = '.SearchNavigator'

const IMAGE_NO_HIGHLIGHTS_AVAILABLE_SELECTOR = 'svg'

export class HighlightsTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);
        this.searchInput = new SearchDownloadContainer(lastLocator, SEARCH_CONTAINER_SELECTOR)
        this.navigationToggle = new NavigationToggle(lastLocator, NAVIGATION_TOGGLE_SELECTOR)
        this.highlightPhraseBlock = lastLocator.locator(PHRASE_BLOCK_HIGHLIGHTS_LIST_SELECTOR)
        this.highlightPhraseTextContent = this.highlightPhraseBlock.locator(PHRASE_CONTENT_HIGHLIGHTS_LIST_SELECTOR)

        this.imageNoHighlightsAvailable = lastLocator.locator(IMAGE_NO_HIGHLIGHTS_AVAILABLE_SELECTOR)
    }
    async getParticipantName(index){
        return await this.highlightPhraseBlock.nth(index).locator(PARTICIPANT_NAME_SELECTOR).textContent()
    }
    async getPhraseContent(index){
        return await this.highlightPhraseBlock.nth(index).locator(PHRASE_CONTENT_HIGHLIGHTS_LIST_SELECTOR).textContent()
    }
    async clickReplayButton(index){
        await this.highlightPhraseBlock.nth(index).locator(BUTTON_REPLAY_HIGHLIGHTS_SELECTOR).click()
    }
    async clickFindInTranscriptButton(index){
        await this.highlightPhraseBlock.nth(index).locator(BUTTON_FIND_IN_TRANSCRIPT_SELECTOR).click()
    }
    async clickDeleteHighlight(index){
        await this.highlightPhraseBlock.nth(index).locator(BUTTON_DELETE_HIGHLIGHT_SELECTOR).click()
    }
    async deleteAllHighlights(){                            //удалять через API запросы DELETE
        while(await this.highlightPhraseBlock.isVisible())
            await this.highlightPhraseBlock.first().locator(BUTTON_DELETE_HIGHLIGHT_SELECTOR).click()
    }
}

// class HighlightPhraseBlock {
//     constructor(lastLocator, ) {
//     }
// }