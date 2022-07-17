import {chromium, request} from '@playwright/test';
import {LoginPage} from "page-object/login-page.js";

// async function globalSetup(config) {
//     const { storageState } = config.projects[0].use;
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     const login = new LoginPage(page)
//     await login.login()
//     await page.context().storageState({ path: storageState });
//     await browser.close();
// }
// export default globalSetup;

async function globalSetup(config) {
    const { storageState } = config.projects[0].use;
    const requestContext = await request.newContext()
    await requestContext.post('https://login.ringcentral.com/api/login', {
        data: {
                "username": "valkeare@inbox.ru",
                "password": "Tst123123",
                "brandId": 1210,
                "clientId": "htPeaGLLSsy4ssTPpjCdtg",
                "appUrlScheme": "https://demo-ai-wi.lab.nordigy.ru/welcome/join",
            }
        })
    await requestContext.storageState({ path: storageState });
    await requestContext.dispose()
}
export default globalSetup;

