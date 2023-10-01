<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  useSeoMeta({
    title: "Aplicação de teste para Nuxt 3"
  })
</script>

<style>
  h1 {
      font-size: 2.2rem;
      font-weight: 600;
      color: #476582;
      margin: 20px 0px;
  }

  .link-nav {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 20px 0px;
      color: #6b8aa5;
      width: fit-content;
  }
</style>