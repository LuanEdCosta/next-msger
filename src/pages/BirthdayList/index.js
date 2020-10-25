import React, { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { COMPANY_DOC, CUSTOMER_DOC } from '@/config/database'
import TouchableIcon from '@/components/TouchableIcon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Fw5Icon, Fw5IconAccent, MessagePanelIcon } from '@/components/Fw5Icon'
import { DefaultRefreshControl } from '@/components/RefreshControl'

import useSubscribeToCompany from './useSubscribeToCompany'
import useFetchBirthdayList from './useFetchBirthdayList'
import BirthdayActions from './BirthdayActions'
import Filters from './Filters'
import {
  Container,
  EmptyMessage,
  BirthdayItem,
  BirthdayItemText,
} from './styles'

const CUSTOMERS_PER_PAGE = 10

const BirthdayList = ({ navigation }) => {
  const { t } = useTranslation('BirthdayList')

  const [isLoading, setIsLoading] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [birthdayList, setBirthdayList] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [companyData, setCompanyData] = useState({})

  const [birthDay, setBirthDay] = useState(moment())

  const birthdayMessages = useMemo(() => {
    if (companyData) {
      const messages = companyData[COMPANY_DOC.BIRTHDAY_MESSAGES_CONFIG]
      return messages || {}
    }
    return {}
  }, [companyData])

  const handleCloseActionsBottomSheet = useCallback(() => {
    setSelectedCustomer(null)
  }, [])

  const handleFetchCustomers = useFetchBirthdayList(
    setBirthdayList,
    setIsLoading,
    setIsRefreshing,
  )

  const handleFetchMoreCustomers = useCallback(async () => {
    if (isScrolling) {
      const newPageNumber = pageNumber + 1
      const numberOfCustomers = newPageNumber * CUSTOMERS_PER_PAGE
      await handleFetchCustomers(birthDay, numberOfCustomers, true)
      setPageNumber(newPageNumber)
      setIsScrolling(false)
    }
  }, [birthDay, handleFetchCustomers, isScrolling, pageNumber])

  const handleSearch = useCallback(async () => {
    await handleFetchCustomers(birthDay, CUSTOMERS_PER_PAGE, false)
    setIsScrolling(false)
    setPageNumber(1)
  }, [birthDay, handleFetchCustomers])

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true)
  }, [])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  useSubscribeToCompany(setCompanyData)

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="birthdayList" />

      <BirthdayActions
        isShowing={!!selectedCustomer}
        handleClose={handleCloseActionsBottomSheet}
        selectedCustomer={selectedCustomer}
        birthdayMessages={birthdayMessages}
      />

      <FlatList
        data={birthdayList}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={CUSTOMERS_PER_PAGE}
        onEndReached={handleFetchMoreCustomers}
        onMomentumScrollBegin={handleScrollBegin}
        refreshControl={
          <DefaultRefreshControl
            refreshing={isRefreshing}
            onRefresh={handleSearch}
          />
        }
        renderItem={({ item }) => {
          const {
            [CUSTOMER_DOC.ID]: id,
            [CUSTOMER_DOC.NAME]: name,
            [CUSTOMER_DOC.EMAIL]: email,
            [CUSTOMER_DOC.PHONE]: phone,
          } = item

          const onItemPress = () => {
            navigation.navigate(MAIN_ROUTES.CUSTOMER_DETAILS, {
              [CUSTOMER_DOC.ID]: id,
            })
          }

          const onActionsPress = () => {
            setSelectedCustomer(item)
          }

          return (
            <BirthdayItem
              onPress={onItemPress}
              iconComponent={
                <TouchableIcon onPress={onActionsPress} size={48}>
                  <Fw5IconAccent name="ellipsis-v" size={20} />
                </TouchableIcon>
              }
            >
              <BirthdayItemText text={name} isTitle>
                <Fw5Icon name="user" solid />
              </BirthdayItemText>

              <BirthdayItemText text={email}>
                <Fw5Icon name="envelope" solid />
              </BirthdayItemText>

              <BirthdayItemText text={phone}>
                <Fw5Icon name="phone" solid />
              </BirthdayItemText>
            </BirthdayItem>
          )
        }}
        keyExtractor={(item) => {
          return item[CUSTOMER_DOC.ID]
        }}
        ListEmptyComponent={
          <EmptyMessage
            text={t('nothingFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="birthday-cake" />}
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

            <Filters birthDay={birthDay} setBirthDay={setBirthDay} />
          </>
        }
      />
    </Container>
  )
}

export default BirthdayList
