import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { MAIN_ROUTES, DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { useArraySearch, useUserData } from '@/hooks'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Fab from '@/components/Fab'
import { getTimePartsFromMilliseconds } from '@/utils/MillisecondsUtils'

import {
  Container,
  MarketingStepItem,
  MarketingStepItemText,
  Search,
  EmptyMessage,
} from './styles'

const MarketingStepList = ({ navigation }) => {
  const { t } = useTranslation(['MarketingStepList', 'TimeBuilder'])
  const { companyId } = useUserData()

  const [isLoading, setIsLoading] = useState(true)
  const [marketingStepsList, setMarketingStepsList] = useState([])

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: marketingStepsList,
    keysToFilter: [MARKETING_STEP_DOC.NAME, MARKETING_STEP_DOC.OBSERVATIONS],
  })

  const onSubscribeToMarketingStepCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.MARKETING_STEPS)
      .orderBy(MARKETING_STEP_DOC.MILLISECONDS)
      .onSnapshot((querySnapshot) => {
        const marketingSteps = querySnapshot.docs.map((doc) => {
          const marketingStep = doc.data()
          marketingStep[MARKETING_STEP_DOC.ID] = doc.id
          return marketingStep
        })

        if (isLoading) setIsLoading(false)
        setMarketingStepsList(marketingSteps)
      })

    return unsubscribe
  }, [companyId, isLoading])

  useEffect(onSubscribeToMarketingStepCollection, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [MARKETING_STEP_DOC.ID]: id,
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.MILLISECONDS]: milliseconds,
        [MARKETING_STEP_DOC.OBSERVATIONS]: observations,
      } = item

      const timeParts = getTimePartsFromMilliseconds(milliseconds)

      const onPress = () => {
        navigation.navigate(MAIN_ROUTES.MARKETING_STEP_DETAILS, {
          [MARKETING_STEP_DOC.ID]: id,
          [MARKETING_STEP_DOC.NAME]: name,
        })
      }

      return (
        <MarketingStepItem
          onPress={onPress}
          iconComponent={<Fw5Icon name="chevron-right" />}
        >
          <MarketingStepItemText text={name} isTitle>
            <Fw5Icon name="file-alt" solid />
          </MarketingStepItemText>

          <MarketingStepItemText
            text={
              milliseconds
                ? t('TimeBuilder:timeText', timeParts)
                : t('Glossary:always')
            }
          >
            <Fw5Icon name="clock" solid />
          </MarketingStepItemText>

          {!!observations && (
            <MarketingStepItemText text={observations} numberOfLines={1}>
              <Fw5Icon name="comment" solid />
            </MarketingStepItemText>
          )}
        </MarketingStepItem>
      )
    },
    [navigation, t],
  )

  const keyExtractor = useCallback(({ [MARKETING_STEP_DOC.ID]: id }) => id, [])

  const onNavigateToMarketingStepRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.MARKETING_STEP_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="marketingStepList" />

      <Fab
        iconComponent={<FabIcon name="plus" />}
        onPress={onNavigateToMarketingStepRegistration}
      />

      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyMessage
            text={t('anyMarketingStepFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="list-ol" />}
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

export default MarketingStepList
