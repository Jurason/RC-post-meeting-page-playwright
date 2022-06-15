import {expect, test} from "@playwright/test";
import {TestClass} from "../pageObject/test.page";
import {MarketplacePageClass} from "../pageObject/test.marketplace.page";


const path : string = "https://www.opencart.com/index.php?route=common/home"
const path2 : string = "https://www.opencart.com/index.php?route=marketplace/extension"


test.describe('No materials', () => {

    test('should allow me to add todo items', async ({ page }) => {
        await page.goto(path)
        // const header = await page.locator("div.container", {has: page.locator("div.navbar-header")})
        // const featuresTab = await header.locator("a", {hasText: "Features"})
        // await featuresTab.click()
        // page.waitForLoadState()

        // const testClass = new TestClass(page)
        // const featuresTab = await testClass.header.locator("a", {hasText: "Features"})
        // await featuresTab.click()
        // page.waitForLoadState()

        // const testClass = new TestClass(page)
        // await testClass.featuresTab.click()

        // const allTabs = await page.locator("ul.nav.navbar-nav >> li")
        // console.log(await allTabs.count())

        // let allTabsCount = await allTabs.count();
        // for (let i = 0; i < allTabsCount; i++) {
        //     let text = await allTabs.nth(i).textContent()
        //     console.log(text)
        // }

        // const locator1 = await page.locator("div.col-md-6 >> a.btn.btn-primary.btn-xl")
        // console.log(locator1.innerText())
        // await locator1.hover()


        // const locator2 = await page.locator("a.btn.btn-primary.btn-xl")
        // console.log(locator2.innerText())
        // await locator2.hover()



        const locator = page.locator("div.navbar-header >> a")
        await expect(locator).toHaveClass("navbar-brand");




    });

    test.only('Test 2 Marketplace Page', async ({ page }) => {
        await page.goto(path2)

        const marketplacePage = new MarketplacePageClass(page)

        // console.log("***************************************************")
        // await marketplacePage.isElementHaveClass(marketplacePage.allButton)
        // console.log("***************************************************")
        // await marketplacePage.isElementHaveClass(marketplacePage.commercialButton)
        // console.log("***************************************************")
        // await marketplacePage.isElementHaveClass(marketplacePage.freeButton)
        // console.log("***************************************************")

        // console.log("***************************************************")
        // await marketplacePage.checkElementUI(marketplacePage.allButton, "background-color", "rgb(244, 245, 247)")


        console.log("***************************************************")
        await marketplacePage.checkTabNames(marketplacePage.buttonGroup.locator("a"))







        // const eleName = page.locator("button.header__button.ng-star-inserted")
        // await eleName.first().click()
        // page.waitForEvent('popup')
        // page.waitForSelector("div.modal__holder.modal__holder_show_animation.modal__holder--medium")
        // const modal = page.locator("input[name='search']")
        // await modal.fill("paper")
        // await modal.press("Enter")
        // const dropdown = page.locator("select.select-css.ng-untouched")
        // await dropdown.selectOption({value: "1: cheap"})
        // await expect(modal).toBeEmpty()
        // console.log("Input is empty")
        // await expect(modal).toHaveAttribute('placeholder', 'Я ищу..')
        // console.log("Placeholder is matched to design")
        // const frame = await page.frameLocator("p.text-center").locator("a.btn.btn-ghost-dark.btn-lg.hidden-xs")
        // await frame.hover()

        // const frame3 = await page.frameLocator("h2:has-text('Community Support')")
        //
        //
        // console.log(frame3)

        // const frame2 = await page.locator("div.col-sm-6").locator("a.btn.btn-primary.btn-lg.hidden-xs")
        // frame2.nth(0).hover()
        // console.log(frame2)

        // const frame2 = await page.locator("div.col-sm-6").locator("a.btn.btn-primary.btn-lg.hidden-xs", {hasText: "Community Support"})
        // await frame2.hover()
        //
        // console.log(frame2)
        //
        //
        // const frame3 = await page.locator("div.col-sm-6", {has: page.locator("a.btn.btn-primary.btn-lg.hidden-xs"), hasText: "Community Support"})
        // // frame3.nth(0).hover()
        //
        //
        // console.log(frame3)






        // await modal.type(Array(10).join('a'))
        // await page.screenshot({ path: "array.join.png" });


    });
});