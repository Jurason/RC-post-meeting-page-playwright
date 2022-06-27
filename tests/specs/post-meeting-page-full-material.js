import {chromium, expect, test, request} from "@playwright/test";
import {PostMeetingPage} from "../../pageObject/PostMeeting.page.js";

import URL from "../../utils/recording-URL.js";
import textExample from "../../utils/text-for-input.js";
import textForInput from "../../utils/text-for-input.js";

test.describe('Demo server', async () => {

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

    test("Post meeting page UI : RCV-25015 : FM", async () => {             //Элементы тестируются через работу с ними, то есть просто проверять их видимость не имеет смысла, потому что при проверке какого-то действия произойдет автоматическая проверка их СУЩЕСТВОВАНИЯ на странице.
        await postMeetingPage.header.headerlocator.waitFor({state: "visible"})      //Поэтому у меня и появляются эти тупые "поля" типа headerLocator и тому подобное
        await postMeetingPage.player.playerLocator.waitFor({state: "visible"})
        await postMeetingPage.tabs.tabPanelLocator.waitFor({state: "visible"})
        //Add "about" or "material status" locator
        await page.mouse.move(0, 0)
        await page.screenshot({ path: "Full material post-meeting-page layout.png" })

    })

    test("Summary Tab UI : RCV-26717 : FM", async () => {
        await postMeetingPage.tabs.summaryTab.tabIsActive()
        await postMeetingPage.tabs.summaryTab.briefSummarySection.modalSectionLocator.waitFor({state: "visible"})
        await postMeetingPage.tabs.summaryTab.keywordSection.modalSectionLocator.waitFor({state: "visible"})
        await postMeetingPage.tabs.summaryTab.summarySection.modalSectionLocator.waitFor({state: "visible"})

        await page.mouse.move(0, 0)
        await postMeetingPage.tabs.tabPanelLocator.screenshot({ path: "Full material summary tab.png" });
    })

    test('Edit summary functionality : RCV-27075 : FM', async () => {
        const initialSummaryText = await postMeetingPage.tabs.summaryTab.summarySection.getInnerText()
        //Step#1
        await postMeetingPage.tabs.summaryTab.summarySection.editButton.openModal()
        await postMeetingPage.modal.textInput.fill("")
        await expect(postMeetingPage.modal.textInput).toHaveAttribute('placeholder', 'Type your summary here...')
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '0 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#2
        await postMeetingPage.modal.textAreaInput("a", "Enter", 3)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('6 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#3
        await postMeetingPage.modal.textAreaInput("", "Enter", 22)
        await postMeetingPage.modal.isHasScroll()
        await postMeetingPage.modal.isCorrectMaxHeight(248)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('28 / 10000')
        //Step#4
        await postMeetingPage.modal.textAreaInput("", "Backspace", 23)
        await postMeetingPage.modal.isCorrectMinHeight(90)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('5 / 10000')
        //Step#5
        await postMeetingPage.modal.cancelButton.click()
        let currentSummaryText = await postMeetingPage.tabs.summaryTab.summarySection.getInnerText()
        await expect(currentSummaryText).toEqual(initialSummaryText)
        //Step#6
        await postMeetingPage.tabs.summaryTab.summarySection.editButton.openModal()
        //Step#7
        // await postMeetingPage.addEditModal.dragDown()
        // await postMeetingPage.addEditModal.isCorrectMaxHeight()
        //Step#8
        // await postMeetingPage.addEditModal.dragUp()
        // await postMeetingPage.addEditModal.isCorrectMinHeightAfterDrag()
        //Step#9
        await postMeetingPage.modal.textInput.fill("")
        await postMeetingPage.modal.textInput.fill(textExample.longSummaryText10001)
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '10001 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#10-12
        await postMeetingPage.modal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('10000 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        await postMeetingPage.modal.textInput.fill("")
        await postMeetingPage.modal.textInput.fill(textForInput.newString)
        //Step#11
        await page.mouse.click(0,0)
        //Step#12
        let newSummaryText = await postMeetingPage.modal.textInput.textContent()
        await postMeetingPage.modal.doneButton.click()
        await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        currentSummaryText = await postMeetingPage.tabs.summaryTab.summarySection.getInnerText()
        await expect(currentSummaryText).toEqual(newSummaryText)
        await page.screenshot({ path: "RCV-27075.png" });
    })

    test('Edit brief summary functionality : RCV-26956 : FM', async () => {
        const initialBriefSummaryText = await postMeetingPage.tabs.summaryTab.briefSummarySection.getInnerText()
        //Step#1
        await postMeetingPage.tabs.summaryTab.briefSummarySection.editButton.openModal()
        await postMeetingPage.modal.textInput.fill("")
        //Step#2
        await expect(postMeetingPage.modal.textInput).toHaveAttribute('placeholder', 'Type your brief here...')
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '0 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#3
        await postMeetingPage.modal.textAreaInput("a", "Enter", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('2 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#4
        await postMeetingPage.modal.textAreaInput("", "Enter", 4)
        await postMeetingPage.modal.isHasScroll()
        await postMeetingPage.modal.isCorrectMaxHeight(586)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('6 / 200')
        //Step#5
        await postMeetingPage.modal.textAreaInput("", "Backspace", 5)
        await postMeetingPage.modal.isCorrectMinHeight(46)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('1 / 200')
        //Step#6
        await postMeetingPage.modal.cancelButton.click()
        let currentBriefSummaryText = await postMeetingPage.tabs.summaryTab.briefSummarySection.getInnerText()
        await expect(currentBriefSummaryText).toEqual(initialBriefSummaryText)

        //Step#7
        await postMeetingPage.tabs.summaryTab.briefSummarySection.editButton.openModal()
        //Step#8
            //*******
        //Step#9
            //*******
        //Step#10
        await postMeetingPage.modal.textInput.fill(textExample.briefSummaryText201)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('201 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#11
        await postMeetingPage.modal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('200 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        await postMeetingPage.modal.textInput.fill("")
        await postMeetingPage.modal.textInput.fill(textForInput.newString)
        //Step#12
        await page.mouse.click(0,0)
        //Step#13
        let newBriefSummaryText = await postMeetingPage.modal.textInput.textContent()
        await postMeetingPage.modal.doneButton.click()
        await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        currentBriefSummaryText = await postMeetingPage.tabs.summaryTab.briefSummarySection.getInnerText()
        await expect(currentBriefSummaryText).toEqual(newBriefSummaryText)
        await page.screenshot({ path: "RCV-26956.png" });
    })

    test.only('Edit keywords functionality : RCV-26957 : FM', async () => {                      //TBD
        const initialLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordText()
        const countOfKeywords = await postMeetingPage.tabs.summaryTab.keywordSection.getCountOfKeywords()
        //Step#1
        await postMeetingPage.tabs.summaryTab.keywordSection.editButton.openModal()
        await expect(postMeetingPage.modal.letterCounter).toHaveText(`${countOfKeywords} / 15`)
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#2
        await postMeetingPage.modal.deleteKeywordBoxes(1)
        await postMeetingPage.modal.keywordInput.toHaveAttribute('placeholder', 'Add new keyword...')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#3
        await postMeetingPage.modal.cancelButton.click()
        let currentLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordText()

        console.log(currentLastKeywordText);
        await expect.soft(initialLastKeywordText).toEqual(currentLastKeywordText)
        //Step#4
        await postMeetingPage.tabs.summaryTab.keywordSection.editButton.openModal()
        //Step#5
        await postMeetingPage.modal.addKeywordBoxes(textForInput.newString)
        await expect(postMeetingPage.modal.letterCounter).toHaveText(`15 / 15`)
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#6
        await page.mouse.click(0,0)
        //Step#7
        let newLastKeywordText = await postMeetingPage.modal.keywordBox.last().textContent()
        await postMeetingPage.modal.doneButton.click()
        await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        currentLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordText()
        await expect.soft(currentLastKeywordText).toEqual(newLastKeywordText)
        await page.screenshot({ path: "RCV-26957.png" });

    })             //TBD
})




