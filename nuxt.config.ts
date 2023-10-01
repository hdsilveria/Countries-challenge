export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  ui: {
    global: true,
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://restcountries.com/v3.1'
    }
  },
  ssr: true,
})
