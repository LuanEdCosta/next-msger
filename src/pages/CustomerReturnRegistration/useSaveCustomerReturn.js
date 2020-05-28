import { useCallback, useContext } from 'react'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, CUSTOMER_RETURN_DOC } from '@/config/database'

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
  } = useContext(CustomerReturnContext)

  const onSaveCustomerReturn = useCallback(async () => {
    setIsShowingErrors(true)
    if (!returnDate) return
    setIsSaving(true)

    try {
      const now = firestore.FieldValue.serverTimestamp()

      const returnDateTimestamp = moment(returnDate)
        .utc()
        .valueOf()

      const returnHourTimestamp = moment(returnHour)
        .utc()
        .valueOf()

      const dataToSave = {
        [CUSTOMER_RETURN_DOC.REASON]: '',
        [CUSTOMER_RETURN_DOC.CREATED_AT]: now,
        [CUSTOMER_RETURN_DOC.SERVICE_ID]: serviceId,
        [CUSTOMER_RETURN_DOC.OBSERVATIONS]: observations,
        [CUSTOMER_RETURN_DOC.RETURN_DATE]: returnDateTimestamp,
        [CUSTOMER_RETURN_DOC.RETURN_HOUR]: returnHourTimestamp,
      }

      if (isEditing) {
        delete dataToSave[CUSTOMER_RETURN_DOC.CREATED_AT]
        await firestore()
          .collection(COLLECTIONS.CUSTOMER_RETURNS)
          .doc(returnIdParam)
          .update(dataToSave)
      } else {
        await firestore()
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
    returnDate,
    setIsSaving,
    returnHour,
    serviceId,
    observations,
    isEditing,
    navigation,
    returnIdParam,
    showAlert,
  ])

  return onSaveCustomerReturn
}
