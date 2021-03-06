module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderStyle: ['focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      scale: ['active'],
      boxShadow: ['active'],
      outline: ['active'],
    },
  },
  plugins: [],
}
