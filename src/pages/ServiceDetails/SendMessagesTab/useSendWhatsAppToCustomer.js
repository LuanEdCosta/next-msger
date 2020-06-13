import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendWhatsAppMessage } from '@/hooks'
import { PHONE_COUNTRY_CODES } from '@/config/constants'
import {
  CUSTOMER_DOC,
  MARKETING_STEP_DOC,
  SERVICE_DOC,
} from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useSaveMessageSending from './useSaveMessageSending'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSendWhatsAppMessage = useSendWhatsAppMessage()
  const onSaveMesageSending = useSaveMessageSending()
  const showAlert = useErrorAlert()

  const onSendWhatsAppToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData

        const {
          [MARKETING_STEP_DOC.ID]: marketingStepId,
          [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: whatsMessage,
        } = marketingStep

        // We need to change the code to open whatsapp in another country
        await onSendWhatsAppMessage({
          msg: whatsMessage,
          phoneNumber: whatsNumber,
          countryCode: PHONE_COUNTRY_CODES.BRAZIL,
        })

        await onSaveMesageSending(
          marketingStepId,
          SERVICE_DOC.MESSAGES_SENT.WHATSAPP,
        )
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSaveMesageSending, onSendWhatsAppMessage, showAlert],
  )

  return onSendWhatsAppToCustomer
}
