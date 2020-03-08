import getCoronavirusSummary from "./lib/getCoronavirusSummary";
import {Request,Response} from "express";
import logger from "./logger"
import lodash from "lodash"
// https://cloud.google.com/functions/docs/bestpractices/tips#use_global_variables_to_reuse_objects_in_future_invocations
let cache = {};
let cacheTime = 0;

const handler = async (req:Request,res:Response) => {

    let response;

    // if the cache is 15 seconds old
    const oldCache = new Date().getTime() - cacheTime > 15 * 1000;

    if(lodash.isEmpty(cache) || oldCache){
        const summary = await getCoronavirusSummary();

        // compute the response
        response = {
            note: "data provided by worldometers.info/coronavirus/",
            summary
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
