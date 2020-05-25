import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

import { COLLECTIONS, CUSTOMER_RETURN_DOC } from '@/config/database'

export default (setReturnsList, setIsLoading, serviceId) => {
  const onSubscribeToReturnCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.CUSTOMER_RETURNS)
      .where(CUSTOMER_RETURN_DOC.SERVICE_ID, '==', serviceId)
      .onSnapshot((querySnapshot) => {
        const returns = querySnapshot.docs.map((doc) => {
          const returnItem = doc.data()
          returnItem[CUSTOMER_RETURN_DOC.ID] = doc.id
          return returnItem
        })

        setIsLoading(false)
        setReturnsList(returns)
      })

    return unsubscribe
  }, [serviceId, setIsLoading, setReturnsList])

  return onSubscribeToReturnCollection
}
