import moment from 'moment'

import { MACROS } from '@/config/macros'
import {
  COMPANY_DOC,
  CUSTOMER_DOC,
  SERVICE_DOC,
  SERVICE_TYPE_DOC,
  USER_DOC,
} from '@/config/database'

import { firebaseTimestampToMoment } from './FirebaseTimestamp'

export const parseMacros = (message, data = {}) => {
  if (!message) return ''

  const {
    [COMPANY_DOC.FANTASY_NAME]: companyFantasyName = '',
    [COMPANY_DOC.CNPJ]: companyCnpj = '',
    [COMPANY_DOC.NAME]: companyName = '',
    [COMPANY_DOC.OWNER_NAME]: companyOwnerName = '',
    [COMPANY_DOC.OWNER_PHONE]: companyOwnerPhone = '',
    [COMPANY_DOC.EMAIL]: companyEmail = '',

    [CUSTOMER_DOC.BIRTH_DATE]: customerBirthDate = '',
    [CUSTOMER_DOC.NAME]: customerName = '',
    [CUSTOMER_DOC.WHATSAPP]: customerWhatsapp = '',
    [CUSTOMER_DOC.BIRTH_DAY]: customerBirthDay = '',
    [CUSTOMER_DOC.BIRTH_MONTH]: customerBirthMonth = '',
    [CUSTOMER_DOC.BIRTH_YEAR]: customerBirthYear = '',
    [CUSTOMER_DOC.PHONE]: customerPhone = '',
    [CUSTOMER_DOC.EMAIL]: customerEmail = '',
    [CUSTOMER_DOC.CEP]: customerCep = '',
    [CUSTOMER_DOC.CITY]: customerCity = '',
    [CUSTOMER_DOC.STATE]: customerState = '',
    [CUSTOMER_DOC.DISTRICT]: customerDistrict = '',
    [CUSTOMER_DOC.ADDRESS]: customerAddress = '',
    [CUSTOMER_DOC.NUMBER]: customerNumber = '',
    [CUSTOMER_DOC.COMPLEMENT]: customerComplement = '',

    [USER_DOC.NAME]: userName = '',

    [SERVICE_TYPE_DOC.NAME]: serviceTypeName = '',
    [SERVICE_TYPE_DOC.DESCRIPTION]: serviceTypeDesc = '',

    [SERVICE_DOC.START_DATE]: serviceStartDate,
    [SERVICE_DOC.END_DATE]: serviceEndDate,
  } = data

  let newMsg = message

  const today = moment()
  newMsg = newMsg.replaceAll(MACROS.TODAY, today.format('L'))
  newMsg = newMsg.replaceAll(MACROS.CURRENT_DAY, today.format('DD'))
  newMsg = newMsg.replaceAll(MACROS.CURRENT_MONTH, today.format('MM'))
  newMsg = newMsg.replaceAll(MACROS.CURRENT_YEAR, today.format('YYYY'))

  newMsg = newMsg.replaceAll(MACROS.COMPANY_FANTASY_NAME, companyFantasyName)
  newMsg = newMsg.replaceAll(MACROS.COMPANY_CNPJ, companyCnpj)
  newMsg = newMsg.replaceAll(MACROS.COMPANY_NAME, companyName)
  newMsg = newMsg.replaceAll(MACROS.COMPANY_OWNER_NAME, companyOwnerName)
  newMsg = newMsg.replaceAll(MACROS.COMPANY_OWNER_PHONE, companyOwnerPhone)
  newMsg = newMsg.replaceAll(MACROS.COMPANY_EMAIL, companyEmail)

  const momentBirthDate = firebaseTimestampToMoment(customerBirthDate)
  if (momentBirthDate) {
    const formattedBirthDate = momentBirthDate.format('L')
    newMsg = newMsg.replaceAll(MACROS.CUSTOMER_BIRTH_DATE, formattedBirthDate)
  }

  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_NAME, customerName)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_WHATSAPP, customerWhatsapp)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_BIRTH_DAY, customerBirthDay)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_BIRTH_MONTH, customerBirthMonth)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_BIRTH_YEAR, customerBirthYear)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_PHONE, customerPhone)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_EMAIL, customerEmail)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_CEP, customerCep)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_CITY, customerCity)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_STATE, customerState)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_DISTRICT, customerDistrict)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_ADDRESS, customerAddress)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_NUMBER, customerNumber)
  newMsg = newMsg.replaceAll(MACROS.CUSTOMER_COMPLEMENT, customerComplement)

  newMsg = newMsg.replaceAll(MACROS.USER_NAME, userName)

  newMsg = newMsg.replaceAll(MACROS.SERVICE_TYPE_NAME, serviceTypeName)
  newMsg = newMsg.replaceAll(MACROS.SERVICE_TYPE_DESCRIPTION, serviceTypeDesc)

  const momentStartDate = firebaseTimestampToMoment(serviceStartDate)
  if (momentStartDate) {
    const formattedStartDate = momentStartDate.format('L')
    newMsg = newMsg.replaceAll(MACROS.SERVICE_START_DATE, formattedStartDate)
  }

  const momentEndDate = firebaseTimestampToMoment(serviceEndDate)
  if (momentEndDate) {
    const formattedEndDate = momentEndDate.format('L')
    newMsg = newMsg.replaceAll(MACROS.SERVICE_END_DATE, formattedEndDate)
  }

  return newMsg
}

export const testMessageWithMacros = (message) => {
  return parseMacros(message, {
    [COMPANY_DOC.FANTASY_NAME]: 'Next Msger',
    [COMPANY_DOC.CNPJ]: '99.999.999/9999-99',
    [COMPANY_DOC.NAME]: 'Next Msger LTDA ME',
    [COMPANY_DOC.OWNER_NAME]: 'Robert Brown Jr.',
    [COMPANY_DOC.OWNER_PHONE]: '(99) 99999-9999',
    [COMPANY_DOC.EMAIL]: 'nextmsger@nextmsger.com',

    [CUSTOMER_DOC.NAME]: 'John Green',
    [CUSTOMER_DOC.WHATSAPP]: '(88) 88888-8888',
    [CUSTOMER_DOC.BIRTH_DATE]: moment(),
    [CUSTOMER_DOC.BIRTH_DAY]: '12',
    [CUSTOMER_DOC.BIRTH_MONTH]: '04',
    [CUSTOMER_DOC.BIRTH_YEAR]: '2000',
    [CUSTOMER_DOC.PHONE]: '(77) 7777-7777',
    [CUSTOMER_DOC.EMAIL]: 'robert@robert.com',
    [CUSTOMER_DOC.CEP]: '99.999-999',
    [CUSTOMER_DOC.CITY]: 'Campinas',
    [CUSTOMER_DOC.STATE]: 'São Paulo',
    [CUSTOMER_DOC.DISTRICT]: 'Jardim das Flores',
    [CUSTOMER_DOC.ADDRESS]: 'Rua das Rosas',
    [CUSTOMER_DOC.NUMBER]: '999',
    [CUSTOMER_DOC.COMPLEMENT]: 'Perto de Rosas',

    [USER_DOC.NAME]: 'Jack Sparrow',

    [SERVICE_TYPE_DOC.NAME]: 'Concerto',
    [SERVICE_TYPE_DOC.DESCRIPTION]: 'Concerto de Algo',

    [SERVICE_DOC.START_DATE]: moment(),
    [SERVICE_DOC.END_DATE]: moment(),
  })
}
