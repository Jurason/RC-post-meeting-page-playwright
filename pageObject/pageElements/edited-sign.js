
export class EditedSign {
    constructor(lastLocator, elementLocator) {
        this.editedSign =lastLocator.locator(elementLocator)
    }

    async getText() {
        return await this.editedSign.innerText()
    }
}