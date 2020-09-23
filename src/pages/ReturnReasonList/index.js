import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { useArraySearch } from '@/hooks'
import Header from '@/components/Header'
import Fab from '@/components/Fab'
import { RETURN_REASON_DOC } from '@/config/database'

import useSubscribeToReturnReason from './useSubscribeToReturnReason'
import {
  Container,
  ReturnReasonItem,
  ReturnReasonItemText,
  Search,
  EmptyMessage,
  ItemWrapper,
  DeleteButton,
} from './styles'
import useDeleteReturnReason from './useDeleteReturnReason'

const ReturnReasonList = ({ navigation }) => {
  const { t } = useTranslation('ReturnReasonList')
  const [returnReasonList, setReturnReason] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onDeleteReturnReason = useDeleteReturnReason()

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: returnReasonList,
    keysToFilter: [RETURN_REASON_DOC.NAME],
  })

  const onConfirmToDelete = useCallback(
    (id) => {
      Alert.alert(
        t('deleteTitle'),
        t('deleteMessage'),
        [
          { text: t('Glossary:cancel') },
          {
            text: t('Glossary:delete'),
            onPress: () => onDeleteReturnReason(id),
          },
        ],
        { cancelable: true },
      )
    },
    [t, onDeleteReturnReason],
  )

  const onSubscribeToReturnReason = useSubscribeToReturnReason(
    setIsLoading,
    setReturnReason,
  )

  useEffect(onSubscribeToReturnReason, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [RETURN_REASON_DOC.ID]: id,
        [RETURN_REASON_DOC.NAME]: name,
        [RETURN_REASON_DOC.CREATED_AT]: createdAt,
      } = item

      const formattedDate = createdAt
        ? t('createdAt', { date: createdAt.toDate() })
        : ''

      const onDeletePressed = () => onConfirmToDelete(id)

      return (
        <ItemWrapper>
          <ReturnReasonItem>
            <ReturnReasonItemText text={name} isTitle>
              <Fw5Icon name="signature" solid />
            </ReturnReasonItemText>

            {!!formattedDate && (
              <ReturnReasonItemText text={formattedDate}>
                <Fw5Icon name="calendar-alt" solid />
              </ReturnReasonItemText>
            )}
          </ReturnReasonItem>

          <DeleteButton onPress={onDeletePressed}>
            <Fw5Icon name="trash" solid />
          </DeleteButton>
        </ItemWrapper>
      )
    },
    [onConfirmToDelete, t],
  )

  const keyExtractor = useCallback(({ [RETURN_REASON_DOC.ID]: id }) => id, [])

  const onNavigateToReturnReasonRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.RETURN_REASON_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="returnReasonList" />

      <Fab
        iconComponent={<FabIcon name="plus" />}
        onPress={onNavigateToReturnReasonRegistration}
      />

      <FlatList
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyMessage
            text={t('anyReturnReasonFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="reply" />}
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

export default ReturnReasonList
