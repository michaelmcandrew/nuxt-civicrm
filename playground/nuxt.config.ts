export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    civicrm: {
      url: 'http://nuxt.localhost:7890',
    },
  },
})
