// this is the entry point of the application
import cheerio from "cheerio";
import axios from "axios";
import parseNumber from "../util/parseNumber";
import {Country,CountryRaw} from "../types";
const sourceURL = "https://www.worldometers.info/coronavirus/"

const getCoronavirusCountryBreakdown = async (): Promise<Country[]> => {
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


    const mainTable = $("#main_table_countries_today").find("tbody").children();

    const countries: CountryRaw[] = [];

    mainTable.each((countryIndex,countryRow) => {

        const country: CountryRaw = {}

        // element refers to a country row
        $(countryRow).children().each((columnIndex,columnElement) => {
            // console.log($(columnElement).text());
            // we dont process any key that isn't in the keys array above
            if(columnIndex > keys.length - 1){
                return;
            }

            const key = keys[columnIndex];

            const value = $(columnElement).text();

            country[key] = value;

        });

        countries.push(country)
    });


    // clean the data, 
    const cleanCountries = (countries: CountryRaw[]): Country[] => {
        const cleanedCountries: Country[] = [];

        countries.forEach(countryEntry => {

            Object.keys(countryEntry).forEach(key => {
                countryEntry[key] = countryEntry[key].trim();
                if(countryEntry[key] === ""){
                    countryEntry[key] = "0";
                }

                if(key !== "country"){
                    // happens on all numerical keys
                    countryEntry[key] = countryEntry[key].replace("+","");
                    countryEntry[key] = parseNumber(countryEntry[key]) as unknown as string;
                }
            });

            cleanedCountries.push(countryEntry as unknown as Country);
        });


        return cleanedCountries


    }

    const cleanedCountries = cleanCountries(countries);

    return cleanedCountries;
    
}

getCoronavirusCountryBreakdown().then(res => {
    console.log(res)
})
export default getCoronavirusCountryBreakdown;

