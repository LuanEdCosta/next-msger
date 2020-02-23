import React, { useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import useDispatchCallback from '@/hooks/useDispatchCallback'
import { USER_SESSION_KEY } from '@/config/storage'
import { setSessionData } from '@/store/actions'
import Splash from '@/components/Splash'
import {
  DRAWER_ROUTES,
  APP_SWITCH_ROUTES,
} from '@/config/navigation/ScreenRoutes'

const AuthLoading = ({ navigation }) => {
  const setSession = useDispatchCallback(setSessionData)

  const onCheckIfUserIsLogged = useCallback(() => {
    const onCheck = async () => {
      try {
        const sessionData = await AsyncStorage.getItem(USER_SESSION_KEY)

        if (sessionData) {
          setSession(JSON.parse(sessionData))
          navigation.navigate(DRAWER_ROUTES.HOME)
        } else {
          navigation.navigate(APP_SWITCH_ROUTES.LOGIN)
        }
      } catch (e) {
        navigation.navigate(APP_SWITCH_ROUTES.LOGIN)
      }
    }

    onCheck()
  }, [navigation, setSession])

  useEffect(onCheckIfUserIsLogged, [])

  return <Splash />
}

export default AuthLoading
