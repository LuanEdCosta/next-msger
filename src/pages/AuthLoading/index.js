import { useEffect, useCallback } from 'react'
import { firebase } from '@react-native-firebase/auth'

import {
  DRAWER_ROUTES as DWR,
  APP_SWITCH_ROUTES as APR,
} from '@/config/navigation/ScreenRoutes'

const AuthLoading = ({ navigation }) => {
  const onCheckIfUserIsLogged = useCallback(() => {
    const { currentUser } = firebase.auth()
    navigation.navigate(currentUser ? DWR.HOME : APR.LOGIN)
  }, [navigation])

  useEffect(onCheckIfUserIsLogged, [])

  return null
}

export default AuthLoading
