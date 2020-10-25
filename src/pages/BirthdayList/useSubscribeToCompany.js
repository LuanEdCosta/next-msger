import { useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, COMPANY_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default (setCompanyData) => {
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSubscribeToBirthdayMessages = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .onSnapshot({
        error: showErrorAlert,
        next(doc) {
          if (doc.exists) {
            const data = doc.data()
            setCompanyData({
              [COMPANY_DOC.ID]: doc.id,
              ...data,
            })
          }
        },
      })

    return unsubscribe
  }, [companyId, setCompanyData, showErrorAlert])

  useEffect(onSubscribeToBirthdayMessages, [])
}
