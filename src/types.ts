export interface CountryRaw{
    [key: string]: string;
}
export interface Country{
    country: string;
    totalCases: number;
    newCases: number;
    totalDeaths: number;
    newDeaths: number;
    totalRecovered: number;
    activeCases: number;
    seriousCases: number;
    casesPer1M: number;
}
