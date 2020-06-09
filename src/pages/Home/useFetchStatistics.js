import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { COLLECTIONS, SERVICE_DOC, CUSTOMER_DOC } from '@/config/database'

export default () => {
  const onFetchHomeStatistics = useCallback(async () => {
    const firstDayOfMonth = moment()
      .startOf('month')
      .utc()
      .toDate()

    const servicesQuery = await firestore()
      .collection(COLLECTIONS.SERVICES)
      .where(SERVICE_DOC.CREATED_AT, '>=', firstDayOfMonth)
      .get()

    const customersQuery = await firestore()
      .collection(COLLECTIONS.CUSTOMERS)
      .where(CUSTOMER_DOC.CREATED_AT, '>=', firstDayOfMonth)
      .get()

    return {
      numberOfServices: servicesQuery.size,
      numberOfCustomers: customersQuery.size,
    }
  }, [])

  return onFetchHomeStatistics
}
