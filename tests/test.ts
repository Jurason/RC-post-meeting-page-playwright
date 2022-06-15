import {chromium, expect, test, Page} from "@playwright/test";
import {PostMeetingPage} from "../pageObject/PostMeeting.page";
import {LoginPage} from "../pageObject/Login.page";


test.describe('Demo server', async () => {

    test.beforeEach(async ({page}) => {
        page.context().grantPermissions(['camera', 'microphone'])
        const login = new LoginPage(page)                       //Re-wright using API. POST credential directly to server
        await login.open()
        await login.login()
        await page.locator("text=Recordings").click()
    })

    test.skip('RCV-26717 Tabs UI', async ({page}) => {
        const postMeetingPage = new PostMeetingPage(page)
        await postMeetingPage.openRecordingWithMaterial()

        // await postMeetingPage.activeTabUI(postMeetingPage.summaryTab)
        // await postMeetingPage.allTabsIsDisplayed()

        await postMeetingPage.isActiveTab(postMeetingPage.summaryTab)

        await page.screenshot({ path: "RCV-26717.png" });

    })

    test('RCV-27075 Edit summary functionality', async ({page}) => {
        const postMeetingPage = new PostMeetingPage(page)
        await postMeetingPage.openRecordingWithMaterial()

        const initialStateContent = await postMeetingPage.summaryContainer.innerText()

        //Step#1
        await postMeetingPage.openEditSummaryModal()
        await postMeetingPage.addEditModal.textArea.fill("")
        await expect(postMeetingPage.addEditModal.textArea).toHaveAttribute('placeholder', 'Type your summary here...')
        await expect(postMeetingPage.addEditModal.counter).toHaveText( '0 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).not.toBeEnabled()

        //Step#2
        await postMeetingPage.addEditModal.textAreaInput("a", "Enter", 3)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('6 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()

        //Step#3
        await postMeetingPage.addEditModal.textAreaInput("", "Enter", 26)
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "653.44 px") //Check
        await expect(postMeetingPage.addEditModal.counter).toHaveText('32 / 10000')

        //Step#4
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 26)
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "92 px") //Check
        await expect(postMeetingPage.addEditModal.counter).toHaveText('6 / 10000')

        //Step#5
        await postMeetingPage.addEditModal.cancelButton.click()
        const processStateContent1 = await postMeetingPage.summaryContainer.innerText()

        try{
            await expect(initialStateContent).toEqual(processStateContent1)
            console.log("Texts matches")
        } catch (e) {
            return console.log("Something wrong")
        }

        //Step#6
        await postMeetingPage.openEditSummaryModal()
    //
    //     //Step#7
    //             //DragTo
    //     //Step#8
    //             //DragTo
    //
        //Step#9
        await postMeetingPage.addEditModal.textArea.fill("")
        await postMeetingPage.addEditModal.textArea.fill(Array(501).join('aaaaaaaaaaaaaaaaaaaa')) //Replace by pasting whole text with 10001 characters
        await postMeetingPage.addEditModal.textArea.type(Array(2).join('a'))
        await expect(postMeetingPage.addEditModal.counter).toHaveText('10001 / 10000')
        await expect(postMeetingPage.addEditModal.doneButton).not.toBeEnabled()

        //Step#10-12
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 3)
        await expect(postMeetingPage.addEditModal.counter).toHaveText('9998 / 10000')
        await postMeetingPage.addEditModal.textArea.fill("")
        await postMeetingPage.addEditModal.textArea.type("New summary has added just nowwww") //Add Data provider, for creating different sentence
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()

        //Step#11
        await page.mouse.click(20,20)

        //Step#12
        await postMeetingPage.addEditModal.doneButton.click()


        // const textAreaContent : string = "New summary has added just now"

        // const processStateContent2 = await postMeetingPage.summaryContainer.innerText()
        // console.log(processStateContent2)

        // try{
        //     await expect(textAreaContent).toEqual(processStateContent2)
        //     console.log("Texts matches")
        // } catch (e) {
        //     return console.log("Something wrong")
        // }
        page.waitForLoadState("domcontentloaded")
        await page.screenshot({ path: "RCV-27075.png" });

    //
    // })

    // test('*****', async ({page}) => {
    //
    //
    //
    })
})












