/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.blueGray,
      white: colors.white,
      green: colors.teal,
      red: colors.pink,
      yellow: colors.yellow,
    },
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
          darkest: '#003D5E',
          transparent: '#00679EAA',
        },
        gray: {
          greenish: '#B7CE8D',
          reddish: '#C78086',
          yellowish: '#D9D279',
        },
        black: {
          transparent: '#000000AA',
          DEFAULT: '#000000',
        },
      },
      screens: {
        xs: '420px',
      },
    },
  },
  darkMode: 'class',
  variants: {
    extend: {
      opacity: ['dark'],
      borderWidth: ['dark'],
      ringWidth: ['hover'],
      ringOpacity: ['hover'],
      ringColor: ['hover'],
    },
  },
  plugins: [],
  /* Disable JIT mode for now, as long as it is still quite unstable
   * See https://tailwindcss.com/docs/just-in-time-mode
   */
  // mode: 'jit',
  purge: {
    /* Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
     * needed for JIT mode to work properly
     */
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue'],
  },
}
