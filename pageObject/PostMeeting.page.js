import { expect } from "@playwright/test";
import {Modal} from "./pageElements/modal.js";
import {Header} from "./pageElements/header.js";
import {TabPanel} from "./pageElements/tabs.js";
import {Player} from "./pageElements/player.js";

const TAB_PANEL_SELECTOR = '.post-meeting-tabs'
const HEADER_SELECTOR = '.new-post-meeting-page__header'
const PLAYER_SELECTOR = '.new-post-meeting-page__player-summary-panel'
const MODAL_SELECTOR = '#modal'

export class PostMeetingPage {
    constructor(page) {
        this.page = page;
        this.tabs = new TabPanel(this.page, TAB_PANEL_SELECTOR)
        this.header = new Header(this.page, HEADER_SELECTOR)
        this.modal = new Modal(this.page, MODAL_SELECTOR)
        this.player = new Player(this.page, PLAYER_SELECTOR);
    }
}















































