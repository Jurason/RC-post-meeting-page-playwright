import {chromium, expect, request, test} from "@playwright/test";
import loginData from "../utils/login-data.js";

const meetingId = '5515f377-acd8-4b53-9ad2-248095d5c3ad!us-13-pdx12@us-13'
const LOGIN_INFO_REQUEST_URL = 'https://login.ringcentral.com/api/login-info'
const LOGIN_REQUEST_URL = 'https://login.ringcentral.com/api/login'
const GENERATE_CODE_URL = 'https://login.ringcentral.com/api/generate-code'
const CHECK_LOGIN_URL = 'https://login.ringcentral.com/api/check-login'
const OATH_TOKEN_URL = 'https://platform.ringcentral.com/restapi/oauth/token'
const DEMO_WELCOME_PAGE = 'https://demo-ai-wi.lab.nordigy.ru/welcome/join'
const DEMO_RECORDING_PAGE = `https://demo-ai-wi.lab.nordigy.ru/welcome/meetings/recordings/recording/${meetingId}`

const PAGE_INFO_URL = `https://api-meet.ringcentral.com/rcvideo/v1/history/meetings/${meetingId}`
const SUMMARY_INFO_URL = `https://api-meet.ringcentral.com/rcvideo/meeting-notes/v1/meetings/${meetingId}/summary`
const TRANSCRIPT_INFO_URL = `https://api-meet.ringcentral.com/rcvideo/meeting-notes/v1/meetings/${meetingId}/transcripts`

const PLAYER_SELECTOR = '.Player'

let page;
let context;
let pageInfoInitial;
let summaryInfoInitial;
let transcriptInfoInitial;
let pageInfoCurrent;
let summaryInfoCurrent;
let transcriptInfoCurrent;

test.describe('Simple API test',async() => {
    test.beforeAll(async({browser}) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.on('response', async response => {
            if (response.url() === PAGE_INFO_URL) pageInfoInitial = await response.json()
            if (response.url() === SUMMARY_INFO_URL) summaryInfoInitial = await response.json()
            if (response.url() === TRANSCRIPT_INFO_URL) transcriptInfoInitial = await response.json()
        })
        await Promise.all([
            page.waitForResponse(PAGE_INFO_URL),
            page.waitForResponse(SUMMARY_INFO_URL),
            page.waitForResponse(TRANSCRIPT_INFO_URL),
            await page.goto(DEMO_RECORDING_PAGE),
            await page.locator('button', {hasText: "Continue"}).click(),
            await page.locator("button.btn.btn-primary").click(),
            await page.locator("button.btn.btn-primary").click(),
            await page.locator(PLAYER_SELECTOR).waitFor({state:'visible'})
        ]);
        while(pageInfoInitial === undefined || summaryInfoInitial === undefined || transcriptInfoInitial === undefined){
            await page.reload()
            await page.locator(PLAYER_SELECTOR).waitFor({state:'visible'})
        }
        await expect(pageInfoInitial !== undefined, 'pageInfoInitial is undefined').toBeTruthy()
        await expect(summaryInfoInitial !== undefined, 'summaryInfoInitial is undefined').toBeTruthy()
        await expect(transcriptInfoInitial !== undefined, 'transcriptInfoInitial is undefined').toBeTruthy()
    })
    test.beforeEach(async()=> {
        page = await context.newPage()
        await page.on('response', async response => {
            if (response.url() === PAGE_INFO_URL) pageInfoCurrent = await  response.json()
            if (response.url() === SUMMARY_INFO_URL) summaryInfoCurrent = await  response.json()
            if (response.url() === TRANSCRIPT_INFO_URL) transcriptInfoCurrent = await  response.json()
        })
        await Promise.all([
            page.waitForResponse(PAGE_INFO_URL),
            page.waitForResponse(SUMMARY_INFO_URL),
            page.waitForResponse(TRANSCRIPT_INFO_URL),
            await page.goto(DEMO_RECORDING_PAGE),
            await page.waitForTimeout(2000)
        ])
    })
    test('Page info testing', async () => {
        await expect(pageInfoInitial).toEqual(pageInfoCurrent)
    })
    test('Summary content testing', async () => {
        await expect(summaryInfoInitial).toEqual(summaryInfoCurrent)
    })
    test('Transcript content testing', async () => {
        await expect(transcriptInfoInitial).toEqual(transcriptInfoCurrent)
    })
})
