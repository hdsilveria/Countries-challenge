<template>
    <div class="p-5">
        <div class="flex flex-row p-1">
            <div class="p-1 basis-3/5">
                <h5>
                    <i>País</i>
                </h5>
                <div class="flex flex-row">
                    <img
                        :src="`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`"
                        width="20"
                        :alt="`Bandeira ${country.name.common}`"
                    >
                    <NuxtLink 
                        :to="country.maps.googleMaps" 
                        target="_blank"
                        class="ml-1"
                    >
                        {{ country.name.common }}
                    </NuxtLink>
                </div>
            </div>
            <div class="p-1 basis-2/5">
                <h5>
                    <i>Capital</i>
                </h5>
                <p>{{ country.capital[0] }}</p>
            </div>
            <div class="p-1 basis-2/5">
                <h5>
                    <i>Idiomas</i>
                    <ul>
                        <li 
                            v-for="(language, index) in Object.values(country.languages)" 
                            :key="index"
                            class="flex flex-row"
                        >   
                            {{language}}
                        </li> 
                    </ul>
                </h5>
            </div>
        </div>

        <div class="p-1">
                <NuxtLink 
                    :to="`/paises/${country.cca3}`"
                    class="ml-1 flex items-center gap-1"
                >
                <UIcon name="i-heroicons-arrow-top-right-on-square-solid" />
                Ver mais sobre o País
            </NuxtLink>
        </div>

        <h5>
            <i>Países com o mesmo idioma</i>
        </h5>
        <div class="flex flex-row">
            <div class="p-1 basis-3/3">
                <ul class="mt-1 flex flex-wrap">
                    <li 
                        v-for="(language, index) in country.countryLanguages" 
                        :key="index"
                        style="width: 50%;"
                    >   
                        <div class="flex flex-row">
                            <div class="basis-1/6">
                                <img
                                    :src="`https://flagcdn.com/${language.cca2.toLowerCase()}.svg`"
                                    width="30"
                                    :alt="`Bandeira ${language.name.common}`"
                                >
                            </div>
                            <div class="basis-5/6">
                                <NuxtLink 
                                    :to="language.maps.googleMaps" 
                                    target="_blank"
                                >
                                    {{ language.name.common }}
                                </NuxtLink>
                            </div>
                        </div>
                    </li> 
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';

    defineProps({
        country: {
            type: Object as PropType<any>,
            required: true,
        }
    })
</script>