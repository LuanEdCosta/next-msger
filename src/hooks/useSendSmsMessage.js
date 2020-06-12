import { useCallback } from 'react'
import { Linking, Platform } from 'react-native'

export default () => {
  const onSendSMSMessage = useCallback(async (phoneNumber, message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?'
    const url = `sms:${phoneNumber}${separator}body=${message}`
    await Linking.openURL(url)
  }, [])

  return onSendSMSMessage
}
