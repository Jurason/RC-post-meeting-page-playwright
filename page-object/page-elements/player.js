import {expect} from "@playwright/test";
import {Button} from "./tabs.js";

const PLAYER_HEADER = '.PlayerHeader'
const PLAYER_FOOTER = '.PlayerFooter'
const PLAYER_HEADER_RECORDING_TAB = '.PlayerModes__item >> nth=0'
const PLAYER_HEADER_HIGHLIGHTS_TAB = '.PlayerModes__item >> nth=1'

export class Player {
    constructor(lastLocator, playerSelector) {
        this.playerLocator = lastLocator.locator(playerSelector)
        this.header = new PlayerHeader(this.playerLocator, PLAYER_HEADER)
        this.footer = new PlayerFooter(this.playerLocator, PLAYER_FOOTER)
    }
}
class PlayerHeader {
    constructor(lastLocator, headerSelector) {
        this.playerHeaderLocator = lastLocator.locator(headerSelector)
        this.recordingTab = new PLayerTab(this.playerHeaderLocator, PLAYER_HEADER_RECORDING_TAB)
        this.highlightstab = new PLayerTab(this.playerHeaderLocator, PLAYER_HEADER_HIGHLIGHTS_TAB)
    }
}

const PLAYER_PROGRESS_SELECTOR = '.PlayerProgress'
const PLAY_BUTTON_SELECTOR = '.PlayerButton :has(" .svg-play")'
const PAUSE_BUTTON_SELECTOR = '.PlayerButton :has(" .svg-pause")'


class PlayerFooter {
    constructor(lastLocator, footerSelector) {
        this.playerFooterLocator = lastLocator.locator(footerSelector)
        this.playButton = this.playerFooterLocator.locator(PLAY_BUTTON_SELECTOR)
        this.pauseButton = this.playerFooterLocator.locator(PAUSE_BUTTON_SELECTOR)

    }
}
class PLayerTab {
    constructor(lastLocator, playerTabSelector) {
        this.tabLocator = lastLocator.locator(playerTabSelector)
    }
    async isActiveTab(){
        await expect.soft(this.tabLocator).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    }
    async getTabName(){
        return this.tabLocator.locator('div >> .PlayerModes__title').textContent()
    }
}