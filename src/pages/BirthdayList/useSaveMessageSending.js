import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'

export default () => {
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSaveMessageSending = useCallback(
    async (customerId, currentYear, channelType) => {
      try {
        if (!customerId) throw new Error()

        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.CUSTOMERS)
          .doc(customerId)
          .set(
            {
              [CUSTOMER_DOC.BIRTH_DAY_SENT_MESSAGES]: {
                [currentYear]: {
                  [channelType]: true,
                },
              },
            },
            { merge: true },
          )
      } catch (e) {
        showErrorAlert()
      }
    },
    [companyId, showErrorAlert],
  )

  return onSaveMessageSending
}
