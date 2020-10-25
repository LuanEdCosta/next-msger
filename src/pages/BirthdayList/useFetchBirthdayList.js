import { useCallback } from 'react'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'

export default (setBirthdayList, setIsLoading, setIsRefreshing) => {
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const handleFetchCustomers = useCallback(
    async (filterBirthDay, limit = 10, isRefreshing = false) => {
      try {
        if (isRefreshing) setIsLoading(true)
        else setIsRefreshing(true)

        const momentBirthDay = moment(filterBirthDay || undefined)
        const birthDayAndMonth = momentBirthDay.format('DD/MM')
        const [birthDay, birthMonth] = birthDayAndMonth.split('/') || []

        const querySnapshot = await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.CUSTOMERS)
          .where(CUSTOMER_DOC.CAN_RECEIVE_MESSAGES, '==', true)
          .where(CUSTOMER_DOC.BIRTH_DAY, '==', birthDay)
          .where(CUSTOMER_DOC.BIRTH_MONTH, '==', birthMonth)
          .limit(limit)
          .get()

        const customers = querySnapshot.docs.map((document) => {
          return {
            [CUSTOMER_DOC.ID]: document.id,
            ...document.data(),
          }
        })

        setBirthdayList(customers)
      } catch (e) {
        showErrorAlert()
      } finally {
        setIsRefreshing(false)
        setIsLoading(false)
      }
    },
    [companyId, setBirthdayList, setIsLoading, setIsRefreshing, showErrorAlert],
  )

  return handleFetchCustomers
}
