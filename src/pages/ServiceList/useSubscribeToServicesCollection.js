import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

export default (setIsLoading, setServiceList) => {
  const onSubscribeToServicesCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.SERVICES)
      .onSnapshot((querySnapshot) => {
        const services = querySnapshot.docs
          .map((doc) => {
            if (doc.exists) {
              const service = doc.data()
              service[SERVICE_DOC.ID] = doc.id
              return service
            }

            return null
          })
          .filter((service) => !!service)

        setIsLoading(false)
        setServiceList(services)
      })

    return unsubscribe
  }, [setIsLoading, setServiceList])

  return onSubscribeToServicesCollection
}
