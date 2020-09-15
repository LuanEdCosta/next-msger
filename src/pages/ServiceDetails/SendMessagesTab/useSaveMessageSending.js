import { useCallback, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, SERVICE_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { serviceData } = useContext(ServiceDetailsContext)
  const { companyId } = useUserData()

  const onSaveMessageSending = useCallback(
    async (marketingStepId, messageType) => {
      const {
        [SERVICE_DOC.ID]: serviceId,
        [SERVICE_DOC.SENT_MESSAGES]: messagesSentObject = {},
      } = serviceData || {}

      // Check if already sent this message before
      // If true don't send again
      const marketingStepMessages = messagesSentObject[marketingStepId] || {}
      const alreadySentThisMessage = marketingStepMessages[messageType]
      if (alreadySentThisMessage) return

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
              [messageType]: true,
            },
          },
        })
    },
    [companyId, serviceData],
  )

  return onSaveMessageSending
}
