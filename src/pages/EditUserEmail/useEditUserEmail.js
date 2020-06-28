import { useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'

import { useErrorAlert } from '@/hooks'

export default () => {
  const { t } = useTranslation('EditUserProfile')

  const showAlert = useErrorAlert()

  const onEditUserEmail = useCallback(
    async (email, setIsEditing, password) => {
      try {
        setIsEditing(true)

        const emailCredential = auth.EmailAuthProvider.credential(
          auth().currentUser.email,
          password,
        )

        await auth().currentUser.reauthenticateWithCredential(emailCredential)
        await auth().currentUser.updateEmail(email)
      } catch (e) {
        showAlert(t('wrongPasswordErrorMessage'))
        return false
      } finally {
        setIsEditing(false)
      }

      return true
    },
    [showAlert, t],
  )

  return onEditUserEmail
}
