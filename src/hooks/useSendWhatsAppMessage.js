import { useCallback } from 'react'
import { Linking } from 'react-native'

export default () => {
  const onSendMessage = useCallback(
    async ({ phoneNumber = '', msg = '', countryCode = '' } = {}) => {
      const leftParenthesisRegex = new RegExp('\\(', 'g')
      const lightParenthesisRegex = new RegExp('\\)', 'g')
      const whiteSpaceRegex = new RegExp(' ', 'g')

      const formattedPhoneNumber = phoneNumber
        ? phoneNumber
            .replace(leftParenthesisRegex, '')
            .replace(lightParenthesisRegex, '')
            .replace(whiteSpaceRegex, '')
        : ''

      await Linking.openURL(
        `whatsapp://send?text=${msg ||
          ''}&phone=${countryCode}${formattedPhoneNumber}`,
      )
    },
    [],
  )

  return onSendMessage
}
