import getCoronavirusSummary from "./lib/getCoronavirusSummary";

// https://cloud.google.com/functions/docs/bestpractices/tips#use_global_variables_to_reuse_objects_in_future_invocations
let cache = {};


const handler = async () => {

    let response;

    if(!cache){
        const summary = await getCoronavirusSummary();

        response = {
            note: "data provided by worldometers.info/coronavirus/",
            summary
        }
    }
    else{
        response = cache;
    }

    return response
}

export default handler;
