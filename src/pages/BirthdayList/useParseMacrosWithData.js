import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { parseMacros } from '@/utils'

export default (customerData) => {
  const companyData = useSelector(({ Company }) => Company || {})
  const userData = useSelector(({ User }) => User || {})

  const onParseMacros = useCallback(
    (message) => {
      return parseMacros(message, {
        user: userData,
        company: companyData,
        customer: customerData,
      })
    },
    [companyData, customerData, userData],
  )

  return onParseMacros
}
