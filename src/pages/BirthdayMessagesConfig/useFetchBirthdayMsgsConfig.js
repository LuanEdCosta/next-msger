import { useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import {
  COLLECTIONS,
  BIRTHDAY_MESSAGES_CONFIG as BMC,
  COMPANY_DOC,
} from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default ({
  setBirthdayMessage,
  setFutureBirthdayMessage,
  setDelayedBirthdayMessage,
}) => {
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSubscribeToCompanyDocument = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .onSnapshot({
        error: showErrorAlert,
        next(doc) {
          const data = doc.data()

          const {
            [BMC.BIRTHDAY_MESSAGE]: birthdayMessage = '',
            [BMC.FUTURE_BIRTHDAY_MESSAGE]: futureBirthdayMessage = '',
            [BMC.DELAYED_BIRTHDAY_MESSAGE]: delayedBirthdayMessage = '',
          } = data[COMPANY_DOC.BIRTHDAY_MESSAGES_CONFIG] || {}

          setBirthdayMessage(birthdayMessage)
          setFutureBirthdayMessage(futureBirthdayMessage)
          setDelayedBirthdayMessage(delayedBirthdayMessage)
        },
      })

    return unsubscribe
  }, [
    companyId,
    setBirthdayMessage,
    setDelayedBirthdayMessage,
    setFutureBirthdayMessage,
    showErrorAlert,
  ])

  useEffect(onSubscribeToCompanyDocument, [])
}
