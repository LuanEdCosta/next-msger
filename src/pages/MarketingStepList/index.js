import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import Header from '@/components/Header'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import MessagePanel from '@/components/MessagePanel'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { MAIN_ROUTES, DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import Fab from '@/components/Fab'
import SearchBar from '@/components/SearchBar'
import { useArraySearch } from '@/hooks'
import {
  Container,
  MarketingStepItem,
  MarketingStepItemText,
  Styles,
} from './styles'

const MarketingStepList = ({ navigation }) => {
  const { t } = useTranslation('MarketingStepList')
  const [marketingStepsList, setMarketingStepsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: marketingStepsList,
    keysToFilter: [
      MARKETING_STEP_DOC.NAME,
      MARKETING_STEP_DOC.NUMBER_OF_DAYS,
      MARKETING_STEP_DOC.OBSERVATIONS,
    ],
  })

  const onSubscribeToCustomersCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.MARKETING_STEPS)
      .orderBy(MARKETING_STEP_DOC.NUMBER_OF_DAYS)
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
  }, [isLoading])

  useEffect(onSubscribeToCustomersCollection, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [MARKETING_STEP_DOC.ID]: id,
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: numOfDays,
        [MARKETING_STEP_DOC.OBSERVATIONS]: observations,
      } = item

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
            text={t('numOfDays', { count: Number(numOfDays) })}
          >
            <Fw5Icon name="calendar-day" solid />
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
        contentContainerStyle={Styles.list}
        ListHeaderComponentStyle={Styles.listHeader}
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            text={t('anyMarketingStepFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="list-ol" />}
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

export default MarketingStepList
