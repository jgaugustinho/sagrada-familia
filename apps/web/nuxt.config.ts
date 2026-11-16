// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
  modules: [ '@nuxtjs/tailwindcss', '@nuxt/eslint' ],
  components: [
    {
      path: '~/components',
      extensions: [ '.vue' ]
    }
  ],
  devtools: { enabled: true },
  css: [ '~~/assets/css/main.css' ],
  compatibilityDate: '2025-07-15',
  postcss: {
    plugins: {
      'tailwindcss/nesting/index.js': {},
      'tailwindcss/nesting': false
    }
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
  }
} );
