// import {Locator, Page} from "@playwright/test";


import {expect} from "@playwright/test";

export class AddEditModal {

    page;
    modalLocator: "#modal";
    cancelButtonLocator: "button.Button.Button--text-only";
    doneButtonLocator: "button.Button.Button--contained";
    textInputLocator: "div.DialogInner >> textarea";
    counterLocator: "div.max-length-of-entity >> span";


    constructor(page) {
        this.page = page
        this.modalLocator = page.locator(this.modalLocator)
        this.cancelButton = page.locator(this.cancelButtonLocator)
        this.doneButton = page.locator(this.doneButtonLocator)
        this.textInput = page.locator(this.textInputLocator)
        this.counter = page.locator(this.counterLocator)
    }

    //FUNCTIONS

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

    async isCorrectMaxHeight() {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        let eleCorrectHeight = await (this.page.viewportSize().height - 246) //разница в 2 px
        await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(eleCorrectHeight)
    }

    async isCorrectMinHeight() {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(90)
    }

    async isCorrectMinHeightAfterDrag() {
        let eleClientHeight = await this.textInput.evaluate(node => node.clientHeight)
        await expect.soft(eleClientHeight, 'We have problem with modal height').toEqual(46)
    }

    async dragDown() {
        let textInputBox = await this.textInput.boundingBox()
        await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + textInputBox.height)
        await this.page.mouse.down()
        await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + 250)
        await this.page.mouse.up()
    }

    async dragUp() {
        let textInputBox = await this.textInput.boundingBox()
        await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y + textInputBox.height)
        await this.page.mouse.down()
        await this.page.mouse.move(textInputBox.x + textInputBox.width, textInputBox.y - 250)
        await this.page.mouse.up()
    }
}