import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

export default () => {
  const showAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSetFinalized = useCallback(
    async (serviceData, isFinalized = false) => {
      try {
        const serviceId = serviceData[SERVICE_DOC.ID]
        if (!serviceId) throw new Error()

        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.SERVICES)
          .doc(serviceId)
          .update({
            [SERVICE_DOC.FINALIZED]: isFinalized,
          })
      } catch (e) {
        showAlert()
      }
    },
    [companyId, showAlert],
  )

  return onSetFinalized
}
