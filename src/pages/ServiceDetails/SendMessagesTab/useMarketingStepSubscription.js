import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'

export default (setIsLoading, setMarketingStepsList) => {
  const onSubscribeToMarketingStepCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.MARKETING_STEPS)
      .orderBy(MARKETING_STEP_DOC.NUMBER_OF_DAYS)
      .onSnapshot((querySnapshot) => {
        const marketingSteps = querySnapshot.docs.map((doc) => {
          const marketingStep = doc.data()
          marketingStep[MARKETING_STEP_DOC.ID] = doc.id
          return marketingStep
        })

        setIsLoading(false)
        setMarketingStepsList(marketingSteps)
      })

    return unsubscribe
  }, [setIsLoading, setMarketingStepsList])

  return onSubscribeToMarketingStepCollection
}
