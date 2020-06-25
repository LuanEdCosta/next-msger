import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, USER_DOC } from '@/config/database'
import { useErrorAlert, useDispatchCallback } from '@/hooks'
import { setUserData } from '@/store/actions'

export default () => {
  const showAlert = useErrorAlert()
  const onSetUserData = useDispatchCallback(setUserData)

  const onEditUserName = useCallback(
    async (userId, name, setIsEditing) => {
      try {
        setIsEditing(true)

        const dataToEdit = {
          [USER_DOC.NAME]: name,
        }

        await firestore()
          .collection(COLLECTIONS.USERS)
          .doc(userId)
          .update(dataToEdit)

        onSetUserData(dataToEdit)
      } catch (e) {
        showAlert()
        return false
      } finally {
        setIsEditing(false)
      }

      return true
    },
    [onSetUserData, showAlert],
  )

  return onEditUserName
}
