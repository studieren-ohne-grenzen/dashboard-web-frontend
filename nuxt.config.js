export default {
  /*
   ** Headers of the page
   */
  head: {
    script: [
      {
        src: 'https://studieren-ohne-grenzen.github.io/nav/index.js',
      },
    ],
    title: '', // process.env.npm_package_name
    titleTemplate: (title) => {
      return title ? title + ' - SOG Vogelnest' : 'SOG Vogelnest'
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
   ** Add custom global page transition
   */
  pageTransition: 'fade',
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],
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
    // Doc: https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],
  /*
   ** TailwindCSS module configuration
   ** See: https://tailwindcss.nuxtjs.org/
   */
  tailwindcss: {
    jit: true,
  },
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
      target: 'https://vogelnest-api.de-staging.esf-international.org/', // Login Server goes here
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  /*
   ** Auth module configuration
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { // Endpoint for retrievieng the JWT token
            url: 'api/login',
            method: 'post',
          },
          logout: false, // No explicit token invalidation
          user: false, // no auto user data fetching
        },
        token: {
          property: false, // token is the plain text rcvd from login endpoint
        },
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
