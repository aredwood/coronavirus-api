import weather from "./weather";

describe("testing weather converter",() => {
    test("100c is 212f",() => {
        const res = weather.convertToFahrenheit(100);
        expect(res).toBe(212);
    })
    test("212f is 100c",() => {
        const res = weather.convertToCelcius(212);
        expect(res).toBe(100);
    })
})