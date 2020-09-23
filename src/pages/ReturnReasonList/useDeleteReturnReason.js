import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default () => {
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const onDeleteReturnReason = useCallback(
    async (id) => {
      try {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.RETURN_REASONS)
          .doc(id)
          .delete()
      } catch (e) {
        showAlert()
      }
    },
    [companyId, showAlert],
  )

  return onDeleteReturnReason
}
