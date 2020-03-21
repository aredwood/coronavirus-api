// import getCoronavirusSummary from "./lib/getCoronavirusSummary";
import {Request,Response} from "express";
import lodash from "lodash"
import {Country} from "./types";
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

        // const [summaryData] = breakdown.filter(countryBreakdown => {
        //     return countryBreakdown.country === "Total:";
        // });

        // we can pop it, because it is reliably last in the array
        const [summaryData] = breakdown.pop() as unknown as Country[];

        const summary = {
            // deaths
            deaths:summaryData.totalDeaths,
            newDeaths: summaryData.newDeaths,
            // recovered
            recovered:summaryData.totalRecovered,
            // cases
            casesPer1M: summaryData.casesPer1M,
            cases: summaryData.totalCases,
            newCases: summaryData.newCases,
            activeCases: summaryData.activeCases,
            seriousCases: summaryData.seriousCases
        }



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
