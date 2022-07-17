import { test } from "@playwright/test";
import {PostMeetingPage} from "../../pageObject/PostMeeting.page.js";

import URL from "../../utils/recording-URL.js";

test.describe('Karaoke mode tests. Demo server', async () => {

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
    test('Karaoke mode functionality : RCV-24472', async () => {
        await postMeetingPage.player.footer.playerFooterLocator.waitFor({state: "visible"})
        await postMeetingPage.tabs.summaryTab.tabIsActive()
        await postMeetingPage.tabs.transcriptTab.clickOnTab()
        await postMeetingPage.tabs.transcriptTab.tabIsActive()
        await postMeetingPage.player.footer.playButton.buttonLocator.click()
        for(let i = 0; i < 3; i++)                                                 //test first 3 words in a row
            await postMeetingPage.tabs.transcriptTab.karaokeModeFunction(i, 0)
        //Playback stopped
        await postMeetingPage.player.footer.playButton.buttonLocator.click()
        const randomIndex = await postMeetingPage.tabs.transcriptTab.randomIndex()
        //add hover for button display
        await postMeetingPage.tabs.transcriptTab.clickReplayTranscriptButton(randomIndex)
        //Playback started
        for(let i = 0; i < 3; i++)                                                 //test first 3 words in a row
        await postMeetingPage.tabs.transcriptTab.karaokeModeFunction(i, randomIndex)
        await postMeetingPage.player.footer.playButton.buttonLocator.click()
    })      //TBD
})
