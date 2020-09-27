import { useCallback, useContext } from 'react'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, CUSTOMER_RETURN_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

import CustomerReturnContext from './context'

/**
 * @description This hook add and edit a return
 */
export default () => {
  const {
    showAlert,
    navigation,

    serviceId,
    returnIdParam,
    isEditing,

    observations,
    returnDate,
    returnHour,
    setIsShowingErrors,
    setIsSaving,
    selectedReason,
  } = useContext(CustomerReturnContext)

  const { companyId } = useUserData()

  const onSaveCustomerReturn = useCallback(async () => {
    setIsShowingErrors(true)
    if (!selectedReason || !returnDate) return
    setIsSaving(true)

    try {
      const now = firestore.FieldValue.serverTimestamp()

      const returnDateTimestamp = firestore.Timestamp.fromDate(
        moment(returnDate).toDate(),
      )

      const returnHourTimestamp = firestore.Timestamp.fromDate(
        moment(returnHour).toDate(),
      )

      const dataToSave = {
        [CUSTOMER_RETURN_DOC.CREATED_AT]: now,
        [CUSTOMER_RETURN_DOC.SERVICE_ID]: serviceId,
        [CUSTOMER_RETURN_DOC.OBSERVATIONS]: observations,
        [CUSTOMER_RETURN_DOC.RETURN_DATE]: returnDateTimestamp,
        [CUSTOMER_RETURN_DOC.RETURN_HOUR]: returnHourTimestamp,
        [CUSTOMER_RETURN_DOC.REASON]: selectedReason,
      }

      if (isEditing) {
        delete dataToSave[CUSTOMER_RETURN_DOC.CREATED_AT]
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.SERVICES)
          .doc(serviceId)
          .collection(COLLECTIONS.CUSTOMER_RETURNS)
          .doc(returnIdParam)
          .update(dataToSave)
      } else {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.SERVICES)
          .doc(serviceId)
          .collection(COLLECTIONS.CUSTOMER_RETURNS)
          .add(dataToSave)
      }

      setIsSaving(false)
      navigation.goBack()
    } catch (e) {
      setIsSaving(false)
      showAlert()
    }
  }, [
    setIsShowingErrors,
    selectedReason,
    returnDate,
    setIsSaving,
    returnHour,
    serviceId,
    observations,
    isEditing,
    navigation,
    companyId,
    returnIdParam,
    showAlert,
  ])

  return onSaveCustomerReturn
}
