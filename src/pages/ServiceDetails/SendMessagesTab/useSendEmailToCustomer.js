import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendEmailMessage } from '@/hooks'
import {
  CUSTOMER_DOC,
  MARKETING_STEP_DOC,
  SERVICE_DOC,
} from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useSaveMessageSending from './useSaveMessageSending'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSaveMesageSending = useSaveMessageSending()
  const onSendEmailMessage = useSendEmailMessage()
  const showAlert = useErrorAlert()

  const onSendEmailToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const {
          [MARKETING_STEP_DOC.ID]: marketingStepId,
          [MARKETING_STEP_DOC.EMAIL_MESSAGE]: emailMessage,
        } = marketingStep

        const { [CUSTOMER_DOC.EMAIL]: customerEmail } = customerData
        await onSendEmailMessage(customerEmail, '', emailMessage)

        await onSaveMesageSending(
          marketingStepId,
          SERVICE_DOC.MESSAGES_SENT.EMAIL,
        )
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSaveMesageSending, onSendEmailMessage, showAlert],
  )

  return onSendEmailToCustomer
}
