import i18nOptions from './i18n/i18n'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  server: {
    port: 3009,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ten-boards-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/tailwindcss'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'nuxt-i18n',
  ],

  i18n: i18nOptions,

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: '/api',
    proxy: true,
  },

  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      pathRewrite: { '^/api': '' },
    },
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          type: '',
        },
        endpoints: {
          login: {
            url: '/api/users/login',
            method: 'post',
            propertyName: 'data.token',
          },
          user: { url: '/api/users/me', method: 'get' },
          logout: false,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
