import {expect} from "@playwright/test";
import {EditedSign} from "./edited-sign.js";

const CANCEL_BUTTON_SELECTOR = '.Button.Button--text-only'
const DONE_BUTTON_SELECTOR = '.Button.Button--contained'
const EDITED_SIGN_SELECTOR = '.edit-sign'
const TEXT_INPUT_SELECTOR = 'textarea'
const LETTER_COUNTER_SELECTOR = '.max-length-of-entity >> span'
const KEYWORDS_INPUT_SELECTOR = '.future-keyword'
const EXISTING_KEYWORD_SELECTOR = '.edit-brief-keywords-modal__keyword'

export class Modal {
    constructor(lastLocator, modalSelector) {
        this.modalLocator = lastLocator.locator(modalSelector)
        this.cancelButton = this.modalLocator.locator(CANCEL_BUTTON_SELECTOR)
        this.doneButton = this.modalLocator.locator(DONE_BUTTON_SELECTOR)
        this.textInput = this.modalLocator.locator(TEXT_INPUT_SELECTOR)
        this.letterCounter = this.modalLocator.locator(LETTER_COUNTER_SELECTOR)
        this.editedSign = new EditedSign(this.modalLocator, EDITED_SIGN_SELECTOR)
        this.viewportHeight = lastLocator.viewportSize().height

        this.keywordBox = this.modalLocator.locator(EXISTING_KEYWORD_SELECTOR)
        this.keywordInput = this.modalLocator.locator(KEYWORDS_INPUT_SELECTOR).last()
    }

    async textAreaInput(symbols, keyword, pressTimes) {
        for (let i = 0; i < pressTimes; i++) {
            await this.textInput.type(symbols)
            await this.textInput.press(keyword)
        }
    }

    async isHasScroll() {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        let eleScrollHeight = await this.textInput.evaluate(node => node.scrollHeight)
        await expect.soft(eleClientHeight < eleScrollHeight, 'We have problem with scroll appearance').toBeTruthy()
    }


    /**
     * max-height = calc(100vh - numberForCalculation);
     *
     * EDIT BRIEF MODAL
     * numberForCalculation = 546px;
     * EDIT SUMMARY MODAL
     * numberForCalculation = 246px;;
     *@returns {Promise<void>}
     */
    async isCorrectMaxHeight(numberForCalculation) {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        let eleCorrectHeight = await (this.viewportHeight - numberForCalculation) //разница в 2 px
        await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(eleCorrectHeight)
    }
    async isCorrectMinHeight(height) {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(height)
    }
    async getCountOfKeywords(){                                     //ЭТОТ МЕТОД МОЖЕТ БЫТЬ ОШИБОЧНО ВЫЗВАН ИЗ ДРУГОЙ МОДАЛКИ
        return await this.modalLocator.locator(EXISTING_KEYWORD_SELECTOR).count()
    }
    async deleteKeywordBoxes(numberOfBoxes){
        for (let i = 0; i < numberOfBoxes; i++) {
            await this.keywordBox.last().locator('button').click()
        }
    }
    async deleteAllKeywordBoxes(){
        let count = await this.getCountOfKeywords()
        for (let i = 0; i < count; i++) {
            await this.keywordBox.last().locator('button').click()
        }
    }
    async addKeywordBoxes(textForKeywords){
        while(await this.keywordInput.isEditable()){
            await this.keywordInput.fill(textForKeywords)
            await this.keywordInput.press('Enter')
        }
    }



    // async isCorrectMinHeightAfterDrag() {
    //     let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
    //     await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(46)
    // }
    //
    // async dragDown() {
    //     let textInputBox = await this.textInput.boundingBox()
    //     await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + textInputBox.height)
    //     await this.page.mouse.down()
    //     await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + 250)
    //     await this.page.mouse.up()
    // }
    //
    // async dragUp() {
    //     let textInputBox = await this.textInput.boundingBox()
    //     await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + textInputBox.height)
    //     await this.page.mouse.down()
    //     await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y - 250)
    //     await this.page.mouse.up()
    // }

}

// const KEYWORD_BOX_DELETE_BUTTON = 'button'
// const KEYWORD_BOX_INPUT = 'input'

// class KeywordBox {
//     constructor(lastLocator, keywordsSelector) {
//         this.keywordBox = lastLocator.locator(keywordsSelector)
//         this.deleteButton = this.keywordBox.locator(KEYWORD_BOX_DELETE_BUTTON)
//         this.input = this.keywordBox.locator(KEYWORD_BOX_INPUT)
//     }
// }


















