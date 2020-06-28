import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { DASHBOARD_ROUTES as DSR } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'
import Header from '@/components/Header'

import { Styles, DashboardTabs } from './styles'

const DashboardTabBar = (props) => {
  const { t } = useTranslation('Dashboard')

  const propsClone = { ...props }

  delete propsClone.getLabelText
  delete propsClone.renderIcon

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

      return focused ? (
        <Fw5IconAccent name={iconName} />
      ) : (
        <Fw5Icon name={iconName} />
      )
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

  return (
    <View style={Styles.container}>
      <Header
        i18Namespace="Dashboard"
        i18Title="pageTitle"
        i18Subtitle="pageSubtitle"
        hasShadow={false}
      />

      <DashboardTabs
        labels={labels}
        renderIcon={onRenderIcon}
        scrollEnabled={false}
        {...propsClone}
      />
    </View>
  )
}

export default DashboardTabBar
