// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
  postcss: {
    plugins: {
      'tailwindcss/nesting/index.js': {},
      'tailwindcss/nesting': false,
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
