import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { SERVICE_DOC, COLLECTIONS } from '@/config/database'
import { useErrorAlert } from '@/hooks'

export default (serviceId, setIsDeleting) => {
  const showAlert = useErrorAlert()

  const onDeleteRating = useCallback(async () => {
    setIsDeleting(true)

    try {
      await firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.RATING_KEY]: null,
        })

      setIsDeleting(false)
    } catch (e) {
      setIsDeleting(false)
      showAlert()
    }
  }, [serviceId, setIsDeleting, showAlert])

  return onDeleteRating
}
