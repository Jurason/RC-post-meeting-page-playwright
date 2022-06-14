
//REWRITE TO MODAL

import {Page} from "@playwright/test";

export class Modal {

    private page: Page;

    public get containerModal() {
        return this.page.locator("****")
    }

    public get cancelButton() {
        return this.containerModal.locator("****")
    }

    public get doneButton() {
        return this.containerModal.locator("****")
    }

    public get textArea() {
        return this.containerModal.locator("****")
    }

    //functions

    public async enterSymbolsFunction(symbol: string, pressEnterTimes: number) {
        for (let i = 0; i < (pressEnterTimes - 1); i++)
            this.textArea.fill(symbol)
        this.textArea.press('Enter')
    }
}
// import {PostMeetingPage} from "../postMeetingPage";
// import {Locator, Page} from "@playwright/test";
//
//
// export class SummaryTab extends PostMeetingPage {
//
//
//
//
//
//     public get container() {
//         return this.
//     }
//
//
//     //"no material" elements
//
//     public get noMaterialPicture() {
//         return this.page.locator(`text=$$$$`)
//     }
//
//
//     public get addSummaryButton() {
//         return this.page.locator(`text=$$$$`)
//     }
//
//
//     public get addBriefAndKeywordsButton() {
//         return this.page.locator(`text=****`)
//     }
//
//     //"full material" elements
//
//
//
//     private get containerKeywords() {
//         return this.page.locator(`text=****`)
//     }
//
//     private get containerSummary() {
//         return this.page.locator(`text=****`)
//     }
//
//
//
//     //functions
//
//     async open() {
//         await this.page.goto("https://rozetka.com.ua/")
//     }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// }
//
