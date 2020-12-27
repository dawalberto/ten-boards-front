import en from './en.json'
import es from './es.json'

export default {
  locales: [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'es',
      name: 'Español',
    },
  ],
  defaultLocale: 'es',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en,
      es,
    },
  },
}
