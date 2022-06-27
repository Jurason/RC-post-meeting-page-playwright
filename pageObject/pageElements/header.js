

export class Header {
    constructor(lastLocator, headerSelector) {
        this.headerlocator = lastLocator.locator(headerSelector)
    }
}