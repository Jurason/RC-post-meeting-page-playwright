import {expect, test} from "@playwright/test";



test.describe('No materials', () => {


    test('should allow me to add todo items', async ({ page }) => {
        await page.goto("https://rozetka.com.ua/")
        // const eleName = page.locator("button.header__button.ng-star-inserted")
        // await eleName.first().click()
        // page.waitForEvent('popup')
        // page.waitForSelector("div.modal__holder.modal__holder_show_animation.modal__holder--medium")
        const modal = page.locator("input[name='search']")
        // await modal.fill("paper")
        // await modal.press("Enter")
        // const dropdown = page.locator("select.select-css.ng-untouched")
        // await dropdown.selectOption({value: "1: cheap"})
        // await expect(modal).toBeEmpty()
        // console.log("Input is empty")
        // await expect(modal).toHaveAttribute('placeholder', 'Я ищу..')
        // console.log("Placeholder is matched to design")

        await modal.type(Array(10).join('a'))
        await page.screenshot({ path: "array.join.png" });
    });
});