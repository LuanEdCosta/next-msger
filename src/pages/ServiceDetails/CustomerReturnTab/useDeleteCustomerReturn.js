import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default () => {
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const onDeleteCustomerReturn = useCallback(
    async (returnId) => {
      try {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.CUSTOMER_RETURNS)
          .doc(returnId)
          .delete()
      } catch (e) {
        showAlert()
      }
    },
    [companyId, showAlert],
  )

  return onDeleteCustomerReturn
}
