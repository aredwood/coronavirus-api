import parseNumber from "./parseNumber"

describe("testing parseNumber",() => {
    test("works with a number with spaces and commas",() => {
        const input = " 1,000,000 ";
        const res = parseNumber(input);
        expect(res).toBe(1000000)
    })
})