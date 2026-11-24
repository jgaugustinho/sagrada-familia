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
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&display=swap'
        }
      ]
    }
  },
  css: [ '@sagrada-familia/ui/shared-styles.css', '~~/assets/css/main.css' ],
  build: {
    transpile: [ '@sagrada-familia/ui', '@sagrada-familia/assets' ]
  },
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
