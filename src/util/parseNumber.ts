/**
 * the number is returned as it is displayed - with spaces and columns
 * this takes that, and returns an actual number
 * @param {string} roughNumber - with spaces, and commas
 */
const parseNumber = (roughNumber:string) => {
    // splitting and joining is actually quicker
    return Number(roughNumber.split(",").join("").trim());
}

export default parseNumber;