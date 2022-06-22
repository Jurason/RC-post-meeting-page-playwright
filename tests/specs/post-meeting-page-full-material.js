import {chromium, expect, test, request} from "@playwright/test";
import {PostMeetingPage} from "pageObject/PostMeeting.page.js";

import URL from "../../utils/recording-URL.js";
import textExample from "../../utils/text-for-input.js";
import textForInput from "../../utils/text-for-input.js";

test.describe.configure({ mode: 'serial' })('Demo server', async () => {

    let page;
    let postMeetingPage;

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext()
        page = await context.newPage()
        await page.goto(URL.fullMaterialRecordingDemo)
                                            //need to fix. maybe https://playwright.dev/docs/auth#session-storage
        await page.locator('button', {hasText: "Continue"}).click()
        await page.locator("button.btn.btn-primary").click()
        await page.locator("button.btn.btn-primary").click()
    })

    test.beforeEach(async () => {
        postMeetingPage = await new PostMeetingPage(page)
    })

    test("Post meeting page UI : RCV-25015 : FM", async () => {
        await postMeetingPage.header.waitFor({state: "visible"})
        await postMeetingPage.player.waitFor({state: "visible"})
        await postMeetingPage.tabs.waitFor({state: "visible"})
        //Add "about" or "material status" locator
        await page.screenshot({ path: "Full material post-meeting-page layout.png" });
    })

    test("Summary Tab UI : RCV-26717 : FM", async () => {
        await postMeetingPage.summaryTab.isActiveTab()

        await postMeetingPage.briefSummaryContainer.waitFor({state: "visible"})
        await postMeetingPage.keywordsContainer.waitFor({state: "visible"})
        await postMeetingPage.summaryContainer.waitFor({state: "visible"})

        await postMeetingPage.summaryTab.screenshot({ path: "Full material summary tab.png" });
    })

    test('Edit summary functionality : RCV-27075 : FM', async () => {
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
        await postMeetingPage.addEditModal.textAreaInput("", "Enter", 22)
        await postMeetingPage.addEditModal.isHasScroll()
        await postMeetingPage.addEditModal.isCorrectMaxHeight()
        await expect(postMeetingPage.addEditModal.counter).toHaveText('28 / 10000')

        //Step#4
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 23)
        await postMeetingPage.addEditModal.isCorrectMinHeight()
        await expect(postMeetingPage.addEditModal.counter).toHaveText('5 / 10000')

        //Step#5
        await postMeetingPage.addEditModal.cancelButton.click()
        let currentSummaryText = await postMeetingPage.summaryContainer.innerText()
        await expect(currentSummaryText.split('\n')[4]).toEqual(initialSummaryText.split('\n')[4])

        //Step#6
        await postMeetingPage.openEditSummaryModal()

        //Step#7
        // await postMeetingPage.addEditModal.dragDown()
        // await postMeetingPage.addEditModal.isCorrectMaxHeight()
        //Step#8
        // await postMeetingPage.addEditModal.dragUp()
        // await postMeetingPage.addEditModal.isCorrectMinHeightAfterDrag()

        //Step#9
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.fill(textExample.longSummaryText10001)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('10001 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeDisabled()

        //Step#10-12
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('10000 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.type(textForInput.newString)

        //Step#11
        await page.mouse.click(0,0)

        //Step#12
        const newSummaryText = await postMeetingPage.addEditModal.textInput.textContent()
        await postMeetingPage.addEditModal.doneButton.click()
        await page.waitFor({timeout: 1})
        currentSummaryText = await postMeetingPage.summaryContainer.innerText()
        await expect(currentSummaryText.split('\n')[4]).toEqual(newSummaryText)

        await page.screenshot({ path: "RCV-27075.png" });
    })

    test('Edit brief summary functionality : RCV-26956 : FM', async () => {
        const initialBriefSummaryText = await postMeetingPage.briefSummaryContainer.innerText()

        //Step#1
        await postMeetingPage.openEditBriefModal()

        await postMeetingPage.addEditModal.textInput.fill("")
        // await expect(postMeetingPage.addEditModal.textInput).toHaveAttribute('placeholder', 'Type your brief summary here...')
        await expect(postMeetingPage.addEditModal.counter).toHaveText( '0 / 200')
        await expect(postMeetingPage.addEditModal.doneButton).toBeDisabled()

        //Step#2
        // await postMeetingPage.addEditModal.textAreaInput("a", "Enter", 3)
        // await expect(postMeetingPage.addEditModal.counter).toHaveText('6 / 10000')
        // await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()
        //
        // //Step#3
        // await postMeetingPage.addEditModal.textAreaInput("", "Enter", 22)
        // await postMeetingPage.addEditModal.isHasScroll()
        // await postMeetingPage.addEditModal.isCorrectMaxHeight()
        // await expect(postMeetingPage.addEditModal.counter).toHaveText('28 / 10000')
        //
        // //Step#4
        // await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 23)
        // await postMeetingPage.addEditModal.isCorrectMinHeight()
        // await expect(postMeetingPage.addEditModal.counter).toHaveText('5 / 10000')
        //
        // //Step#5
        await postMeetingPage.addEditModal.cancelButton.click()
        let currentBriefSummaryText = await postMeetingPage.briefSummaryContainer.innerText()
        await expect(currentBriefSummaryText.split('\n')[4]).toEqual(initialBriefSummaryText.split('\n')[4])

        //Step#6
        await postMeetingPage.openEditBriefModal()

        //Step#7
        // await postMeetingPage.addEditModal.dragDown()
        // await postMeetingPage.addEditModal.isCorrectMaxHeight()
        //Step#8
        // await postMeetingPage.addEditModal.dragUp()
        // await postMeetingPage.addEditModal.isCorrectMinHeightAfterDrag()

        //Step#9
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.fill(textExample.briefSummaryText201)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('201 / 200')
        await expect(postMeetingPage.addEditModal.doneButton).toBeDisabled()

        //Step#10-12
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('200 / 200')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()
        await postMeetingPage.addEditModal.textInput.fill("")
        await postMeetingPage.addEditModal.textInput.type(textForInput.newString)

        //Step#11
        await page.mouse.click(0,0)

        //Step#12
        const newBriefSummaryText = await postMeetingPage.addEditModal.textInput.textContent()
        await postMeetingPage.addEditModal.doneButton.click()
        await page.waitFor({timeout: 1})
        currentBriefSummaryText = await postMeetingPage.briefSummaryContainer.innerText()
        await expect(currentBriefSummaryText.split('\n')[4]).toEqual(newBriefSummaryText)

        await page.screenshot({ path: "RCV-26956.png" });
    })          //TBD

    test('Edit keywords functionality : RCV-26957 : FM', async () => {

    })              //TBD
})






