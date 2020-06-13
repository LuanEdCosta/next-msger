import { useCallback } from 'react'
import { Linking } from 'react-native'

import { getOnlyPhoneNumbers } from '@/helpers'

export default () => {
  const onPhoneCall = useCallback(async (phoneNumber = '') => {
    const formattedPhoneNumber = getOnlyPhoneNumbers(phoneNumber)
    await Linking.openURL(`tel:${formattedPhoneNumber}`)
  }, [])

  return onPhoneCall
}
