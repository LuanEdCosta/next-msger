import { useCallback, useContext } from 'react'

import { useErrorAlert, usePhoneCall } from '@/hooks'
import {
  CUSTOMER_DOC,
  MARKETING_STEP_DOC,
  SERVICE_SENT_MSGS,
} from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useSaveMessageSending from './useSaveMessageSending'

export default () => {
  const { customerData } = useContext(ServiceDetailsContext)
  const onSaveMesSageSending = useSaveMessageSending()
  const onPhoneCall = usePhoneCall()
  const showAlert = useErrorAlert()

  const onCallCustomer = useCallback(
    async (marketingStep) => {
      try {
        const { [MARKETING_STEP_DOC.ID]: marketingStepId } = marketingStep
        const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = customerData
        await onPhoneCall(whatsNumber)
        await onSaveMesSageSending(marketingStepId, SERVICE_SENT_MSGS.CALL)
      } catch (e) {
        showAlert()
      }
    },
    [customerData, onPhoneCall, onSaveMesSageSending, showAlert],
  )

  return onCallCustomer
}
