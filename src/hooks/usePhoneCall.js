import { useCallback } from 'react'
import { Linking } from 'react-native'

export default () => {
  const onPhoneCall = useCallback(async (phoneNumber = null) => {
    if (phoneNumber) {
      const leftParenthesisRegex = new RegExp('\\(', 'g')
      const lightParenthesisRegex = new RegExp('\\)', 'g')
      const whiteSpaceRegex = new RegExp(' ', 'g')

      const correctPhoneNumber = phoneNumber
        .replace(leftParenthesisRegex, '')
        .replace(lightParenthesisRegex, '')
        .replace(whiteSpaceRegex, '')

      await Linking.openURL(`tel:${correctPhoneNumber}`)
      return
    }

    throw new Error()
  }, [])

  return onPhoneCall
}
