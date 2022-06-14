import {expect, test } from "./newFixture"

test("test 1", async ({hey} info) => {
    console.log(hey.toUpperCase());
    expect(hey.toUpperCase()).toBe("I AM HERE");
})