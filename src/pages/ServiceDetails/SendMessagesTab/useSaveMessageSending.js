import { useCallback, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, SERVICE_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { serviceData } = useContext(ServiceDetailsContext)
  const { companyId } = useUserData()

  const onSaveMessageSending = useCallback(
    async (marketingStepId, messageType, wasSent = true) => {
      const {
        [SERVICE_DOC.ID]: serviceId,
        [SERVICE_DOC.SENT_MESSAGES]: messagesSentObject = {},
      } = serviceData || {}

      // Just update if the flag is different from the one in database
      const marketingStepMessages = messagesSentObject[marketingStepId] || {}
      const currentFlagValue = !!marketingStepMessages[messageType]
      if (currentFlagValue === wasSent) return

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.SENT_MESSAGES]: {
            ...messagesSentObject,
            [marketingStepId]: {
              ...marketingStepMessages,
              [messageType]: wasSent,
            },
          },
        })
    },
    [companyId, serviceData],
  )

  return onSaveMessageSending
}
