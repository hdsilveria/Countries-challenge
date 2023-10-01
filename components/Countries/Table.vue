<template>
    <div>
        <div class="flex flex-row">
            <div class="p-1 basis-1/3">
                <UInput 
                    v-model="search" 
                    placeholder="Pesquisar Países..." 
                />
            </div>
        </div>
        <UTable 
            :columns="columns" 
            :rows="filteredRows"
            @select="selected"
        />

        <UModal v-model="isOpen">
            <CountriesModal :country="countrySelected" />
        </UModal>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue'
    import { defineProps } from 'vue'
    import { ICountries } from '~/models/Countries'

    const search = ref('')
    const isOpen = ref(false)
    const countrySelected = ref({})

    const props = defineProps({
        countries: {
            type: Array as PropType<ICountries[]>,
            required: true,
        },
        
        columns: {
            type: Array as PropType<{key: string, label: string}[]>,
            required: true,
        }
    })

    const filteredRows = computed(() => {
        if (!search.value) {
            return props.countries
        }

        return props.countries.filter((countrie) => 
            countrie.name.common.toLowerCase().includes(search.value.toLowerCase())
        )
    })

    function selected(row: ICountries): void{
        const selectedLanguages = Object.keys(row.languages)

        const countriesWithSelectedLanguages = props.countries.filter((country) => {
            if (country !== row) {
                const countryLanguages = Object.keys(country.languages)
                return selectedLanguages.some((language) => countryLanguages.includes(language))
            }
            return false
        })

        isOpen.value = true

        countrySelected.value = {
            ...row,
            countryLanguages: countriesWithSelectedLanguages
        }
    }

</script>