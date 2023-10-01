<template>
    <main>
        <NuxtLink to="/paises" class="flex items-center gap-1 link-nav">
            <UIcon name="i-heroicons-arrow-top-right-on-square-solid" />
            Lista de Países 
        </NuxtLink>
        <h1>Formulario de Países</h1>
        <Form @success-form="openModal" />
        <UModal v-model="isOpen">
            <FormModalInfos :infos="infos" />
        </UModal>
    </main>
</template>

<script setup>
    import { ref } from 'vue'
    const isOpen = ref(false)
    const infos = ref({})

    function openModal(form){
        isOpen.value = true
        infos.value = form
    }
</script>

<style scoped>
</style>