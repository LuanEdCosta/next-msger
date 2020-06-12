import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC, CUSTOMER_DOC } from '@/config/database'

export default (serviceData, setCustomerData) => {
  const showAlert = useErrorAlert()

  const onFetchCustomerData = useCallback(async () => {
    try {
      if (serviceData) {
        const customer = serviceData[SERVICE_DOC.CUSTOMER_KEY] || {}
        const customerId = customer[SERVICE_DOC.CUSTOMER.ID]

        const querySnapshot = await firestore()
          .collection(COLLECTIONS.CUSTOMERS)
          .doc(customerId)
          .get()

        if (querySnapshot) {
          setCustomerData({
            ...querySnapshot.data(),
            [CUSTOMER_DOC.ID]: querySnapshot.id,
          })
        }
      }
    } catch (e) {
      showAlert()
    }
  }, [serviceData, setCustomerData, showAlert])

  return onFetchCustomerData
}
