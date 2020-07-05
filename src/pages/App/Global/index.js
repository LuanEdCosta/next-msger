import crashlytics from '@react-native-firebase/crashlytics'

import { useEffectWhenMount } from '@/hooks'

import useUserSubscription from './useUserSubscription'

const Global = () => {
  useUserSubscription()

  useEffectWhenMount(() => {
    crashlytics().log('-- App Mounted --')
  })

  return null
}

export default Global
