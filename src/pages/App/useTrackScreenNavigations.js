import { useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

const onGetActiveRouteName = (navigationState) => {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]

  // Dive into nested navigators
  if (route.routes) return onGetActiveRouteName(route)
  return route.routeName
}

export default () => {
  const onTrackScreenNavigations = useCallback((prevState, currentState) => {
    const currentRouteName = onGetActiveRouteName(currentState)
    const previousRouteName = onGetActiveRouteName(prevState)
    if (previousRouteName !== currentRouteName) {
      analytics().setCurrentScreen(currentRouteName, currentRouteName)
    }
  }, [])

  return onTrackScreenNavigations
}
