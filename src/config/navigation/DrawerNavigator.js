import { createDrawerNavigator } from 'react-navigation-drawer'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import CustomerRegistration from '@/pages/CustomerRegistration'
import MarketingStepRegistration from '@/pages/MarketingStepRegistration'
import ServiceRegistration from '@/pages/ServiceRegistration'
import CustomerList from '@/pages/CustomerList'
import ServiceList from '@/pages/ServiceList'
import ServiceTypeList from '@/pages/ServiceTypeList'
import Drawer from '@/components/Drawer'
import { DRAWER_ROUTES as DR } from './ScreenRoutes'

const DrawerNavigator = createDrawerNavigator(
  {
    [DR.HOME]: Home,
    [DR.DASHBOARD]: Dashboard,
    [DR.CUSTOMER_REGISTRATION]: CustomerRegistration,
    [DR.MARKETING_STEP_REGISTRATION]: MarketingStepRegistration,
    [DR.SERVICE_REGISTRATION]: ServiceRegistration,
    [DR.CUSTOMERS_LIST]: CustomerList,
    [DR.SERVICES_LIST]: ServiceList,
    [DR.SERVICE_TYPES_LIST]: ServiceTypeList,
  },
  {
    headerMode: 'screen',
    drawerType: 'slide',
    drawerWidth: 300,
    initialRouteName: DR.HOME,
    unmountInactiveRoutes: true,
    contentComponent: Drawer,
  },
)

export default DrawerNavigator
