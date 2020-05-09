import { useEffect, useCallback } from 'react'
import {
  DRAWER_ROUTES as DWR,
  APP_SWITCH_ROUTES as APR,
} from '@/config/navigation/ScreenRoutes'
import { firebase } from '@react-native-firebase/auth'

const AuthLoading = ({ navigation }) => {
  const onCheckIfUserIsLogged = useCallback(() => {
    const { currentUser } = firebase.auth()
    navigation.navigate(currentUser ? DWR.HOME : APR.LOGIN)
  }, [navigation])

  useEffect(onCheckIfUserIsLogged, [])

  return null
}

export default AuthLoading
