import { useCallback, useContext } from 'react'
import { useSelector } from 'react-redux'

import { parseMacros } from '@/utils'
import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const companyData = useSelector(({ Company }) => Company || {})
  const { serviceData } = useContext(ServiceDetailsContext)
  const userData = useSelector(({ User }) => User || {})

  const onParseMacros = useCallback(
    (message) => {
      const serviceTypeData = serviceData[SERVICE_DOC.SERVICE_TYPE] || {}
      const customerData = serviceData[SERVICE_DOC.CUSTOMER] || {}

      return parseMacros(message, {
        user: userData,
        company: companyData,
        service: serviceData,
        customer: customerData,
        serviceType: serviceTypeData,
      })
    },
    [companyData, serviceData, userData],
  )

  return onParseMacros
}
