import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '@/pages/Home'
import { DRAWER_ROUTES } from './ScreenRoutes'

const DrawerNavigator = createDrawerNavigator(
  {
    [DRAWER_ROUTES.HOME]: {
      screen: createStackNavigator({
        [DRAWER_ROUTES.HOME_STACK]: Home,
      }),
    },
  },
  {
    headerMode: 'screen',
    drawerType: 'slide',
    drawerWidth: 300,
    initialRouteName: DRAWER_ROUTES.HOME,
    unmountInactiveRoutes: true,
    // contentComponent: NavigationDrawer,
  },
)

export default DrawerNavigator
