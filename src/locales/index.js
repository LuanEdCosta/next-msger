import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import moment from 'moment'

import PT_BR from './PT_BR'
import 'moment/locale/pt-br'

i18n.use(initReactI18next).init({
  resources: { 'pt-BR': PT_BR },
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  debug: false,
  interpolation: {
    format(value, format, lng) {
      if (value instanceof Date || moment.isMoment(value)) {
        const momentInstance = moment(value)
        momentInstance.locale(lng.toLowerCase())
        return momentInstance.format(format)
      }

      return value
    },
  },
})

i18n.on('languageChanged', (lng) => {
  moment.locale(lng.toLowerCase())
})

export default i18n
