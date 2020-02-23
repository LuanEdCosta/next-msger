import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import DrawerNavigator from './DrawerNavigator'
import { NAVIGATOR_ROUTES } from './ScreenRoutes'

const MainNavigator = createStackNavigator(
  {
    [NAVIGATOR_ROUTES.DRAWER_NAVIGATOR]: {
      screen: DrawerNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
)

export default MainNavigator
