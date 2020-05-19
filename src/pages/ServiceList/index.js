import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import Header from '@/components/Header'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'
import MessagePanel from '@/components/MessagePanel'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { MAIN_ROUTES, DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import Fab from '@/components/Fab'
import SearchBar from '@/components/SearchBar'
import { useArraySearch } from '@/hooks'

import { Container, ServiceItem, ServiceItemText, Styles } from './styles'

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
    keysToFilter: [SERVICE_DOC.START_DATE, SERVICE_DOC.END_DATE],
    formatTexts: {
      [SERVICE_DOC.START_DATE]: (val) => moment(val).format('LL'),
      [SERVICE_DOC.END_DATE]: (val) => moment(val).format('LL'),
    },
  })

  const onSubscribeToServicesCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.SERVICES)
      .onSnapshot((querySnapshot) => {
        const services = querySnapshot.docs.map((doc) => {
          const service = doc.data()
          service[SERVICE_DOC.ID] = doc.id
          return service
        })

        if (isLoading) setIsLoading(false)
        setServiceList(services)
      })

    return unsubscribe
  }, [isLoading])

  useEffect(onSubscribeToServicesCollection, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [SERVICE_DOC.ID]: id,
        [SERVICE_DOC.CREATED_AT]: createdAt,
        [SERVICE_DOC.END_DATE]: endDate,
        [SERVICE_DOC.START_DATE]: startDate,
        // [SERVICE_DOC.CUSTOMER_ID]: customerId,
        // [SERVICE_DOC.SERVICE_TYPE_ID]: phonserviceTypeId,
      } = item

      const onPress = () => {
        navigation.navigate(MAIN_ROUTES.SERVICE_DETAILS, {
          [SERVICE_DOC.ID]: id,
        })
      }

      return (
        <ServiceItem
          onPress={onPress}
          iconComponent={<Fw5Icon name="chevron-right" />}
        >
          <ServiceItemText text={moment(createdAt).format('LL')} isTitle>
            <Fw5Icon name="calendar" solid />
          </ServiceItemText>

          <ServiceItemText text={moment(startDate).format('LL')}>
            <Fw5Icon name="calendar" solid />
          </ServiceItemText>

          <ServiceItemText text={moment(endDate).format('LL')}>
            <Fw5Icon name="calendar" solid />
          </ServiceItemText>
        </ServiceItem>
      )
    },
    [navigation],
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
        contentContainerStyle={Styles.list}
        ListHeaderComponentStyle={Styles.listHeader}
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            text={t('anyServiceFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="clipboard-list" />}
          />
        }
        ListHeaderComponent={
          <SearchBar
            placeholder={t('searchPlaceholder')}
            setSearchText={onChangeSearchText}
            searchText={searchText}
            isSearching={isSearching}
            hasFilters={false}
          />
        }
      />
    </Container>
  )
}

export default ServiceList
