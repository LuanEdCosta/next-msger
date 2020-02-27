import React, { useEffect, useCallback } from 'react'
import Splash from '@/components/Splash'
import {
  DRAWER_ROUTES,
  APP_SWITCH_ROUTES,
} from '@/config/navigation/ScreenRoutes'
import { firebase } from '@react-native-firebase/auth'

// TODO: This is temporary. You must watch for the auth state changes
const AuthLoading = ({ navigation }) => {
  const onCheckIfUserIsLogged = useCallback(() => {
    const { currentUser } = firebase.auth()

    navigation.navigate(
      currentUser ? DRAWER_ROUTES.HOME : APP_SWITCH_ROUTES.LOGIN,
    )
  }, [navigation])

  useEffect(onCheckIfUserIsLogged, [])

  return <Splash />
}

export default AuthLoading
