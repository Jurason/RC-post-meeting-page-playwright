// import {Locator, Page} from "@playwright/test";


export class AddEditModal {

    // page : Page;
    // modalLocator: Locator;
    // cancelButton : Locator;
    // doneButton : Locator;
    // textInput : Locator;
    // counter : Locator;


    constructor(page) {
        this.page = page
        this.modalLocator = page.locator("#modal")
        this.cancelButton = page.locator("button.Button.Button--text-only")
        this.doneButton = page.locator("button.Button.Button--contained")
        this.textInput = page.locator("div.DialogInner >> textarea")
        this.counter = page.locator("div.max-length-of-entity >> span")
    }

    //FUNCTIONS

    // public async cancelButtonClick() {
    //     await this.cancelButton.click()
    // }
    //
    // public async doneButtonClick() {
    //     await this.doneButton.click()
    // }

    async textAreaInput(symbols, keyword, pressTimes) {
        for (let i = 0; i < pressTimes; i++) {
            await this.textInput.type(symbols)
            await this.textInput.press(keyword)
        }
    }
}