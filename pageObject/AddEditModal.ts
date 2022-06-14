import {Locator, Page} from "@playwright/test";


export class AddEditModal {

    readonly page : Page;
    readonly modalLocator: Locator;
    readonly cancelButton : Locator;
    readonly doneButton : Locator;
    readonly textArea : Locator;


    constructor(page) {
        this.page = page
        this.modalLocator = page.locator("***")
        this.cancelButton = page.locator("***")
        this.doneButton = page.locator("***")
        this.textArea = page.locator("***")
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