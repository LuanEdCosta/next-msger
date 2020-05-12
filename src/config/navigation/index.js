import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthLoading from '@/pages/AuthLoading'
import Login from '@/pages/Login'

import MainNavigator from './MainNavigator'
import { APP_SWITCH_ROUTES, NAVIGATOR_ROUTES } from './ScreenRoutes'

const SwitchNavigator = createSwitchNavigator({
  [APP_SWITCH_ROUTES.AUTH_LOADING]: AuthLoading,
  [APP_SWITCH_ROUTES.LOGIN]: Login,
  [NAVIGATOR_ROUTES.MAIN_NAVIGATOR]: MainNavigator,
})

export default createAppContainer(SwitchNavigator)
