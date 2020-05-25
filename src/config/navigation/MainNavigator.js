import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import RateService from '@/pages/RateService'
import CustomerDetails from '@/pages/CustomerDetails'
import MarketingStepDetails from '@/pages/MarketingStepDetails'
import CustomerReturnRegistration from '@/pages/CustomerReturnRegistration'

import DrawerNavigator from './DrawerNavigator'
import ServiceDetailsNavigator from './ServiceDetailsNavigator'
import { NAVIGATOR_ROUTES, MAIN_ROUTES } from './ScreenRoutes'

const MainNavigator = createStackNavigator(
  {
    [NAVIGATOR_ROUTES.DRAWER_NAVIGATOR]: {
      screen: DrawerNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    [MAIN_ROUTES.CUSTOMER_DETAILS]: CustomerDetails,
    [MAIN_ROUTES.MARKETING_STEP_DETAILS]: MarketingStepDetails,
    [MAIN_ROUTES.SERVICE_DETAILS]: ServiceDetailsNavigator,
    [MAIN_ROUTES.RATE_SERVICE]: RateService,
    [MAIN_ROUTES.CUSTOMER_RETURN_REGISTRATION]: CustomerReturnRegistration,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
)

export default MainNavigator
