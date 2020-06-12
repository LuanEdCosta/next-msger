import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

export default (serviceId, setServiceData) => {
  const showAlert = useErrorAlert()

  const onSubscribeToServiceDocument = useCallback(() => {
    const unsubscribe = firestore()
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
  }, [serviceId, setServiceData, showAlert])

  return onSubscribeToServiceDocument
}
