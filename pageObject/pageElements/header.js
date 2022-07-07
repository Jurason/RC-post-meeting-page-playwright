import {expect} from "@playwright/test";

const BACK_BUTTON_SELECTOR = '.new-post-meeting-page__back'
const MEETING_INFO_SELECTOR = '.new-post-meeting-page__meeting-info'
const PARTICIPANTS_DROPDOWN_SELECTOR = '.dropdown-menu'
const PARTICIPANTS_COUNTER_SELECTOR = '.participants-button__counter'
const PARTICIPANTS_DROPDOWN_OPTION_SELECTOR = '.dropdown-menu__option-item'
const RECORDING_PARTS_DROPDOWN_SELECTOR = ''
const SHARE_BUTTON_SELECTOR = '[data-at="Recording::Header::Share"]'
const DOWNLOAD_BUTTON_SELECTOR = '[data-at="Recording::Header::Download"]'
const DELETE_BUTTON_SELECTOR = '[data-at="Recording::Header::Delete"]'

export class Header {
    constructor(lastLocator, headerSelector) {
        this.headerlocator = lastLocator.locator(headerSelector)
        this.participantsDropdown = new Dropdown(this.headerlocator, PARTICIPANTS_DROPDOWN_SELECTOR)
        this.deleteButton = this.headerlocator.locator(DELETE_BUTTON_SELECTOR)
        this.downloadButton = this.headerlocator.locator(DOWNLOAD_BUTTON_SELECTOR)
        this.shareButton = this.headerlocator.locator(SHARE_BUTTON_SELECTOR)

        this.partsDropdown = this.headerlocator.locator(RECORDING_PARTS_DROPDOWN_SELECTOR)
    }
}
class Dropdown {
    constructor(lastLocator, dropdownSelector) {
        this.dropdown = lastLocator.locator(dropdownSelector)
        // this.dropdownCheck()                                    //не уверен будет ли это работать
    }
    async openDropdown(){
        await this.dropdown.click()
    }
    // async getParticipantsNumber(){
    //     return this.dropdown.locator(PARTICIPANTS_COUNTER_SELECTOR).innerText()
    // }
    // dropdownCheck(){
    //     // const participantsNumber = this.getParticipantsNumber()
    //     const dropdownOptions = this.dropdown.locator(PARTICIPANTS_DROPDOWN_OPTION_SELECTOR).count()
    //     expect(participantsNumber).toEqual(dropdownOptions)
    // }
}