/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      sogblue: {
        lightest: '#CCF1FF',
        lighter: '#71C5EA',
        light: '#57B4DC',
        default: '#0098CF',
        dark: '#007EBB',
        darker: '#00679E',
        transparent: '#00679EAA',
      },
      black: '#000000',
      white: '#FFFFFF',
      gray: '#a0aec0',
      lightgray: '#edf2f7',
      red: '#CF3F15',
      green: '#0ACF98',
      yellow: '#CF9E15',
    },
    screens: {
      xs: '420px',
      // default breakpoints
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  variants: {},
  plugins: [],
}
