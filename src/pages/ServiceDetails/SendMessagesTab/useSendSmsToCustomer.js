import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendSmsMessage } from '@/hooks'
import {
  CUSTOMER_DOC,
  MARKETING_STEP_DOC,
  SERVICE_SENT_MSGS,
} from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useSaveMessageSending from './useSaveMessageSending'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSaveMessageSending = useSaveMessageSending()
  const onSendSmsMessage = useSendSmsMessage()
  const showAlert = useErrorAlert()

  const onSendSmsToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const {
          [MARKETING_STEP_DOC.ID]: marketingStepId,
          [MARKETING_STEP_DOC.SMS_MESSAGE]: smsMessage,
        } = marketingStep

        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData
        await onSendSmsMessage(whatsNumber, smsMessage)
        await onSaveMessageSending(marketingStepId, SERVICE_SENT_MSGS.SMS)
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSaveMessageSending, onSendSmsMessage, showAlert],
  )

  return onSendSmsToCustomer
}
