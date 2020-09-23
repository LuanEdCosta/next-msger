import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, RETURN_REASON_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

export default (setIsLoading, setReturnReasonList) => {
  const { companyId } = useUserData()

  const onSubscribeToReturnReasonCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.RETURN_REASONS)
      .onSnapshot((querySnapshot) => {
        const returnReasons = querySnapshot.docs
          .map((doc) => {
            if (doc.exists) {
              const reason = doc.data()
              reason[RETURN_REASON_DOC.ID] = doc.id
              return reason
            }

            return null
          })
          .filter((reason) => !!reason)

        setIsLoading(false)
        setReturnReasonList(returnReasons)
      })

    return unsubscribe
  }, [companyId, setIsLoading, setReturnReasonList])

  return onSubscribeToReturnReasonCollection
}
