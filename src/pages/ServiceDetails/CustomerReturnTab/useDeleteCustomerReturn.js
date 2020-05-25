import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS } from '@/config/database'
import { useErrorAlert } from '@/hooks'

export default () => {
  const showAlert = useErrorAlert()

  const onDeleteCustomerReturn = useCallback(
    async (returnId) => {
      try {
        await firestore()
          .collection(COLLECTIONS.CUSTOMER_RETURNS)
          .doc(returnId)
          .delete()
      } catch (e) {
        showAlert()
      }
    },
    [showAlert],
  )

  return onDeleteCustomerReturn
}
