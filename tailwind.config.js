/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        sogblue: {
          lightest: '#CCF1FF',
          lighter: '#71C5EA',
          light: '#57B4DC',
          DEFAULT: '#0098CF',
          default: '#0098CF', // work around for @apply
          dark: '#007EBB',
          darker: '#00679E',
          transparent: '#00679EAA',
        },
        gray: {
          default: '#a0aec0',
          greenish: '#B7CE8D',
          reddish: '#C78086',
          yellowish: '#D9D279',
          light: '#edf2f7',
        },
      },
      screens: {
        xs: '420px',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    // enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
