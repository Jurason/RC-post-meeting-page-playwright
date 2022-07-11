import { expect, test } from "@playwright/test";
import {PostMeetingPage} from "../../pageObject/PostMeeting.page.js";

import URL from "../../utils/recording-URL.js";

test.describe('Full material functional transitions tests. Demo server', async () => {

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
        postMeetingPage = await new PostMeetingPage(page)
    })
    test('"Keyword" button functionality : RCV-26788 : FM', async () => {   //проверяю только переход на табу и заполенение инпута
        await postMeetingPage.tabs.summaryTab.tabIsActive()
        await postMeetingPage.tabs.summaryTab.keywordSection.clickRandomKeyword()
        await postMeetingPage.tabs.transcriptTab.tabIsActive()
        await postMeetingPage.tabs.transcriptTab.navigationToggle.toggleLocator.waitFor({state: 'visible'})
        await postMeetingPage.tabs.transcriptTab.buttonClearSearchInput.waitFor({state: "visible"})
        let currentToggleText = await postMeetingPage.tabs.transcriptTab.navigationToggle.getToggleText()
        while(currentToggleText === 'No results'){
            await postMeetingPage.tabs.summaryTab.clickOnTab()
            await postMeetingPage.tabs.summaryTab.keywordSection.clickRandomKeyword()
            await postMeetingPage.tabs.transcriptTab.tabIsActive()
            await postMeetingPage.tabs.transcriptTab.navigationToggle.toggleLocator.waitFor({state: 'visible'})
            await postMeetingPage.tabs.transcriptTab.buttonClearSearchInput.waitFor({state: "visible"})
            currentToggleText = await postMeetingPage.tabs.transcriptTab.navigationToggle.getToggleText()
        }
        let currentSearchInputValue = await postMeetingPage.tabs.transcriptTab.getSearchInputValue()
        let highlightedPhrase = await postMeetingPage.tabs.transcriptTab.getHighlightedPhrase()
        await expect(highlightedPhrase.toLowerCase()).toEqual(currentSearchInputValue)
    })  //TBD

})
