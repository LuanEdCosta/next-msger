import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'
import { useSelector } from 'react-redux'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { firebaseTimestampToMoment } from '@/utils'
import TouchableIcon from '@/components/TouchableIcon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { DefaultRefreshControl } from '@/components/RefreshControl'
import { Fw5Icon, Fw5IconAccent, MessagePanelIcon } from '@/components/Fw5Icon'
import {
  BIRTH_DAY_SENT_MESSAGES as BDSM,
  COMPANY_DOC,
  CUSTOMER_DOC,
} from '@/config/database'

import useFetchBirthdayList from './useFetchBirthdayList'
import BirthdayActions from './BirthdayActions'
import Filters from './Filters'
import {
  Container,
  EmptyMessage,
  BirthdayItem,
  BirthdayItemText,
  FooterSpinner,
  BadgeContainer,
  ItemBadge,
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

  const [birthDay, setBirthDay] = useState(moment())

  const birthdayMessages = useSelector(({ Company }) => {
    if (!Company) return {}
    const messages = Company[COMPANY_DOC.BIRTHDAY_MESSAGES_CONFIG]
    return messages || {}
  })

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
      setPageNumber(newPageNumber)
      setIsScrolling(false)
      await handleFetchCustomers(birthDay, numberOfCustomers, true)
    }
  }, [birthDay, handleFetchCustomers, isScrolling, pageNumber])

  const handleSearch = useCallback(async () => {
    setPageNumber(1)
    setIsScrolling(false)
    await handleFetchCustomers(birthDay, CUSTOMERS_PER_PAGE, false)
  }, [birthDay, handleFetchCustomers])

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true)
  }, [])

  const handleActionExecuted = useCallback(
    (customerId, currentYear, channelType) => {
      const customerIndex = birthdayList.findIndex((customer) => {
        return customer[CUSTOMER_DOC.ID] === customerId
      })

      if (customerIndex !== -1) {
        const customerFound = birthdayList[customerIndex]
        const customerClone = { ...customerFound }

        const {
          [CUSTOMER_DOC.BIRTH_DAY_SENT_MESSAGES]: sentMessages = {},
        } = customerClone

        const currentYearSentMessages = { ...(sentMessages[currentYear] || {}) }
        currentYearSentMessages[channelType] = true

        sentMessages[currentYear] = currentYearSentMessages
        customerClone[CUSTOMER_DOC.BIRTH_DAY_SENT_MESSAGES] = sentMessages

        const birthdayListClone = [...birthdayList]
        birthdayListClone[customerIndex] = customerClone
        setBirthdayList(birthdayListClone)
      }
    },
    [birthdayList],
  )

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="birthdayList" />

      <BirthdayActions
        isShowing={!!selectedCustomer}
        handleClose={handleCloseActionsBottomSheet}
        selectedCustomer={selectedCustomer}
        birthdayMessages={birthdayMessages}
        onActionExecuted={handleActionExecuted}
      />

      <FlatList
        data={birthdayList}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={CUSTOMERS_PER_PAGE}
        initialNumToRender={CUSTOMERS_PER_PAGE}
        onEndReached={handleFetchMoreCustomers}
        onMomentumScrollBegin={handleScrollBegin}
        refreshControl={
          <DefaultRefreshControl
            refreshing={isLoading}
            onRefresh={handleSearch}
          />
        }
        renderItem={({ item }) => {
          const {
            [CUSTOMER_DOC.ID]: id,
            [CUSTOMER_DOC.NAME]: name,
            [CUSTOMER_DOC.EMAIL]: email,
            [CUSTOMER_DOC.PHONE]: phone,
            [CUSTOMER_DOC.WHATSAPP]: whatsAppNumber,
            [CUSTOMER_DOC.BIRTH_DATE]: birthDate,
            [CUSTOMER_DOC.BIRTH_DAY_SENT_MESSAGES]: sentMessages,
          } = item

          const currentYear = moment().format('YYYY')

          const {
            [BDSM.EMAIL]: emailSent = false,
            [BDSM.CALL]: phoneCalled = false,
            [BDSM.SMS]: smsSent = false,
            [BDSM.WHATSAPP]: whatsAppSent = false,
          } = sentMessages ? sentMessages[currentYear] || {} : {}

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
              <BadgeContainer>
                {!!emailSent && <ItemBadge text={t('emailSent')} />}
                {!!phoneCalled && <ItemBadge text={t('phoneCalled')} />}
                {!!smsSent && <ItemBadge text={t('smsSent')} />}
                {!!whatsAppSent && <ItemBadge text={t('whatsAppSent')} />}
              </BadgeContainer>

              <BirthdayItemText text={name} isTitle>
                <Fw5Icon name="user" solid />
              </BirthdayItemText>

              <BirthdayItemText text={email}>
                <Fw5Icon name="envelope" solid />
              </BirthdayItemText>

              <BirthdayItemText text={whatsAppNumber}>
                <Fw5Icon name="whatsapp" solid />
              </BirthdayItemText>

              {!!phone && (
                <BirthdayItemText text={phone}>
                  <Fw5Icon name="phone" solid />
                </BirthdayItemText>
              )}

              {!!birthDate && (
                <BirthdayItemText
                  text={t('birthDate', {
                    date: firebaseTimestampToMoment(birthDate),
                    interpolation: {
                      escapeValue: false,
                    },
                  })}
                >
                  <Fw5Icon name="baby" solid />
                </BirthdayItemText>
              )}
            </BirthdayItem>
          )
        }}
        keyExtractor={(item) => {
          return item[CUSTOMER_DOC.ID]
        }}
        ListEmptyComponent={
          <EmptyMessage
            text={t('nothingFound')}
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
        ListFooterComponent={isRefreshing ? <FooterSpinner /> : null}
      />
    </Container>
  )
}

export default BirthdayList
