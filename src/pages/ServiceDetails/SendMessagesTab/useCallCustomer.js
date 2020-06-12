import { useCallback, useContext } from 'react'

import { useErrorAlert, usePhoneCall } from '@/hooks'
import { CUSTOMER_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onPhoneCall = usePhoneCall()
  const showAlert = useErrorAlert()

  const onCallCustomer = useCallback(async () => {
    try {
      const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData
      await onPhoneCall(whatsNumber)
    } catch (e) {
      showAlert()
    }
  }, [customerData, onPhoneCall, showAlert])

  return onCallCustomer
}
