import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendEmailMessage } from '@/hooks'
import { CUSTOMER_DOC, MARKETING_STEP_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSendEmailMessage = useSendEmailMessage()
  const showAlert = useErrorAlert()

  const onSendEmailToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [CUSTOMER_DOC.EMAIL]: customerEmail } = customerData

        const {
          [MARKETING_STEP_DOC.EMAIL_MESSAGE]: emailMessage,
        } = marketingStep

        await onSendEmailMessage(customerEmail, '', emailMessage)
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSendEmailMessage, showAlert],
  )

  return onSendEmailToCustomer
}
