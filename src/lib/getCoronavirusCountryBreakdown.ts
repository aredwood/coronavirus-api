// this is the entry point of the application
import cheerio from "cheerio";
import axios from "axios";
import parseNumber from "../util/parseNumber";
import {Country} from "../types";
const sourceURL = "https://www.worldometers.info/coronavirus/"

const getCoronavirusCountryBreakdown = async (): Promise<Country[]> => {
    // download the html
    const {data} = await axios(sourceURL)

    // parse it with cheerio
    const $ = cheerio.load(data);

    // there are some "continent" rows here.
    const mainTable = $("#main_table_countries_today").find("tbody:nth-child(2)").find("tr")

    const headChildren = $("#main_table_countries_today").find("thead").find("tr").children();

    const tableKeys: string[] = [];

    headChildren.each((index,element) => {
        tableKeys.push($(element).text())
    })

    //TODO create & implement a CountryRaw Type.


    const countries: any[] = [];
    // this loops through each country
    mainTable.each((countryIndex,row) => {
        const columns = $(row).children();
        // this loops through each column, in each country row
        const country: {
            [key: string]: string;
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


    const cleanCountry = (country: any): Country => {
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
    
}

export default getCoronavirusCountryBreakdown;

