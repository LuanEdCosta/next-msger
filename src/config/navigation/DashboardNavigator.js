import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import {
  // AverageCustomerRatingTab,
  DashboardTabBar,
  // NumberOfReturnsTab,
  NumberOfServicesTab,
  OverviewTab,
  withDashboardContext,
} from '@/pages/Dashboard'

import { DASHBOARD_ROUTES as DSR } from './ScreenRoutes'

const DashboardNavigator = createMaterialTopTabNavigator(
  {
    [DSR.DASHBOARD_OVERVIEW_TAB]: OverviewTab,
    [DSR.NUM_OF_SERVICES_TAB]: NumberOfServicesTab,
    // [DSR.AVERAGE_CUSTOMER_RATING_TAB]: AverageCustomerRatingTab,
    // [DSR.NUM_OF_RETURNS_TAB]: NumberOfReturnsTab,
  },
  {
    lazy: true,
    backBehavior: 'history',
    tabBarComponent: DashboardTabBar,
  },
)

export default withDashboardContext(DashboardNavigator)
