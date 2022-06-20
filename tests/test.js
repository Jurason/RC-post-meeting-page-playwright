import {chromium, expect, test, request} from "@playwright/test";
import {PostMeetingPage} from "../pageObject/PostMeeting.page.js";
import {LoginPage} from "../pageObject/Login.page.js";

import URL from "utils/recording-URL.js";
import textExample from "utils/text-for-Input.js";

test.describe('Demo server', async () => {

    let page;
    let postMeetingPage;

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext()
        page = await context.newPage()
        await page.goto(URL.fullMaterialRecordingDemo)
        await page.locator('button', {hasText: "Continue"}).click()
        await page.locator("button.btn.btn-primary").click()
        await page.locator("button.btn.btn-primary").click()
    })

    test.beforeEach(async () => {
        await page.goto(URL.fullMaterialRecordingDemo)
        postMeetingPage = await new PostMeetingPage(page)
    })

    test('RCV-26717 test UI', async () => {
        await postMeetingPage.isActiveTab(postMeetingPage.summaryTab)
        await page.screenshot({ path: "RCV-26717.png" });
    })

    test('RCV-27075 Edit summary functionality', async () => {
        const initialSummaryText = await postMeetingPage.summaryContainer.innerText()

        //Step#1
        await postMeetingPage.openEditSummaryModal()

        await postMeetingPage.addEditModal.textInput.fill("")
        await expect(postMeetingPage.addEditModal.textInput).toHaveAttribute('placeholder', 'Type your summary here...')
        await expect(postMeetingPage.addEditModal.counter).toHaveText( '0 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeDisabled()

        //Step#2
        await postMeetingPage.addEditModal.textAreaInput("a", "Enter", 3)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('6 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()

        //Step#3
        await postMeetingPage.addEditModal.textAreaInput("", "Enter", 26) //Check press amount
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "653.44 px") //Check


        await expect(postMeetingPage.addEditModal.counter).toHaveText('32 / 10000')

        //Step#4
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 26)
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "92 px") //Check


        await expect(postMeetingPage.addEditModal.counter).toHaveText('6 / 10000')

        //Step#5
        await postMeetingPage.addEditModal.cancelButton.click()
        const currentSummaryText = await postMeetingPage.summaryContainer.innerText()


        await expect(currentSummaryText).toEqual(initialSummaryText)
        console.log("Texts matches")


        //Step#6
        await postMeetingPage.openEditSummaryModal()
    //
    //     //Step#7
    //             //DragTo
    //     //Step#8
    //             //DragTo
    //
        //Step#9
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.fill(Array(501).join('aaaaaaaaaaaaaaaaaaaa')) //Replace by pasting whole text with 10001 characters
        await postMeetingPage.addEditModal.textInput.type(Array(2).join('a'))                      //
        await expect(postMeetingPage.addEditModal.counter).toHaveText('10001 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeDisabled()

        //Step#10-12
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 1)        //**
        await expect(postMeetingPage.addEditModal.counter).toHaveText('10000 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.type(`${new Date().getTime()}`)                     //**

        //Step#11
        await page.mouse.click(0,0)           //

        //Step#12
        await postMeetingPage.addEditModal.doneButton.click()

        await page.screenshot({ path: "RCV-27075.png" });

        // const textAreaContent : string = "New summary has added just now"

        // const processStateContent2 = await postMeetingPage.summaryContainer.innerText()
        // console.log(processStateContent2)
        // try{
        //     await expect(textAreaContent).toEqual(processStateContent2)
        //     console.log("Texts matches")
        // } catch (e) {
        //     return console.log("Something wrong")
        // }

    //
    })

    // test('*****', async ({page}) => {
    //
    //
    //
    // })
})





// npx playwright codegen --save-storage=auth1.json






