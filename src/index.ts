import getCoronavirusSummary from "./lib/getCoronavirusSummary";
import {Request,Response} from "express";
import lodash from "lodash"
import getCoronavirusCountryBreakdown from "./lib/getCoronavirusCountryBreakdown";
// https://cloud.google.com/functions/docs/bestpractices/tips#use_global_variables_to_reuse_objects_in_future_invocations
let cache = {};
const cacheTime = 0;

const handler = async (req: Request,res: Response): Promise<void> => {

    let response;

    // if the cache is 15 seconds old
    const oldCache = new Date().getTime() - cacheTime > 15 * 1000;

    if(lodash.isEmpty(cache) || oldCache){
        // const [summary,breakdown] = await Promise.all([getCoronavirusSummary(),getCoronavirusCountryBreakdown()]);

        const breakdown = await getCoronavirusCountryBreakdown();
        
        // we can now get the summary from the country table
        // https://github.com/aredwood/coronavirus-api/issues/10
        const [summary] = breakdown.filter(countryBreakdown => {
            return countryBreakdown.country === "Total:";
        })

        // compute the response
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
