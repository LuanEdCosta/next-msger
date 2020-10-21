import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert, useUserData } from '@/hooks'
import {
  COLLECTIONS,
  COMPANY_DOC,
  BIRTHDAY_MESSAGES_CONFIG as BMC,
} from '@/config/database'

export default (setIsSaving) => {
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSaveBirthdayMsgsConfig = useCallback(
    async ({
      birthdayMessage,
      futureBirthdayMessage,
      delayedBirthdayMessage,
    }) => {
      try {
        setIsSaving(true)

        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .update({
            [COMPANY_DOC.BIRTHDAY_MESSAGES_CONFIG]: {
              [BMC.BIRTHDAY_MESSAGE]: birthdayMessage,
              [BMC.FUTURE_BIRTHDAY_MESSAGE]: futureBirthdayMessage,
              [BMC.DELAYED_BIRTHDAY_MESSAGE]: delayedBirthdayMessage,
            },
          })
      } catch (e) {
        showErrorAlert()
      } finally {
        setIsSaving(false)
      }
    },
    [companyId, setIsSaving, showErrorAlert],
  )

  return onSaveBirthdayMsgsConfig
}
