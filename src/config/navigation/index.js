import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthLoading from '@/pages/AuthLoading'

import MainNavigator from './MainNavigator'
import LoginNavigator from './LoginNavigator'
import { APP_SWITCH_ROUTES, NAVIGATOR_ROUTES } from './ScreenRoutes'

const SwitchNavigator = createSwitchNavigator({
  [APP_SWITCH_ROUTES.AUTH_LOADING]: AuthLoading,
  [NAVIGATOR_ROUTES.LOGIN_NAVIGATOR]: LoginNavigator,
  [NAVIGATOR_ROUTES.MAIN_NAVIGATOR]: MainNavigator,
})

export default createAppContainer(SwitchNavigator)
