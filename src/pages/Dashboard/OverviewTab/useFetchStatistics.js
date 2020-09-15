import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import {
  COLLECTIONS,
  SERVICE_DOC,
  CUSTOMER_DOC,
  CUSTOMER_RETURN_DOC,
} from '@/config/database'
import { useUserData } from '@/hooks'

export default () => {
  const { companyId } = useUserData()

  const onFetchStatistics = useCallback(
    async (filterDate) => {
      const filterTimeStamp = moment(filterDate).utc().toDate()

      const servicesQuery = firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .where(SERVICE_DOC.CREATED_AT, '>=', filterTimeStamp)

      const customersQuery = firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.CUSTOMERS)
        .where(CUSTOMER_DOC.CREATED_AT, '>=', filterTimeStamp)

      const customerReturnsQuery = firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.CUSTOMER_RETURNS)
        .where(CUSTOMER_RETURN_DOC.CREATED_AT, '>=', filterTimeStamp)

      const numberOfServicesSnapshot = await servicesQuery.get()
      const numberOfCustomersSnapshot = await customersQuery.get()
      const customerReturnsSnapshot = await customerReturnsQuery.get()

      const onlyRatedServices = numberOfServicesSnapshot.docs.filter(
        (documentSnapshot) => {
          const data = documentSnapshot.data() || {}
          return !!data[SERVICE_DOC.RATING]
        },
      )

      return {
        numberOfServices: numberOfServicesSnapshot.size,
        numberOfCustomers: numberOfCustomersSnapshot.size,
        servicesWithReturn: customerReturnsSnapshot.size,
        ratedServices: onlyRatedServices.length,
      }
    },
    [companyId],
  )

  return onFetchStatistics
}
