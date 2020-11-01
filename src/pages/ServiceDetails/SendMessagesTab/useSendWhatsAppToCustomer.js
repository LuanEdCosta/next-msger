import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendWhatsAppMessage } from '@/hooks'
import { PHONE_COUNTRY_CODES } from '@/config/constants'
import {
  CUSTOMER_DOC,
  MARKETING_STEP_DOC,
  SERVICE_SENT_MSGS,
} from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useSaveMessageSending from './useSaveMessageSending'
import useParseMacrosWithData from './useParseMacrosWithData'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSendWhatsAppMessage = useSendWhatsAppMessage()
  const onSaveMessageSending = useSaveMessageSending()
  const onParseMacros = useParseMacrosWithData()
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
          msg: onParseMacros(whatsMessage),
          phoneNumber: whatsNumber,
          countryCode: PHONE_COUNTRY_CODES.BRAZIL,
        })

        await onSaveMessageSending(marketingStepId, SERVICE_SENT_MSGS.WHATSAPP)
      } catch (e) {
        showAlert()
      }
    },
    [
      customerData,
      onParseMacros,
      onSaveMessageSending,
      onSendWhatsAppMessage,
      showAlert,
    ],
  )

  return onSendWhatsAppToCustomer
}
