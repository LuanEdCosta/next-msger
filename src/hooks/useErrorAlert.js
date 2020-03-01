import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

export default () => {
  const { t } = useTranslation('Error')

  const showAlert = useCallback(
    (
      message = t('defaultErrorMessage'),
      title = t('defaultErrorTitle'),
      buttons = [{ text: t('closeErrorAlertBtn') }],
      options = { cancelable: true },
    ) => {
      Alert.alert(title, message, buttons, options)
    },
    [t],
  )

  return showAlert
}
