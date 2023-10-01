<template>
    <main>
        <NuxtLink to="/" class="flex items-center gap-1 link-nav">
            <UIcon name="i-heroicons-arrow-top-right-on-square-solid" />
            Formulario 
        </NuxtLink>
        <h1>Lista de Países</h1>

        <CountriesTable 
            :columns="columns" 
            :countries="countries" 
        />
    </main>
</template>

<script setup>
    import CountriesService from '~/services/countries'

    const {data: countries} = await useAsyncData(
        'countriesList',
        async () => await CountriesService.getCountriesByRegion('america')
    )

    const columns = [
        {  
            key: 'name.common',
            label: 'Nome'
        },
        {  
            key: 'capital[0]',
            label: 'Capital'
        },
    ]
</script>

<style scoped>

</style>