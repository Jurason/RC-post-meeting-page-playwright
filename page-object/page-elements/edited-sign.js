

export class EditedSign {
    constructor(lastLocator, elementLocator) {
        this.editedSignLocator =lastLocator.locator(elementLocator)
    }

    async getText() {
        return await this.editedSignLocator.textContent()
    }
}