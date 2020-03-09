// this is the entry point of the application
import cheerio from "cheerio";
import axios from "axios";
import parseNumber from "../util/parseNumber";
import getCoronavirusSummary from "./getCoronavirusSummary";

const sourceURL = "https://www.worldometers.info/coronavirus/"

interface ICountryRaw{
    [key:string] :string;
}

const getCoronavirusCountryBreakdown = async (): Promise<any> => {
    // download the html
    const {data} = await axios(sourceURL)

    // parse it with cheerio
    const $ = cheerio.load(data);

    // while the block below works, the text is a bit messy,
    // so its more readable if we just write the keys out manually.

    // const schema = $("#main_table_countries").find("thead").find("th")

    // let keys : string[] = [];

    // schema.each((index,element) => {
    //     keys.push($(element).text())
    // });

    const keys = [
        "country",
        "totalCases",
        "newCases",
        "totalDeaths",
        "newDeaths",
        "totalRecovered",
        "activeCases",
        "seriousCases",
        "casesPer1M"
    ]


    const mainTable = $("#main_table_countries").find("tbody").children();

    let countries : ICountryRaw[] = [];

    mainTable.each((countryIndex,countryRow) => {

        let country : ICountryRaw = {}

        // element refers to a country row
        $(countryRow).children().each((columnIndex,columnElement) => {
            // console.log($(columnElement).text());
            const key = keys[columnIndex];
            const value = $(columnElement).text();

            country[key] = value;

        });

        countries.push(country)
    });

    interface ICountry{
        country:string,
        totalCases:number,
        newCases:number,
        totalDeaths:number,
        newDeaths:number,
        totalRecovered:number,
        activeCases:number,
        seriousCases:number,
        casesPer1M:number
    }

    // clean the data, 
    const cleanCountries = (countries:ICountryRaw[]) : ICountry[] => {
        const cleanedCountries : ICountry[] = [];

        countries.forEach(countryEntry => {
            Object.keys(countryEntry).forEach(key => {
                countryEntry[key] = countryEntry[key].trim();
                if(countryEntry[key] === ""){
                    countryEntry[key] = "0";
                }

                if(key !== "country"){
                    // happens on all numerical keys
                    countryEntry[key] = countryEntry[key].replace("+","");
                    //@ts-ignore
                    countryEntry[key] = parseNumber(countryEntry[key]);
                }
            });

            cleanedCountries.push(countryEntry as unknown as ICountry);
        });


        return cleanedCountries


    }

    const cleanedCountries = cleanCountries(countries);

    return cleanedCountries;
    
}

export default getCoronavirusCountryBreakdown;

