import {chromium, expect, test, request} from "@playwright/test";
import {PostMeetingPage} from "../../pageObject/PostMeeting.page.js";

import randomstring from "randomstring";
import URL from "../../utils/recording-URL.js";
import textForInput from "../../utils/text-for-input.js";

//***************************************NO MATERIAL******************************//

test.describe('Demo server', async () => {

    let page;
    let postMeetingPage;

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext()
        page = await context.newPage()
        await page.goto(URL.noMaterialRecordingDemo)
        //need to fix. maybe https://playwright.dev/docs/auth#session-storage
        await page.locator('button', {hasText: "Continue"}).click()
        await page.locator("button.btn.btn-primary").click()
        await page.locator("button.btn.btn-primary").click()
    })

    test.beforeEach(async () => {
        postMeetingPage = await new PostMeetingPage(page)
    })

    test('Post meeting page UI : RCV-25017 : NoM', async () => {
        await postMeetingPage.header.headerlocator.waitFor({state: "visible"})
        await postMeetingPage.player.playerLocator.waitFor({state: "visible"})
        await postMeetingPage.tabs.tabPanelLocator.waitFor({state: "visible"})
        //Add "about" or "material status" locator
        await page.screenshot({ path: "No material post-meeting-page layout.png" });
    })

    test('Summary tab UI : RCV-26737 : NoM', async () => {
        await postMeetingPage.tabs.summaryTab.tabIsActive()
        await postMeetingPage.tabs.summaryTab.moMaterialSection.noMaterialSectionLocator.waitFor({state: 'visible'})
        await postMeetingPage.tabs.summaryTab.moMaterialSection.imageNoSummaryAvailable.waitFor({state: 'visible'})
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addSummaryButton.buttonLocator.waitFor({state: 'visible'})
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addBriefSummaryAndKeywordsButton.buttonLocator.waitFor({state: 'visible'})
        await postMeetingPage.tabs.tabPanelLocator.screenshot({ path: "No material summary tab.png" });
    })

    test('Transcript tab UI : RCV-26745 : NoM', async () => {
        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        await postMeetingPage.tabs.transcriptTab.tabIsActive()
        await postMeetingPage.tabs.transcriptTab.imageNoTranscriptAvailable.waitFor({state: 'visible'})
        await postMeetingPage.tabs.tabPanelLocator.screenshot({ path: "No material transcript tab.png" });
    })

    test('Highlights tab UI : RCV-26741 : NoM', async () => {
        await postMeetingPage.tabs.highlightsTab.clickOnTab()
        await postMeetingPage.tabs.highlightsTab.tabIsActive()
        await postMeetingPage.tabs.highlightsTab.imageNoHighlightsAvailable.waitFor({state: 'visible'})
        await postMeetingPage.tabs.tabPanelLocator.screenshot({ path: "No material highlights tab.png" });
    })

    test('Add brief summary and keywords functionality : RCV-26955 : NoM', async () => {
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addBriefSummaryAndKeywordsButton.openModal()
        //Step#1
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '0 / 200')
        await expect(postMeetingPage.modal.textInput).toHaveAttribute('placeholder', 'Type your brief here...')
        await expect(await postMeetingPage.modal.getCountOfKeywords()).toEqual(0)
        await expect(postMeetingPage.modal.keywordBoxCounter).toHaveText(`0 / 15`)
        await expect(postMeetingPage.modal.keywordInput).toHaveAttribute('placeholder', 'Add new keyword...')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#2-3
        await postMeetingPage.modal.textAreaInput(`${randomstring.generate(1)}`, 'Enter', 1)
        await postMeetingPage.modal.textAreaInput('', 'Enter', 4)
        await postMeetingPage.modal.isHasScroll()
        await postMeetingPage.modal.isCorrectMaxHeight(584)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('6 / 200')
        //Step#4
        await postMeetingPage.modal.textAreaInput("", "Backspace", 5)
        await postMeetingPage.modal.isCorrectMinHeight(48)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('1 / 200')
        //Step#5-6
                                    //****
        await postMeetingPage.modal.isVerticalResizable()
                                    //****
        //Step#7
        await postMeetingPage.modal.addKeywordBox(1, `${randomstring.generate(6)}`)
        await expect(postMeetingPage.modal.keywordBoxCounter).toHaveText(`1 / 15`)
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#8
        await postMeetingPage.modal.cancelButton.click()
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addBriefSummaryAndKeywordsButton.buttonLocator.waitFor({state: 'visible'})
        //Step#9
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addBriefSummaryAndKeywordsButton.openModal()
        //Step#10
        await postMeetingPage.modal.textInput.fill(textForInput.briefSummaryText201)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('201 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#11
        await postMeetingPage.modal.addMaxNumberOfKeywordBoxes(`${randomstring.generate(6)}`)
        await expect(postMeetingPage.modal.keywordBoxCounter).toHaveText(`15 / 15`)
        //Step#12
        await postMeetingPage.modal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('200 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#13
        await page.mouse.click(0,0)
        //Step#14
        let modalBriefSummaryText = await postMeetingPage.modal.textInput.textContent()
        let modalLastKeywordText = await postMeetingPage.modal.getLastKeywordBoxText()
        await postMeetingPage.modal.cancelButton.click()
        // await postMeetingPage.modal.doneButton.click()
        // await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        // let sectionBriefSummaryText = await postMeetingPage.tabs.summaryTab.briefSummarySection.getInnerText()
        // let sectionLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordBoxText()
        // await expect(modalBriefSummaryText).toEqual(sectionBriefSummaryText)
        // await expect(modalLastKeywordText).toEqual(sectionLastKeywordText)
    })

    test('Add summary: RCV-26949 : NoM', async () => {
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addSummaryButton.openModal()
        //Step#1
        await expect(postMeetingPage.modal.textInput).toHaveAttribute('placeholder', 'Type your summary here...')
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '0 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#2
        await postMeetingPage.modal.textAreaInput(`${randomstring.generate(1)}`, "Enter", 3)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('6 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#3
        await postMeetingPage.modal.textAreaInput("", "Enter", 22)
        await postMeetingPage.modal.isHasScroll()
        await postMeetingPage.modal.isCorrectMaxHeight(246)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('28 / 10000')
        //Step#4
        await postMeetingPage.modal.textAreaInput("", "Backspace", 23)
        await postMeetingPage.modal.isCorrectMinHeight(92)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('5 / 10000')
        //Step#5
        await postMeetingPage.modal.cancelButton.click()
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addSummaryButton.buttonLocator.waitFor({state: 'visible'})
        //Step#6
        await postMeetingPage.tabs.summaryTab.moMaterialSection.addSummaryButton.openModal()
        //Step#7
        //****
        await postMeetingPage.modal.isVerticalResizable()
        //****
        // await postMeetingPage.addEditModal.dragDown()
        // await postMeetingPage.addEditModal.isCorrectMaxHeight()
        //Step#8
        // await postMeetingPage.addEditModal.dragUp()
        // await postMeetingPage.addEditModal.isCorrectMinHeightAfterDrag()
        //Step#9
        await postMeetingPage.modal.textInput.fill(textForInput.longSummaryText10001)
        await expect(postMeetingPage.modal.letterCounter).toHaveText( '10001 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#10-12
        await postMeetingPage.modal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('10000 / 10000')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        await postMeetingPage.modal.textInput.fill("")
        await postMeetingPage.modal.textInput.fill(`${randomstring.generate(25)}`)
        //Step#11
        await page.mouse.click(0,0)
        //Step#12
        let modalSummaryText = await postMeetingPage.modal.textInput.textContent()
        // await postMeetingPage.modal.doneButton.click()
        // await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        // let sectionSummaryText = await postMeetingPage.tabs.summaryTab.summarySection.getInnerText()
        // await expect(sectionSummaryText).toEqual(modalSummaryText)
        // await page.screenshot({ path: "RCV-26949.png" });
    })

})