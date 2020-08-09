import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import CompanyRegistration from '@/pages/CompanyRegistration'

import { LOGIN_ROUTES } from './ScreenRoutes'

const LoginNavigator = createStackNavigator(
  {
    [LOGIN_ROUTES.LOGIN]: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    [LOGIN_ROUTES.FORGOT_PASSWORD]: ForgotPassword,
    [LOGIN_ROUTES.COMPANY_REGISTRATION]: CompanyRegistration,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
)

export default LoginNavigator
