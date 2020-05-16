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

    
    const statistics: {
        [key: string]: number;
    } = {};

    const worldRow = $('tbody[class=total_row_body]').find("tr").first()

    const headChildren = $("#main_table_countries_today").find("thead").find("tr").children();

    const tableKeys: string[] = [];

    headChildren.each((index,element) => {
        tableKeys.push($(element).text())
    });

    let rawWorldObject : {
        [key:string]:string
    } = {};

    $(worldRow).children().each((index,child) => {
        rawWorldObject[tableKeys[index]] = $(child).text();
    })

    const summary = {
        deaths: parseNumber(rawWorldObject['TotalDeaths']),
        cases: parseNumber(rawWorldObject["TotalCases"]),
        newCases: parseNumber(rawWorldObject["NewCases"]),
        newDeaths: parseNumber(rawWorldObject["NewDeaths"]),
        recovered: parseNumber(rawWorldObject["TotalRecovered"]),
        activeCases: parseNumber(rawWorldObject["ActiveCases"]),
        seriousCases: parseNumber(rawWorldObject["Serious,Critical"]),
        casesPer1M: parseNumber(rawWorldObject["Tot Cases/1M pop"]),
    }







    return summary as ICoronavirusSummary;
    
}

getCoronavirusSummary().then(res => {
    return res;
})

export default getCoronavirusSummary;

