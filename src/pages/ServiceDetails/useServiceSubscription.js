import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

export default (serviceId, setServiceData) => {
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const onSubscribeToServiceDocument = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.SERVICES)
      .doc(serviceId)
      .onSnapshot({
        error: showAlert,
        next(doc) {
          setServiceData({
            ...doc.data(),
            [SERVICE_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [companyId, serviceId, setServiceData, showAlert])

  return onSubscribeToServiceDocument
}
