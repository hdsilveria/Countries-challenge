<template>
    <main>
        <NuxtLink to="/paises" class="flex items-center gap-1 link-nav">
            <UIcon name="i-heroicons-arrow-top-right-on-square-solid" />
            Voltar
        </NuxtLink>

        <h1>Dados sobre o País</h1>

        <CountryAbout :country="country[0]" />

        <VChart class="mt-5" :labels="labels" :datasets="datasets" />
    </main>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router';
    import CountriesService from '~/services/countries'

    const labels = ref([])

    const datasets = ref([
        {   
            label: "População por País",
            order: 1,
            data: [],
            backgroundColor: [
                "#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED", "#FF5733", "#FFC30F",
                "#BFEAA0", "#F6B352", "#53AAB7", "#C2D5E4", "#FF7675", "#FFB84E", "#A6E6E6",
                "#FF8D91", "#FDCBAA", "#B7D7E8", "#FF969C", "#FED06E", "#A5E3E3", "#FFA871",
                "#D3F0A5", "#67B8C7", "#F0F8FF", "#F08080", "#F4A460", "#20B2AA", "#DDA0DD",
                "#AFEEEE", "#9370DB", "#F08080", "#FFE4B5", "#90EE90", "#FFD700", "#D2B48C",
                "#4682B4", "#DDA0DD", "#F0E68C", "#FFA07A", "#48D1CC", "#FF6347", "#87CEEB",
                "#F5DEB3", "#20B2AA", "#DDA0DD", "#E0FFFF", "#F4A460", "#F08080", "#87CEFA",
                "#FFD700", "#D2B48C", "#F0E68C", "#48D1CC", "#FF6347", "#87CEEB", "#F5DEB3"
            ]
        },
    ])
        
    const route = useRoute()

    const {data: country} = await useAsyncData(
        'countryData',
        async () => await CountriesService.getCountriesByCioc(route.params.country)
    )

    
    useAsyncData(
        'countriesList',
        async () => {
            const countries = await CountriesService.getCountriesByRegion('america')
            countries.forEach(element => {
                labels.value.push(element.name.common)
                datasets.value[0].data.push(element.population)
            })

            return 
        }
    )


</script>