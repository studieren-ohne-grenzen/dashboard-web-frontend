export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '', // process.env.npm_package_name
    titleTemplate: (title) => {
      return title ? title + ' - SOG Dashboard' : 'SOG Dashboard'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'msapplication-TileColor',
        content: '#2d89ef',
      },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/icons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/icons/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: 'safari-pinned-tab.svg',
        color: '#0098cf',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Router options
   */
  router: {
    middleware: ['auth'],
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  /*
   ** Proxy module configuration
   ** See https://nuxtjs.org/faq/http-proxy/
   */
  proxy: {
    '/api': {
      target: 'https://vogelnest.de-staging.esf-international.org/', // Login Server goes here
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  /*
   ** Auth module configuration
   */
  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        maxAge: 57600,
      },
    },
    strategies: {
      redirect: {
        home: '/',
      },
      watchLoggedIn: true,
      rewriteRedirects: false,
      local: {
        endpoints: {
          login: {
            url: 'api/login',
            method: 'post',
            propertyName: false,
          },
          logout: false,
          user: false,
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
