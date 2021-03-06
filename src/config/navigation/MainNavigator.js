import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import RateService from '@/pages/RateService'
import CustomerDetails from '@/pages/CustomerDetails'
import MarketingStepDetails from '@/pages/MarketingStepDetails'
import CustomerReturnRegistration from '@/pages/CustomerReturnRegistration'
import ReturnReasonRegistration from '@/pages/ReturnReasonRegistration'
import UserSecurity from '@/pages/UserSecurity'
import UserPersonalData from '@/pages/UserPersonalData'
import ChangePassword from '@/pages/ChangePassword'
import EditUserName from '@/pages/EditUserName'
import EditUserEmail from '@/pages/EditUserEmail'
import DashboardFilters from '@/pages/DashboardFilters'
import EditService from '@/pages/EditService'
import MarketingStepRegistration from '@/pages/MarketingStepRegistration'
import CustomerRegistration from '@/pages/CustomerRegistration'
import CompanyRegistration from '@/pages/CompanyRegistration'

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
    [MAIN_ROUTES.RETURN_REASON_REGISTRATION]: ReturnReasonRegistration,
    [MAIN_ROUTES.USER_SECURITY]: UserSecurity,
    [MAIN_ROUTES.USER_PERSONAL_DATA]: UserPersonalData,
    [MAIN_ROUTES.CHANGE_PASSWORD]: ChangePassword,
    [MAIN_ROUTES.EDIT_USER_NAME]: EditUserName,
    [MAIN_ROUTES.EDIT_USER_EMAIL]: EditUserEmail,
    [MAIN_ROUTES.DASHBOARD_FILTERS]: DashboardFilters,
    [MAIN_ROUTES.EDIT_SERVICE]: EditService,
    [MAIN_ROUTES.EDIT_MARKETING_STEP]: MarketingStepRegistration,
    [MAIN_ROUTES.EDIT_CUSTOMER]: CustomerRegistration,
    [MAIN_ROUTES.EDIT_COMPANY]: CompanyRegistration,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
)

export default MainNavigator
