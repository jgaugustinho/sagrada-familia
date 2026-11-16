// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
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
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
        commaDangle: 'never'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
