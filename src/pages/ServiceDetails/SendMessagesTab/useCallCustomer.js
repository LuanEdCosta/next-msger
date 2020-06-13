import { useCallback, useContext } from 'react'

import { useErrorAlert, usePhoneCall } from '@/hooks'
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
  const onPhoneCall = usePhoneCall()
  const showAlert = useErrorAlert()

  const onCallCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [MARKETING_STEP_DOC.ID]: marketingStepId } = marketingStep

        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData
        await onPhoneCall(whatsNumber)

        await onSaveMesageSending(
          marketingStepId,
          SERVICE_DOC.MESSAGES_SENT.CALL,
        )
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onPhoneCall, onSaveMesageSending, showAlert],
  )

  return onCallCustomer
}
