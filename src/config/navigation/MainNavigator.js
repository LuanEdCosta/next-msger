import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import CustomerDetails from '@/pages/CustomerDetails'
import ServiceDetails from '@/pages/ServiceDetails'
import DrawerNavigator from './DrawerNavigator'
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
    [MAIN_ROUTES.SERVICE_DETAILS]: ServiceDetails,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
)

export default MainNavigator
