import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { useArraySearch, useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, SERVICE_TYPE_DOC } from '@/config/database'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Fab from '@/components/Fab'
import { firebaseTimestampToMoment } from '@/utils'

import {
  Container,
  ServiceTypeItem,
  ServiceTypeItemText,
  ServiceTypeItemWrapper,
  DeleteButton,
  Search,
  EmptyMessage,
} from './styles'

const ServiceTypeList = ({ navigation }) => {
  const { t } = useTranslation('ServiceTypeList')
  const { companyId } = useUserData()
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
    keysToFilter: [SERVICE_TYPE_DOC.NAME],
  })

  const onSubscribeToCustomersCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
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
  }, [companyId, isLoading])

  useEffect(onSubscribeToCustomersCollection, [])

  const onDeleteServiceType = useCallback(
    async (id) => {
      try {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.SERVICE_TYPES)
          .doc(id)
          .delete()
      } catch (e) {
        showAlert()
      }
    },
    [companyId, showAlert],
  )

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [SERVICE_TYPE_DOC.ID]: id,
        [SERVICE_TYPE_DOC.NAME]: name,
        [SERVICE_TYPE_DOC.DESCRIPTION]: description,
        [SERVICE_TYPE_DOC.CREATED_AT]: createdAt,
      } = item

      const creationDate = t('createdAt', {
        date: firebaseTimestampToMoment(createdAt),
      })

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

            {!!description && (
              <ServiceTypeItemText text={description}>
                <Fw5Icon name="file-alt" solid />
              </ServiceTypeItemText>
            )}
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
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyMessage
            text={t('anyServiceTypeFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="file-alt" />}
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

export default ServiceTypeList
