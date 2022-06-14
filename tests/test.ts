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

    test('RCV-26717 Tabs UI', async ({page}) => {
        const postMeetingPage = new PostMeetingPage(page)
        await postMeetingPage.openRecordingWithMaterial()

        //Is active tab?
        await postMeetingPage.allTabsIsDisplayed()
        await postMeetingPage.isActiveTab(postMeetingPage.summaryTab)
        await postMeetingPage.activeTabUI(postMeetingPage.summaryTab, "color", "#066FAC")
        //is it work?
        // postMeetingPage.activeTabUI(postMeetingPage.summaryTab, ["color","bottom-border"], ["#066FAC","1px"])
        await page.screenshot({ path: "RCV-26717.png" });
    })

    test('RCV-27075 Edit summary functionality', async ({page}) => {
        const postMeetingPage : PostMeetingPage = new PostMeetingPage(page)
        await postMeetingPage.openRecordingWithMaterial()

        const initialStateContent = await postMeetingPage.summaryContainerContent

        //Step#1
        await postMeetingPage.openEditSummaryModal()
        await postMeetingPage.addEditModal.textArea.fill("")
        await expect(postMeetingPage.addEditModal.textArea).toHaveAttribute('placeholder', 'Type your summary here...')
        await expect(postMeetingPage.addEditModal.counter).toHaveAttribute('textContent', '0/10000') //Counter 0/10000
        await expect(postMeetingPage.addEditModal.doneButton).not.toBeEnabled()

        //Step#2
        await postMeetingPage.addEditModal.textAreaInput("a", "Enter", 3)
        await expect(postMeetingPage.addEditModal.counter).toHaveAttribute('textContent', '5/10000') //Counter 5/10000
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()

        //Step#3
        await postMeetingPage.addEditModal.textAreaInput("", "Enter", 26)
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "653.44 px") //Check
        await expect(postMeetingPage.addEditModal.counter).toHaveAttribute('textContent', '31/10000')

        //Step#4
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 26)
        // await expect(postMeetingPage.addEditModal.modalLocator).toHaveCSS("textarea-height", "92 px") //Check
        await expect(postMeetingPage.addEditModal.counter).toHaveAttribute('textContent', '31/10000')

        //Step#5
        await postMeetingPage.addEditModal.cancelButton.click()
        const processStateContent1 : string = await postMeetingPage.summaryContainerContent
        await expect(initialStateContent).toEqual(processStateContent1)

        //Step#6
        await postMeetingPage.openEditSummaryModal()

        //Step#7
                //DragTo
        //Step#8
                //DragTo

        //Step#9
        await postMeetingPage.addEditModal.textArea.fill("")
        await postMeetingPage.addEditModal.textArea.type(Array(10001).join('a'))
        await expect(postMeetingPage.addEditModal.counter).toHaveAttribute('', '10001/10000')
        await expect(postMeetingPage.addEditModal.doneButton).not.toBeEnabled()

        //Step#10
        await postMeetingPage.addEditModal.textAreaInput("", "Backspace", 1)
        await expect(postMeetingPage.addEditModal.textArea).toHaveAttribute('textContent', '10000/10000')
        await expect(postMeetingPage.addEditModal.doneButton).toBeEnabled()

        //Step#11
        await page.locator("Space-around-modal-selector").click() // Change selector

                //Nothing happened ???

        //**
        await postMeetingPage.addEditModal.textArea.fill("New summary has added just now")
        const textAreaContent : string = "New summary has added just now"
        //**

        //Step#12
        await postMeetingPage.addEditModal.doneButton.click()
        const processStateContent2 = await postMeetingPage.summaryContainerContent
        await expect(textAreaContent).toEqual(processStateContent2)

    })

    // test('*****', async ({page}) => {
    //
    //
    //
    // })
})












