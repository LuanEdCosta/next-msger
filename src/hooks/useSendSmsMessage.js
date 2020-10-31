import { useCallback } from 'react'
import { Linking, Platform } from 'react-native'

import { getOnlyPhoneNumbers } from '@/utils'

export default () => {
  const onSendSmsMessage = useCallback(
    async (phoneNumber = '', message = '') => {
      const separator = Platform.OS === 'ios' ? '&' : '?'
      const formattedPhoneNumber = getOnlyPhoneNumbers(phoneNumber)

      const urlArray = [
        `sms:${formattedPhoneNumber}`,
        message ? `body=${message}` : '',
      ]

      const url = urlArray.join(separator)
      await Linking.openURL(url)
    },
    [],
  )

  return onSendSmsMessage
}
