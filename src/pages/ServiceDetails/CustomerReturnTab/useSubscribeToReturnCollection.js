import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

import { COLLECTIONS, CUSTOMER_RETURN_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

export default (setReturnsList, setIsLoading, serviceId) => {
  const { companyId } = useUserData()

  const onSubscribeToReturnCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.SERVICES)
      .doc(serviceId)
      .collection(COLLECTIONS.CUSTOMER_RETURNS)
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
  }, [companyId, serviceId, setIsLoading, setReturnsList])

  return onSubscribeToReturnCollection
}
