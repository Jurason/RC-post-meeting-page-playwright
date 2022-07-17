import {expect} from "@playwright/test";

const BACK_BUTTON_SELECTOR = '.new-post-meeting-page__back'
const MEETING_INFO_SELECTOR = '.new-post-meeting-page__meeting-info'
const PARTICIPANTS_DROPDOWN_SELECTOR = '.dropdown-menu'
const PARTICIPANTS_COUNTER_SELECTOR = '.participants-button__counter'
const DROPDOWN_LIST_SELECTOR = '.participants-button__list'
const PARTICIPANTS_DROPDOWN_OPTION_SELECTOR = '.dropdown-menu__option-item'
const PARTICIPANTS_DROPDOWN_NAMES_SELECTOR = '.participants-button__list-item-name'
const RECORDING_PARTS_DROPDOWN_SELECTOR = ''
const SHARE_BUTTON_SELECTOR = '[data-at="Recording::Header::Share"]'
const DOWNLOAD_BUTTON_SELECTOR = '[data-at="Recording::Header::Download"]'
const DELETE_BUTTON_SELECTOR = '[data-at="Recording::Header::Delete"]'

export class Header {
    constructor(lastLocator, headerSelector) {
        this.headerlocator = lastLocator.locator(headerSelector)
        this.participantsDropdown = new ParticipantsDropdown(this.headerlocator, PARTICIPANTS_DROPDOWN_SELECTOR)
        this.deleteButton = this.headerlocator.locator(DELETE_BUTTON_SELECTOR)
        this.downloadButton = this.headerlocator.locator(DOWNLOAD_BUTTON_SELECTOR)
        this.shareButton = this.headerlocator.locator(SHARE_BUTTON_SELECTOR)

        this.partsDropdown = this.headerlocator.locator(RECORDING_PARTS_DROPDOWN_SELECTOR)
    }
}
class ParticipantsDropdown {
    constructor(lastLocator, dropdownSelector) {
        this.dropdownLocator = lastLocator.locator(dropdownSelector)
        this.dropdownList = this.dropdownLocator.locator(DROPDOWN_LIST_SELECTOR)
        this.participantName = this.dropdownList.locator(PARTICIPANTS_DROPDOWN_NAMES_SELECTOR)
        // this.dropdownCheck()                                    //не уверен будет ли это работать
    }
    async dropdownClick(){
        await this.dropdownLocator.click()
    }
    async getParticipantsNumber(){
        return this.dropdownLocator.locator(PARTICIPANTS_COUNTER_SELECTOR).innerText()
    }
    // async dropdownCheck(){
    //     const participantsNumber = this.getParticipantsNumber()
    //     const dropdownOptionsCount = this.participantsName.count()
    //     expect(participantsNumber).toEqual(dropdownOptionsCount)
    // }
}