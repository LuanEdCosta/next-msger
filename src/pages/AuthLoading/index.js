import { useEffect, useCallback } from 'react'
import { firebase } from '@react-native-firebase/auth'

import {
  DRAWER_ROUTES as DWR,
  NAVIGATOR_ROUTES as NR,
} from '@/config/navigation/ScreenRoutes'

const AuthLoading = ({ navigation }) => {
  const onCheckIfUserIsLogged = useCallback(() => {
    const { currentUser } = firebase.auth()
    navigation.navigate(currentUser ? DWR.HOME : NR.LOGIN_NAVIGATOR)
  }, [navigation])

  useEffect(onCheckIfUserIsLogged, [])

  return null
}

export default AuthLoading
