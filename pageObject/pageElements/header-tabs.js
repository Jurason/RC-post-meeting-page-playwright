import {expect} from "@playwright/test";

const TAB_CONTAINER_SELECTOR = '.Tabs__item'

//фактически HeaderTabs класс нужен только для использования функции tabIsActive
//То есть HeaderTabs класс нужен для всех таб, поэтому мы его выносим на уровень выше
//по сути не является родительским классом для класса SummaryTab, это просто указатель на хэдэр
//поэтому селектор в классе SummaryTab не чейнится с селектором из класса HeaderTabs, потому что в
//DOM они расположены параллельно
export class HeaderTab {
    constructor(lastLocator, containerSelector) {
        this.headerTab = lastLocator.locator(`${TAB_CONTAINER_SELECTOR}${containerSelector}`)
    }
    async tabIsActive(){
        await this.headerTab.waitFor({state: "visible"})
        await expect.soft(this.headerTab, 'Active tab should have border with color #066fac').toHaveCSS("border-color", "rgb(6, 111, 172)");
    }
    async clickOnTab(){
        await this.headerTab.click()
        await this.tabIsActive()
    }
}

