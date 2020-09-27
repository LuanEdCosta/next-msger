import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { SERVICE_DETAILS_ROUTES as SDR } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'
import { ADMOB_BANNER_ID } from '@/config/ads'
import TabBar from '@/components/TabBar'

import ServiceDetailsHeader from '../ServiceDetailsHeader'

const ServiceDetailsTabBar = (props) => {
  const { t } = useTranslation('ServiceDetails')

  const propsClone = { ...props }
  delete propsClone.getLabelText
  delete propsClone.renderIcon

  const icons = useMemo(
    () => ({
      [SDR.OVERVIEW_TAB]: 'file-invoice',
      [SDR.SEND_MESSAGES_TAB]: 'paper-plane',
      [SDR.CUSTOMER_RATING_TAB]: 'star',
      [SDR.CUSTOMER_RETURN_TAB]: 'reply',
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
      [SDR.OVERVIEW_TAB]: t('overviewTabLabel'),
      [SDR.SEND_MESSAGES_TAB]: t('sendMessagesTabLabel'),
      [SDR.CUSTOMER_RATING_TAB]: t('customerRatingTabLabel'),
      [SDR.CUSTOMER_RETURN_TAB]: t('customerReturnTabLabel'),
    }),
    [t],
  )

  return (
    <>
      <ServiceDetailsHeader />

      <TabBar
        style={{
          elevation: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        }}
        labels={labels}
        renderIcon={onRenderIcon}
        scrollEnabled
        {...propsClone}
      />

      <BannerAd
        unitId={ADMOB_BANNER_ID}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  )
}

export default ServiceDetailsTabBar
