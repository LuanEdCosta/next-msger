import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import Header from '@/components/Header'
import { COLLECTIONS, SERVICE_TYPE_DOC } from '@/config/database'
import MessagePanel from '@/components/MessagePanel'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import Fab from '@/components/Fab'
import SearchBar from '@/components/SearchBar'
import { useArraySearch, useErrorAlert } from '@/hooks'

import {
  Container,
  ServiceTypeItem,
  ServiceTypeItemText,
  ServiceTypeItemWrapper,
  DeleteButton,
  Styles,
} from './styles'

const ServiceTypeList = ({ navigation }) => {
  const { t } = useTranslation('ServiceTypeList')
  const showAlert = useErrorAlert()

  const [serviceTypeList, setServiceTypeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: serviceTypeList,
    keysToFilter: [SERVICE_TYPE_DOC.NAME, SERVICE_TYPE_DOC.CREATED_AT],
    formatTexts: {
      [SERVICE_TYPE_DOC.CREATED_AT]: (timestamp) => {
        return moment(timestamp).format('LL')
      },
    },
  })

  const onSubscribeToCustomersCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.SERVICE_TYPES)
      .onSnapshot((querySnapshot) => {
        const serviceTypes = querySnapshot.docs.map((doc) => {
          const serviceType = doc.data()
          serviceType[SERVICE_TYPE_DOC.ID] = doc.id
          return serviceType
        })

        if (isLoading) setIsLoading(false)
        setServiceTypeList(serviceTypes)
      })

    return unsubscribe
  }, [isLoading])

  useEffect(onSubscribeToCustomersCollection, [])

  const onDeleteServiceType = useCallback(
    async (id) => {
      try {
        await firestore()
          .collection(COLLECTIONS.SERVICE_TYPES)
          .doc(id)
          .delete()
      } catch (e) {
        showAlert()
      }
    },
    [showAlert],
  )

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [SERVICE_TYPE_DOC.ID]: id,
        [SERVICE_TYPE_DOC.NAME]: name,
        [SERVICE_TYPE_DOC.CREATED_AT]: creationTimestamp,
      } = item

      const creationDate = t('createdAt', { date: moment(creationTimestamp) })
      const onDeletePressed = () => onDeleteServiceType(id)

      return (
        <ServiceTypeItemWrapper>
          <ServiceTypeItem>
            <ServiceTypeItemText text={name} isTitle>
              <Fw5Icon name="signature" solid />
            </ServiceTypeItemText>

            <ServiceTypeItemText text={creationDate}>
              <Fw5Icon name="calendar-alt" solid />
            </ServiceTypeItemText>
          </ServiceTypeItem>

          <DeleteButton onPress={onDeletePressed}>
            <Fw5Icon name="trash" />
          </DeleteButton>
        </ServiceTypeItemWrapper>
      )
    },
    [onDeleteServiceType, t],
  )

  const keyExtractor = useCallback(({ [SERVICE_TYPE_DOC.ID]: id }) => id, [])

  const onNavigateToServiceTypeRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.SERVICE_TYPE_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="serviceTypeList" />

      <Fab
        iconComponent={<FabIcon name="plus" />}
        onPress={onNavigateToServiceTypeRegistration}
      />

      <FlatList
        contentContainerStyle={Styles.list}
        ListHeaderComponentStyle={Styles.listHeader}
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            text={t('anyServiceTypeFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="file-alt" />}
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

export default ServiceTypeList
