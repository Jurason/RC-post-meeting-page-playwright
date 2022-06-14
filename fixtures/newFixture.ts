import {test as baseTest} from "@playwright/test";

type someName = {
    hey: string;
}


const fixture = baseTest.extend<someName>({
    hey: "I am here",

})

export const test = fixture;
export const expect = fixture.expect
