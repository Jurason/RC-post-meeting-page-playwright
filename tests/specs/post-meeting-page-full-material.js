import { expect, test } from "@playwright/test";
import {PostMeetingPage} from "page-object/post-meeting-page.js";

import URL from "../../utils/recording-URL.js";
import textForInput from "../../utils/text-for-input.js";
import randomstring from "randomstring";

const PAGE_INFO_URL = `https://api-meet.ringcentral.com/rcvideo/v1/history/meetings/${URL.fullMaterialRecordingDemo.split('/').slice(-1)}`
let pageInfo;

test.describe('Full material functional tests. Demo server', async () => {

    let page;
    let postMeetingPage;

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext()
        page = await context.newPage()
        await page.on('response', async response => {
            if (response.url() === PAGE_INFO_URL) pageInfo = await response.json()
        })
        await page.goto(URL.fullMaterialRecordingDemo)
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
        let currentSummaryText = await postMeetingPage.tabs.summaryTab.summarySection.getInnerText()
        await expect(currentSummaryText).toEqual(initialSummaryText)
        //Step#6
        await postMeetingPage.tabs.summaryTab.summarySection.editButton.openModal()
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
        await postMeetingPage.modal.textInput.fill("")
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
        await postMeetingPage.modal.isCorrectMaxHeight(584)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('6 / 200')
        //Step#5
        await postMeetingPage.modal.textAreaInput("", "Backspace", 5)
        await postMeetingPage.modal.isCorrectMinHeight(48)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('1 / 200')
        //Step#6
        await postMeetingPage.modal.cancelButton.click()
        let currentBriefSummaryText = await postMeetingPage.tabs.summaryTab.briefSummarySection.getInnerText()
        await expect(currentBriefSummaryText).toEqual(initialBriefSummaryText)

        //Step#7
        await postMeetingPage.tabs.summaryTab.briefSummarySection.editButton.openModal()
        //Step#8-9
                                //****
        await postMeetingPage.modal.isVerticalResizable()
                                //****
        //Step#10
        await postMeetingPage.modal.textInput.fill(textForInput.briefSummaryText201)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('201 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#11
        await postMeetingPage.modal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.modal.letterCounter).toHaveText('200 / 200')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        await postMeetingPage.modal.textInput.fill("")
        await postMeetingPage.modal.textInput.fill(`${randomstring.generate(15)}`)
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

    test('Edit keywords functionality : RCV-26957 : FM', async () => {
        const initialLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordBoxText()
        const countOfKeywords = await postMeetingPage.tabs.summaryTab.keywordSection.getCountOfKeywords()
        //Step#1
        await postMeetingPage.tabs.summaryTab.keywordSection.editButton.openModal()
        await expect(postMeetingPage.modal.keywordBoxCounter).toHaveText(`${countOfKeywords} / 15`)
        await expect(postMeetingPage.modal.doneButton).toBeDisabled()
        //Step#2
        await postMeetingPage.modal.deleteKeywordBoxes(1)
        await expect(postMeetingPage.modal.keywordInput).toHaveAttribute('placeholder', 'Add new keyword...')
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#3
        await postMeetingPage.modal.cancelButton.click()
        let currentLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordBoxText()

        await expect(initialLastKeywordText).toEqual(currentLastKeywordText)
        //Step#4
        await postMeetingPage.tabs.summaryTab.keywordSection.editButton.openModal()
        //Step#5
        await postMeetingPage.modal.addMaxNumberOfKeywordBoxes(`${randomstring.generate(8)}`)
        await expect(postMeetingPage.modal.keywordBoxCounter).toHaveText(`15 / 15`)
        await expect(postMeetingPage.modal.doneButton).toBeEnabled()
        //Step#6
        await page.mouse.click(0,0)
        //Step#7
        let newLastKeywordText = await postMeetingPage.modal.keywordBoxInput.inputValue()
        await postMeetingPage.modal.doneButton.click()
        await postMeetingPage.modal.modalLocator.waitFor({state:'hidden'})
        currentLastKeywordText = await postMeetingPage.tabs.summaryTab.keywordSection.getLastKeywordBoxText()
        await expect(currentLastKeywordText).toEqual(newLastKeywordText)
        await page.screenshot({ path: "RCV-26957.png" });
    })

    test.skip('Highlights list element functionality : RCV-27442 : FM', async () => {

    })  //TBD

    test.skip('Highlights search functionality : RCV-20928 : FM', async () => {

    })  //TBD

    test.skip('Transcript list element functionality : RCV-26801 : FM', async () => {
        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        const phraseParticipantName = await postMeetingPage.tabs.transcriptTab.getParticipantName(0)
        const dropDownParticipants = await pageInfo.participants.map(x => x = x.displayName)
        await expect(await dropDownParticipants.findIndex(name => name === phraseParticipantName) !== -1).toBeTruthy()
        // await postMeetingPage.player.footer.playButton.hover()
        // await postMeetingPage.player.footer.playButton.click()
        // await postMeetingPage.player.footer.pauseButton.waitFor({state: "visible"})
        // await postMeetingPage.player.footer.pauseButton.hover()
        // await postMeetingPage.player.footer.pauseButton.click()
        let randomIndex = await postMeetingPage.tabs.transcriptTab.randomIndex()
        while(await postMeetingPage.tabs.transcriptTab.isAddedToHighlights(randomIndex)){
            randomIndex = await postMeetingPage.tabs.transcriptTab.randomIndex()
        }
        await postMeetingPage.tabs.transcriptTab.clickReplayTranscriptButton(randomIndex)
        // await postMeetingPage.player.footer.pauseButton.waitFor({state: "visible"})
        // await postMeetingPage.tabs.highlightsTab.clickOnTab()
        // await postMeetingPage.tabs.highlightsTab.deleteAllHighlights()          //удалять через API
        // await postMeetingPage.tabs.transcriptTab.clickOnTab()
        let phraseContent = await postMeetingPage.tabs.transcriptTab.getPhraseTextContent(randomIndex)
        await postMeetingPage.tabs.transcriptTab.transcriptPhraseTextContent.nth(randomIndex).click({clickCount:3})
        await postMeetingPage.tabs.transcriptTab.clickCreateDeleteHighlightButton()
        await postMeetingPage.tabs.highlightsTab.clickOnTab()
        console.log('phraseContent:', phraseContent)
        await page.pause()
        let highlightsTextContent = await postMeetingPage.tabs.highlightsTab.highlightPhraseTextContent.allTextContents()
        console.log('highlightsTextContent:', highlightsTextContent)
        await expect.soft(await highlightsTextContent.findIndex(phrase => phrase.includes(phraseContent)) !== -1).toBeTruthy()

        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        await expect.soft(await postMeetingPage.tabs.transcriptTab.isAddedToHighlights(randomIndex)).toEqual(true)
        await postMeetingPage.tabs.transcriptTab.transcriptPhraseTextContent.nth(randomIndex).click({clickCount:3})
        await postMeetingPage.tabs.transcriptTab.clickCreateDeleteHighlightButton()

        //copy functionality
        //select part of the phrase, using mouse
    })  //TBD

    test('Transcript search functionality : RCV-26748 : FM', async () => {
        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput.fill("")
        await expect(postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput).toHaveAttribute('placeholder', 'Search')
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput.fill("Yes")
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.buttonClearSearchInput.waitFor({state: "visible"})
        await postMeetingPage.tabs.transcriptTab.navigationToggle.toggleLocator.waitFor({state: 'visible'})
        await postMeetingPage.tabs.transcriptTab.highlightedPhrase.first().waitFor({state: "visible"})
        await expect(postMeetingPage.tabs.transcriptTab.navigationToggle.upButton).toBeEnabled()
        await expect(postMeetingPage.tabs.transcriptTab.navigationToggle.downButton).toBeEnabled()
        let maxToggleCounter = await postMeetingPage.tabs.transcriptTab.navigationToggle.getMaxToggleCounter()
        let currentToggleCounter = await postMeetingPage.tabs.transcriptTab.navigationToggle.getCurrentToggleCounter()
        for (let i = 0; i < maxToggleCounter; i++) {
            await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput.press('Enter')
            await postMeetingPage.tabs.transcriptTab.highlightedPhrase.first().waitFor({state: "visible"})
            currentToggleCounter = await postMeetingPage.tabs.transcriptTab.navigationToggle.getCurrentToggleCounter()
            if(i === maxToggleCounter -1) {await expect(currentToggleCounter).toEqual(1)}
            else {await expect(currentToggleCounter).toEqual(i + 2)}
        }
        await postMeetingPage.tabs.transcriptTab.navigationToggle.downButton.click()
        currentToggleCounter = await postMeetingPage.tabs.transcriptTab.navigationToggle.getCurrentToggleCounter()
        await expect(currentToggleCounter).toEqual(2)
        await postMeetingPage.tabs.transcriptTab.navigationToggle.upButton.click()
        await postMeetingPage.tabs.transcriptTab.navigationToggle.upButton.click()
        currentToggleCounter = await postMeetingPage.tabs.transcriptTab.navigationToggle.getCurrentToggleCounter()
        await expect(currentToggleCounter).toEqual(maxToggleCounter)
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.buttonClearSearchInput.click()
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput.press('Backspace')       //two symbols
        await postMeetingPage.tabs.transcriptTab.navigationToggle.toggleLocator.waitFor({state: 'hidden'})
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput.fill('yyy')
        let currentToggleText = await postMeetingPage.tabs.transcriptTab.navigationToggle.getToggleText()
        await expect(currentToggleText).toEqual('No results')
    })

    test('Search by keywords in transcript : RCV-20925 : FM', async () => {
        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        //"Expand" button functionality
        let keywordCountBefore = await postMeetingPage.tabs.transcriptTab.getCountOfKeywords()
        let keywordContainerHeightBefore = await postMeetingPage.tabs.transcriptTab.keywordsContainer.evaluate(node => node.clientHeight)
        await postMeetingPage.tabs.transcriptTab.expandKeywordsButton.click()
        let keywordCountAfter = await postMeetingPage.tabs.transcriptTab.getCountOfKeywords()
        let keywordContainerHeightAfter = await postMeetingPage.tabs.transcriptTab.keywordsContainer.evaluate(node => node.clientHeight)
        await expect(keywordCountBefore < keywordCountAfter).toBeTruthy()
        await expect(keywordContainerHeightBefore < keywordContainerHeightAfter).toBeTruthy()
        //
        let randomIndex, keywordText, currentToggleText, currentSearchInputValue, highlightedPhrase;
        for(let i = 0; i < 2; i++) {
            do{
                randomIndex = await postMeetingPage.tabs.transcriptTab.randomIndexKeyword()
                keywordText = await postMeetingPage.tabs.transcriptTab.getKeywordText(randomIndex)
                await postMeetingPage.tabs.transcriptTab.clickKeyword(randomIndex)
                await postMeetingPage.tabs.transcriptTab.navigationToggle.toggleLocator.waitFor({state: 'visible'})
                currentToggleText = await postMeetingPage.tabs.transcriptTab.navigationToggle.getToggleText()
            } while (currentToggleText === 'No results')
            await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.buttonClearSearchInput.waitFor({state: "visible"}) //wait for search input load
            await postMeetingPage.tabs.transcriptTab.highlightedPhrase.first().waitFor({state: "visible"})
            await expect(postMeetingPage.tabs.transcriptTab.navigationToggle.upButton).toBeEnabled()
            await expect(postMeetingPage.tabs.transcriptTab.navigationToggle.downButton).toBeEnabled()
            currentSearchInputValue = await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.getSearchInputValue()
            await expect(currentSearchInputValue).toEqual(keywordText)
            highlightedPhrase = await postMeetingPage.tabs.transcriptTab.getHighlightedPhrase()
            await expect(highlightedPhrase.toLowerCase()).toEqual(currentSearchInputValue)
        }
        await postMeetingPage.tabs.transcriptTab.searchDownloadContainer.buttonClearSearchInput.click()
        await expect(postMeetingPage.tabs.transcriptTab.searchDownloadContainer.searchInput).toBeEmpty()
    })
})




