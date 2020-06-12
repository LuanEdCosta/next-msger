import { useCallback, useContext } from 'react'

import { useErrorAlert, useSendWhatsAppMessage } from '@/hooks'
import { PHONE_COUNTRY_CODES } from '@/config/constants'
import { CUSTOMER_DOC, MARKETING_STEP_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSendWhatsAppMessage = useSendWhatsAppMessage()
  const showAlert = useErrorAlert()

  const onSendWhatsAppToCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData

        const {
          [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: whatsMessage,
        } = marketingStep

        // We need to change the code to open whatsapp in another country
        await onSendWhatsAppMessage({
          msg: whatsMessage,
          phoneNumber: whatsNumber,
          countryCode: PHONE_COUNTRY_CODES.BRAZIL,
        })
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onSendWhatsAppMessage, showAlert],
  )

  return onSendWhatsAppToCustomer
}
