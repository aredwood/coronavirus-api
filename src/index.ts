// import getCoronavirusSummary from "./lib/getCoronavirusSummary";
import {Request,Response} from "express";
import lodash from "lodash"
import Joi from '@hapi/joi';
import getCoronavirusCountryBreakdown from "./lib/getCoronavirusCountryBreakdown";
import getCoronavirusSummary from "./lib/getCoronavirusSummary";
// https://cloud.google.com/functions/docs/bestpractices/tips#use_global_variables_to_reuse_objects_in_future_invocations
let cache = {};
const cacheTime = 0;

const handler = async (req: Request,res: Response): Promise<void> => {

    let response;

    // if the cache is 15 seconds old
    const oldCache = new Date().getTime() - cacheTime > 15 * 1000;

    if(lodash.isEmpty(cache) || oldCache){


        const [summary,breakdown] = await Promise.all([getCoronavirusSummary(),getCoronavirusCountryBreakdown()]);

        const summaryValidationSchema = Joi.object({
            deaths: Joi.number().positive(),
            cases: Joi.number().positive(),
            newCases: Joi.number().positive(),
            newDeaths: Joi.number().positive(),
            recovered: Joi.number().positive(),
            activeCases: Joi.number().positive(),
            seriousCases: Joi.number().positive(),
            casesPer1M: Joi.number().positive()
        })

        const countryValidationSchema = Joi.object({
            country: Joi.string().min(1),
            totalCases: Joi.number().positive(),
            newCases: Joi.number().positive(),
            totalDeaths: Joi.number().positive(),
            newDeaths: Joi.number().positive(),
            totalRecovered: Joi.number().positive(),
            activeCases: Joi.number().positive(),
            seriousCases: Joi.number().positive(),
            casesPer1M: Joi.number().positive()
        })

        const breakdownValidationSchema = Joi.array().items(countryValidationSchema);

        try{
            await Promise.all(
                [
                    breakdownValidationSchema.validateAsync(breakdown),
                    summaryValidationSchema.validateAsync(summary)
                ]
            )
        }
        catch(err){
            console.error(err);
            //TODO report why the validation failed.
            throw new Error("VALIDATION FAILED");
        }

        // shape the response
        response = {
            source: "worldometers.info",
            by:"github.com/aredwood",
            summary,
            breakdown
        }
        // save it to cache
        cache = response;
    }
    else{
        response = cache;
    }

    // send it
    res.send(response);
}


export default handler;
