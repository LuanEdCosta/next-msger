import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendSmsMessage } from '@/hooks'
import { CUSTOMER_DOC, MARKETING_STEP_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSendSmsMessage = useSendSmsMessage()
  const showAlert = useErrorAlert()

  const onSendSmsToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData
        const { [MARKETING_STEP_DOC.SMS_MESSAGE]: smsMessage } = marketingStep
        await onSendSmsMessage(whatsNumber, smsMessage)
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSendSmsMessage, showAlert],
  )

  return onSendSmsToCustomer
}
