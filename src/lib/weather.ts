const convertToCelcius = (f: number): number => {
    return (f - 32) / 1.8;
};

const convertToFahrenheit = (c: number): number => {
    return (c * 1.8) + 32;
};

export default {
    convertToCelcius,
    convertToFahrenheit,
};
