import {HeaderTab} from "../pageElements/header-tabs.js";

const IMAGE_NO_HIGHLIGHTS_AVAILABLE_SELECTOR = 'svg'


export class HighlightsTab extends HeaderTab {
    constructor(lastLocator, containerSelector) {
        super(lastLocator, containerSelector);





        this.imageNoHighlightsAvailable = lastLocator.locator(IMAGE_NO_HIGHLIGHTS_AVAILABLE_SELECTOR)
    }
}