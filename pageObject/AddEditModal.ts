import {Locator, Page} from "@playwright/test";


export class AddEditModal {

    readonly page : Page;
    readonly modalLocator: Locator;
    readonly cancelButton : Locator;
    readonly doneButton : Locator;
    readonly textArea : Locator;
    readonly counter : Locator;


    constructor(page) {
        this.page = page
        this.modalLocator = page.locator("#modal")
        this.cancelButton = page.locator("button.Button.Button--text-only")
        this.doneButton = page.locator("button.Button.Button--contained")
        this.textArea = page.locator("div.DialogInner >> textarea")
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

    public async textAreaInput(symbols: string, keyword: string, pressTimes: number) {
        for (let i = 0; i < pressTimes; i++) {
            await this.textArea.type(symbols)
            await this.textArea.press(keyword)
        }
    }





}