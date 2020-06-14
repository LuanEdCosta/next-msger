import { useCallback, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

export default () => {
  const { serviceData } = useContext(ServiceDetailsContext)

  const onSaveMesageSending = useCallback(
    async (marketingStepId, messageType) => {
      const {
        [SERVICE_DOC.ID]: serviceId,
        [SERVICE_DOC.MESSAGES_SENT_KEY]: messagesSentObject = {},
      } = serviceData || {}

      // Check if already sent this message before
      // If true don't send again
      const marketingStepMessages = messagesSentObject[marketingStepId] || {}
      const alreadySentThisMessage = marketingStepMessages[messageType]
      if (alreadySentThisMessage) return

      await firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.MESSAGES_SENT_KEY]: {
            ...messagesSentObject,
            [marketingStepId]: {
              ...marketingStepMessages,
              [messageType]: true,
            },
          },
        })
    },
    [serviceData],
  )

  return onSaveMesageSending
}
