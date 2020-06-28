import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import {
  COLLECTIONS,
  SERVICE_DOC,
  CUSTOMER_DOC,
  CUSTOMER_RETURN_DOC,
} from '@/config/database'

export default () => {
  const onFetchStatistics = useCallback(async () => {
    const firstDayOfMonth = moment()
      .startOf('month')
      .utc()
      .toDate()

    const servicesQuery = firestore()
      .collection(COLLECTIONS.SERVICES)
      .where(SERVICE_DOC.CREATED_AT, '>=', firstDayOfMonth)

    const customersQuery = firestore()
      .collection(COLLECTIONS.CUSTOMERS)
      .where(CUSTOMER_DOC.CREATED_AT, '>=', firstDayOfMonth)

    const customerReturnsQuery = firestore()
      .collection(COLLECTIONS.CUSTOMER_RETURNS)
      .where(CUSTOMER_RETURN_DOC.CREATED_AT, '>=', firstDayOfMonth)

    const numberOfServicesSnapshot = await servicesQuery.get()
    const numberOfCustomersSnapshot = await customersQuery.get()
    const customerReturnsSnapshot = await customerReturnsQuery.get()

    const onlyRatedServices = numberOfServicesSnapshot.docs.filter(
      (documentSnapshot) => {
        const data = documentSnapshot.data() || {}
        return !!data[SERVICE_DOC.RATING_KEY]
      },
    )

    return {
      numberOfServices: numberOfServicesSnapshot.size,
      numberOfCustomers: numberOfCustomersSnapshot.size,
      servicesWithReturn: customerReturnsSnapshot.size,
      ratedServices: onlyRatedServices.length,
    }
  }, [])

  return onFetchStatistics
}
