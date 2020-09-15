import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { SERVICE_DOC, COLLECTIONS } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default (serviceId, setIsDeleting) => {
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const onDeleteRating = useCallback(async () => {
    setIsDeleting(true)

    try {
      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.RATING]: null,
        })

      setIsDeleting(false)
    } catch (e) {
      setIsDeleting(false)
      showAlert()
    }
  }, [companyId, serviceId, setIsDeleting, showAlert])

  return onDeleteRating
}
