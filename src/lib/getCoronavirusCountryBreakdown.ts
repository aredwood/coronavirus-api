// this is the entry point of the application
import cheerio from "cheerio";
import axios from "axios";
import parseNumber from "../util/parseNumber";
import {Country} from "../types";
const sourceURL = "https://www.worldometers.info/coronavirus/"

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

    // there are some "continent" rows here.
    const mainTable = $("#main_table_countries_today").find("tbody:nth-child(2)").find("tr")

    const headChildren = $("#main_table_countries_today").find("thead").find("tr").children();

    const tableKeys:any[] = [];

    headChildren.each((index,element) => {
        tableKeys.push($(element).text())
    })




    let countries:any[] = [];
    // this loops through each country
    mainTable.each((countryIndex,row) => {
        const columns = $(row).children();
        // this loops through each column, in each country row
        let country : {
            [key:string]:string
        } = {};
        $(columns).each((columnIndex,columnValue) => {
            const value = $(columnValue).text();
            const key = tableKeys[columnIndex];
            country[key] = value;
        });

        // this removes all continents, we're not interested in that group
        // countries.push(country);
        if(country["#"] !== ""){
            countries.push(country)
        }

    });


    const cleanCountry = (country:any) : Country => {
        const cleanCountry = {
            country:country["Country,Other"],
            totalCases: parseNumber(country["TotalCases"]),
            newCases: parseNumber(country["NewCases"]),
            totalDeaths: parseNumber(country["TotalDeaths"]),
            newDeaths: parseNumber(country["NewDeaths"]),
            totalRecovered: parseNumber(country["TotalRecovered"]),
            activeCases: parseNumber(country["ActiveCases"]),
            seriousCases: parseNumber(country["Serious,Critical"]),
            casesPer1M: parseNumber(country["Tot Cases/1M pop"]),
        }

        return cleanCountry as unknown as Country;
    }

    const cleanedCountries = countries.map(country => {
        return cleanCountry(country);
    })

    return cleanedCountries;


    // mainTable.each((countryIndex,countryRow) => {

    //     const country: CountryRaw = {}

    //     // element refers to a country row
    //     $(countryRow).children().each((columnIndex,columnElement) => {
    //         // console.log($(columnElement).text());
    //         // we dont process any key that isn't in the keys array above
    //         if(columnIndex > keys.length -1){
    //             return;
    //         }

    //         const elementValue = $(columnElement).text();

    //         const key = keys[columnIndex];

    //         const value = $(columnElement).text();

    //         country[key] = value;

    //     });

    //     countries.push(country)
    // });


    // // clean the data, 
    // const cleanCountries = (countries: CountryRaw[]): Country[] => {
    //     const cleanedCountries: Country[] = [];

    //     countries.forEach(countryEntry => {

    //         Object.keys(countryEntry).forEach(key => {
    //             countryEntry[key] = countryEntry[key].trim();
    //             if(countryEntry[key] === ""){
    //                 countryEntry[key] = "0";
    //             }

    //             if(key !== "country"){
    //                 // happens on all numerical keys
    //                 countryEntry[key] = countryEntry[key].replace("+","");
    //                 countryEntry[key] = parseNumber(countryEntry[key]) as unknown as string;
    //             }
    //         });

    //         cleanedCountries.push(countryEntry as unknown as Country);
    //     });


    //     return cleanedCountries


    // }

    // const cleanedCountries = cleanCountries(countries);

    // return cleanedCountries;
    
}

export default getCoronavirusCountryBreakdown;

