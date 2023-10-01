<template>
    <div>
        <div class="flex flex-row p-1">
            <div class="p-1 basis-3/12">
                <h3>
                    <i>Nome Oficial</i>
                </h3>
                <p>{{ country.name.official}}</p>
                
            </div>
            <div class="p-1 basis-2/12">
                <h3>
                    <i>Capital</i>
                </h3>
                <p>{{ country.capital[0]}}</p>
            </div>
            <div class="p-1 basis-2/12">
                <h3>
                    <i>Bandeira</i>
                </h3>
                <img
                    class="mt-1"
                    :src="`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`"
                    width="30"
                    :alt="`Bandeira ${country.name.common}`"
                >
            </div>
            <div class="p-1 basis-3/12">
                <h3>
                    <i>População</i>
                </h3>
                <p>{{ country.population < 1000000 ? 
                   ( country.population / 1000  ).toFixed(0)+ ' mil pessoas': 
                   ( country.population / 1000000 ).toFixed(0) + ' milhões de pessoas'
                }}</p>
            </div>
            <div class="p-1 basis-2/12">
                <h3>
                    <i>Mapa</i>
                </h3>
                <NuxtLink 
                    :to="country.maps.googleMaps" 
                    class="flex items-center gap-1"
                    target="_blank"
                >
                    <UIcon name="i-heroicons-arrow-top-right-on-square-solid" />
                    Ver no google
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ICountries } from '~/models/Countries'

    defineProps({
        country: {
            type: Object as PropType<ICountries>,
            required: true,
        },
    }) 
</script>