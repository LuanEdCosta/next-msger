import { useCallback } from 'react'
import { Linking } from 'react-native'

import { getOnlyPhoneNumbers } from '@/helpers'

export default () => {
  const onSendMessage = useCallback(
    async ({ phoneNumber = '', msg = '', countryCode = '' } = {}) => {
      const formattedPhoneNumber = getOnlyPhoneNumbers(phoneNumber)
      const message = msg || ''

      await Linking.openURL(
        `whatsapp://send?text=${message}&phone=${countryCode}${formattedPhoneNumber}`,
      )
    },
    [],
  )

  return onSendMessage
}
