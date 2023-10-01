import { ICountries } from "~/models/Countries"

class CountriesService {
    public async getCountriesByRegion(region: string):Promise<ICountries[]>{
        const config = useRuntimeConfig()

        return await $fetch<ICountries[]>(`${config.public.apiBase}/region/${region}`, {
            method: 'GET',
        })
    }

    public async getCountriesByCioc(cioc: string):Promise<ICountries>{
        const config = useRuntimeConfig()

        return await $fetch<ICountries>(`${config.public.apiBase}/alpha/${cioc}`, {
            method: 'GET',
        })
    }
}

export default new CountriesService()