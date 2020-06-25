import { useCallback } from 'react'
import auth from '@react-native-firebase/auth'

import { useErrorAlert } from '@/hooks'

export default () => {
  const showAlert = useErrorAlert()

  const onEditUserEmail = useCallback(
    async (email, setIsEditing) => {
      try {
        setIsEditing(true)
        await auth().currentUser.updateEmail(email)
      } catch (e) {
        showAlert()
        return false
      } finally {
        setIsEditing(false)
      }

      return true
    },
    [showAlert],
  )

  return onEditUserEmail
}
