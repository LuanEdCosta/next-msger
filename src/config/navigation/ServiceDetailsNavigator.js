import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import OverviewTab from '@/pages/ServiceDetails/OverviewTab'
import SendMessagesTab from '@/pages/ServiceDetails/SendMessagesTab'
import CustomerRatingTab from '@/pages/ServiceDetails/CustomerRatingTab'
import CustomerReturnTab from '@/pages/ServiceDetails/CustomerReturnTab'
import ServiceDetailsTabBar from '@/pages/ServiceDetails/ServiceDetailsTabBar'
import withServiceSubscription from '@/pages/ServiceDetails/withServiceSubscription'

import { SERVICE_DETAILS_ROUTES as SDR } from './ScreenRoutes'

const ServiceDetailsNavigator = createMaterialTopTabNavigator(
  {
    [SDR.OVERVIEW_TAB]: OverviewTab,
    [SDR.SEND_MESSAGES_TAB]: SendMessagesTab,
    [SDR.CUSTOMER_RATING_TAB]: CustomerRatingTab,
    [SDR.CUSTOMER_RETURN_TAB]: CustomerReturnTab,
  },
  {
    lazy: true,
    backBehavior: 'history',
    tabBarComponent: ServiceDetailsTabBar,
  },
)

export default withServiceSubscription(ServiceDetailsNavigator)
