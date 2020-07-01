import React, { useMemo, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import {
  DASHBOARD_ROUTES as DSR,
  MAIN_ROUTES,
} from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, Fw5IconAccent, Fw5IconPrimary } from '@/components/Fw5Icon'
import Header from '@/components/Header'
import TouchableIcon from '@/components/TouchableIcon'
import { DASHBOARD_FILTERS_PARAMS } from '@/config/navigation/RouteParams'

import DashboardContext from '../context'

import { Styles, DashboardTabs } from './styles'

const DashboardTabBar = (props) => {
  const propsClone = { ...props }
  delete propsClone.getLabelText
  delete propsClone.renderIcon

  const { t } = useTranslation('Dashboard')
  const { setFilterDate } = useContext(DashboardContext)

  const icons = useMemo(
    () => ({
      [DSR.DASHBOARD_OVERVIEW_TAB]: 'chart-line',
      [DSR.NUM_OF_SERVICES_TAB]: 'chart-bar',
      [DSR.AVERAGE_CUSTOMER_RATING_TAB]: 'star',
      [DSR.NUM_OF_RETURNS_TAB]: 'reply',
    }),
    [],
  )

  const onRenderIcon = useCallback(
    ({ route, focused }) => {
      const iconName = icons[route.routeName]
      if (focused) return <Fw5IconAccent name={iconName} />
      return <Fw5Icon name={iconName} />
    },
    [icons],
  )

  const labels = useMemo(
    () => ({
      [DSR.DASHBOARD_OVERVIEW_TAB]: t('overviewTabLabel'),
      [DSR.NUM_OF_SERVICES_TAB]: t('numberOfServicesTabLabel'),
      [DSR.AVERAGE_CUSTOMER_RATING_TAB]: t('averageCustomerRatingTabLabel'),
      [DSR.NUM_OF_RETURNS_TAB]: t('numberOfReturnsTabLabel'),
    }),
    [t],
  )

  const onNavigateToDashboardFilters = useCallback(() => {
    propsClone.navigation.navigate(MAIN_ROUTES.DASHBOARD_FILTERS, {
      [DASHBOARD_FILTERS_PARAMS.ON_FILTER]: ({ filterDate }) => {
        setFilterDate(filterDate)
      },
    })
  }, [propsClone.navigation, setFilterDate])

  return (
    <View style={Styles.container}>
      <Header
        i18Namespace="Dashboard"
        i18Title="pageTitle"
        i18Subtitle="pageSubtitle"
        hasShadow={false}
      >
        <TouchableIcon onPress={onNavigateToDashboardFilters}>
          <Fw5IconPrimary name="sliders-h" />
        </TouchableIcon>
      </Header>

      <DashboardTabs
        labels={labels}
        renderIcon={onRenderIcon}
        scrollEnabled={false}
        {...propsClone}
      />
    </View>
  )
}

export default withNavigation(DashboardTabBar)
