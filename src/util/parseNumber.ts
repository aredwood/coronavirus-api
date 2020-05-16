/**
 * the number is returned as it is displayed - with spaces and columns
 * this takes that, and returns an actual number
 * @param {string} roughNumber - with spaces, and commas
 */
const parseNumber = (roughNumber: string,t:number = 0): number => {
    // splitting and joining is actually quicker
    try{
        return Number(roughNumber.split(",").join("").trim());
    }
    catch(err){
        return 0;
    }
}

export default parseNumber;