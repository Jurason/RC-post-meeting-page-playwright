import {test} from "@playwright/test";


test('Test', async ({page}) => {
    await page.goto('https://playwright.dev/docs/locators')
    const items = await page.locator('.anchor')
    const count = await items.count()
    let randomIndexLocator = Math.floor(Math.random()*count)
    console.log(`random number is ${randomIndexLocator}`);
    console.log(await items.nth(randomIndexLocator).textContent());
    console.log(await items.nth(0).textContent());
    console.log('**********************');
    // await items.nth(5).textContent()
    for(let i = 0; i < count; i++)
        console.log(await items.nth(i).textContent());
})