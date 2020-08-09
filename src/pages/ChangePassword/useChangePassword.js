import { useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'

import { useErrorAlert } from '@/hooks'
import { NAVIGATOR_ROUTES } from '@/config/navigation/ScreenRoutes'

export default (setIsChangingPassword, navigation) => {
  const { t } = useTranslation('ChangePassword')
  const showError = useErrorAlert()

  const onChangePassword = useCallback(
    async (currentPassword, password) => {
      try {
        setIsChangingPassword(true)

        const emailCredential = auth.EmailAuthProvider.credential(
          auth().currentUser.email,
          currentPassword,
        )

        await auth().currentUser.reauthenticateWithCredential(emailCredential)
        await auth().currentUser.updatePassword(password)
        await auth().signOut()

        setIsChangingPassword(false)
        navigation.navigate(NAVIGATOR_ROUTES.LOGIN_NAVIGATOR)
      } catch (e) {
        showError(t('changePasswordFailedMsg'), t('changePasswordFailed'))
        setIsChangingPassword(false)
      }
    },
    [navigation, setIsChangingPassword, showError, t],
  )

  return onChangePassword
}
