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
import DRAWER_PAGES from '@/config/constants/DrawerPages'
import { DRAWER_ROUTES as DR } from './ScreenRoutes'

const DrawerNavigator = createDrawerNavigator(
  {
    [DR.HOME]: {
      screen: Home,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'home',
        [DRAWER_PAGES.DRAWER_ICON]: 'home',
      },
    },
    [DR.DASHBOARD]: {
      screen: Dashboard,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'dashboard',
        [DRAWER_PAGES.DRAWER_ICON]: 'chart-pie',
      },
    },
    [DR.CUSTOMER_REGISTRATION]: {
      screen: CustomerRegistration,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'customerRegistration',
        [DRAWER_PAGES.DRAWER_ICON]: 'user-plus',
      },
    },
    [DR.MARKETING_STEP_REGISTRATION]: {
      screen: MarketingStepRegistration,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'marketingStepRegistration',
        [DRAWER_PAGES.DRAWER_ICON]: 'arrow-circle-right',
      },
    },
    [DR.SERVICE_REGISTRATION]: {
      screen: ServiceRegistration,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'serviceRegistration',
        [DRAWER_PAGES.DRAWER_ICON]: 'file-medical',
      },
    },
    [DR.CUSTOMERS_LIST]: {
      screen: CustomerList,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'customerList',
        [DRAWER_PAGES.DRAWER_ICON]: 'users',
      },
    },
    [DR.SERVICES_LIST]: {
      screen: ServiceList,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'serviceList',
        [DRAWER_PAGES.DRAWER_ICON]: 'file-contract',
      },
    },
    [DR.SERVICE_TYPES_LIST]: {
      screen: ServiceTypeList,
      params: {
        [DRAWER_PAGES.DRAWER_LABEL]: 'serviceTypeList',
        [DRAWER_PAGES.DRAWER_ICON]: 'file-alt',
      },
    },
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
