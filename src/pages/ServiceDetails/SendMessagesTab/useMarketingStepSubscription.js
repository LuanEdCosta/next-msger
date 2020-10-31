import firestore from '@react-native-firebase/firestore'
import { useCallback } from 'react'

import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

export default (setIsLoading, setMarketingStepsList) => {
  const { companyId } = useUserData()

  const onSubscribeToMarketingStepCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.MARKETING_STEPS)
      .orderBy(MARKETING_STEP_DOC.MILLISECONDS)
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
  }, [companyId, setIsLoading, setMarketingStepsList])

  return onSubscribeToMarketingStepCollection
}
