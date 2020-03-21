//TODO deprecate
import cheerio from "cheerio";
import axios from "axios";
import parseNumber from "../util/parseNumber";

const sourceURL = "https://www.worldometers.info/coronavirus/"

type ICoronavirusSummary = {
    cases: number;
    deaths: number;
    recovered: number;
}

const getCoronavirusSummary = async (): Promise<ICoronavirusSummary> => {
    // download the html
    const {data} = await axios(sourceURL)

    // parse it with cheerio
    const $ = cheerio.load(data);

    const summaries = $("#maincounter-wrap");
    
    const statistics: {
        [key: string]: number;
    } = {};

    // extract each summary (cases, recovered, death)
    summaries.each((index,element) => {
        const rawNumber = $(element).find(".maincounter-number").text();
        const rawName = $(element).find("h1").text();


        const number = parseNumber(rawNumber);
        
        // one of the names is "coronavirus cases"
        // just hardcoding a change to cases, since we already have the context
        const name = rawName.replace(":","").toLowerCase().replace("coronavirus ","")

        statistics[name] = number;

    });


    return statistics as ICoronavirusSummary;
    
}

export default getCoronavirusSummary;

