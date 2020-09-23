import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { CUSTOMER_DOC, SERVICE_DOC, SERVICE_TYPE_DOC } from '@/config/database'
import { MAIN_ROUTES, DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { useArraySearch } from '@/hooks'
import Header from '@/components/Header'
import Fab from '@/components/Fab'
import { firebaseTimestampToMoment } from '@/utils'

import useSubscribeToServicesCollection from './useSubscribeToServicesCollection'
import {
  Container,
  ServiceItem,
  ServiceItemText,
  Search,
  EmptyMessage,
} from './styles'

const ServiceList = ({ navigation }) => {
  const { t } = useTranslation('ServiceList')
  const [serviceList, setServiceList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: serviceList,
    keysToFilter: [SERVICE_DOC.CUSTOMER, SERVICE_DOC.SERVICE_TYPE],
    formatTexts: {
      [SERVICE_DOC.CUSTOMER]: (customer) => {
        if (customer) return customer[CUSTOMER_DOC.NAME]
        return ''
      },
      [SERVICE_DOC.SERVICE_TYPE]: (serviceType) => {
        if (serviceType) return serviceType[SERVICE_TYPE_DOC.NAME]
        return ''
      },
    },
  })

  const onSubscribeToServicesCollection = useSubscribeToServicesCollection(
    setIsLoading,
    setServiceList,
  )

  useEffect(onSubscribeToServicesCollection, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [SERVICE_DOC.ID]: id,
        [SERVICE_DOC.END_DATE]: endDate,
        [SERVICE_DOC.START_DATE]: startDate,
        [SERVICE_DOC.CUSTOMER]: customer,
        [SERVICE_DOC.SERVICE_TYPE]: serviceType,
      } = item

      const onPress = () => {
        navigation.navigate(MAIN_ROUTES.SERVICE_DETAILS, {
          [SERVICE_DOC.ID]: id,
        })
      }

      const startDateText = t('startDate', {
        date: firebaseTimestampToMoment(startDate),
      })

      const endDateText = t('endDate', {
        date: firebaseTimestampToMoment(endDate),
      })

      return (
        <ServiceItem
          onPress={onPress}
          iconComponent={<Fw5Icon name="chevron-right" />}
        >
          <ServiceItemText text={customer[CUSTOMER_DOC.NAME]} isTitle>
            <Fw5Icon name="user-circle" solid />
          </ServiceItemText>

          <ServiceItemText text={serviceType[SERVICE_TYPE_DOC.NAME]}>
            <Fw5Icon name="file-alt" solid />
          </ServiceItemText>

          <ServiceItemText text={startDateText}>
            <Fw5Icon name="calendar-day" solid />
          </ServiceItemText>

          <ServiceItemText text={endDateText}>
            <Fw5Icon name="calendar-week" solid />
          </ServiceItemText>
        </ServiceItem>
      )
    },
    [navigation, t],
  )

  const keyExtractor = useCallback(({ [SERVICE_DOC.ID]: id }) => id, [])

  const onNavigateToServiceRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.SERVICE_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="serviceList" />

      <Fab
        iconComponent={<FabIcon name="plus" />}
        onPress={onNavigateToServiceRegistration}
      />

      <FlatList
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyMessage
            text={t('anyServiceFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="clipboard-list" />}
          />
        }
        ListHeaderComponent={
          <>
            <BannerAd
              unitId={ADMOB_BANNER_ID}
              size={BannerAdSize.SMART_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />

            <Search
              placeholder={t('searchPlaceholder')}
              setSearchText={onChangeSearchText}
              searchText={searchText}
              isSearching={isSearching}
              hasFilters={false}
            />
          </>
        }
      />
    </Container>
  )
}

export default ServiceList
