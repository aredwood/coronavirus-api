import Joi from "@hapi/joi";
/**
 * the number is returned as it is displayed - with spaces and columns
 * this takes that, and returns an actual number
 * @param {string} roughNumber - with spaces, and commas
 */
const parseNumber = (roughNumber: string): number => {
    // splitting and joining is actually quicker
    try{
        const value =  Number(roughNumber.split(",").join("").trim());

        Joi.assert(value,Joi.number().positive())
        return value;
    }
    catch(err){
        return 0;
    }
}

export default parseNumber;