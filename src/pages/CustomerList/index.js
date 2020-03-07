import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import Header from '@/components/Header'
import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'
import MessagePanel from '@/components/MessagePanel'
import { Fw5Icon, MessagePanelIcon, FabIcon } from '@/components/Fw5Icon'
import { MAIN_ROUTES, DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import Fab from '@/components/Fab'
import SearchBar from '@/components/SearchBar'
import { useArraySearch } from '@/hooks'
import { getOnlyPhoneNumbers } from '@/helpers'
import { Container, CustomerItem, CustomerItemText, Styles } from './styles'

const CustomerList = ({ navigation }) => {
  const { t } = useTranslation('CustomerList')
  const [customerList, setCustomerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    searchText,
    onChangeSearchText,
    itemsToShow,
    isSearching,
  } = useArraySearch({
    list: customerList,
    keysToFilter: [
      CUSTOMER_DOC.NAME,
      CUSTOMER_DOC.EMAIL,
      CUSTOMER_DOC.WHATSAPP,
      CUSTOMER_DOC.PHONE,
    ],
    formatTexts: {
      [CUSTOMER_DOC.PHONE]: getOnlyPhoneNumbers,
      [CUSTOMER_DOC.WHATSAPP]: getOnlyPhoneNumbers,
    },
  })

  const onSubscribeToCustomersCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.CUSTOMERS)
      .onSnapshot((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          const user = doc.data()
          user[CUSTOMER_DOC.ID] = doc.id
          return user
        })

        if (isLoading) setIsLoading(false)
        setCustomerList(users)
      })

    return unsubscribe
  }, [isLoading])

  useEffect(onSubscribeToCustomersCollection, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [CUSTOMER_DOC.ID]: id,
        [CUSTOMER_DOC.NAME]: name,
        [CUSTOMER_DOC.EMAIL]: email,
        [CUSTOMER_DOC.WHATSAPP]: whatsapp,
        [CUSTOMER_DOC.PHONE]: phone,
      } = item

      const onPress = () => {
        navigation.navigate(MAIN_ROUTES.CUSTOMER_DETAILS, {
          [CUSTOMER_DOC.ID]: id,
          [CUSTOMER_DOC.NAME]: name,
        })
      }

      return (
        <CustomerItem
          onPress={onPress}
          iconComponent={<Fw5Icon name="chevron-right" />}
        >
          <CustomerItemText text={name} isTitle>
            <Fw5Icon name="user" solid />
          </CustomerItemText>

          <CustomerItemText text={email}>
            <Fw5Icon name="envelope" solid />
          </CustomerItemText>

          <CustomerItemText text={whatsapp}>
            <Fw5Icon name="mobile" solid />
          </CustomerItemText>

          <CustomerItemText text={phone}>
            <Fw5Icon name="phone" solid />
          </CustomerItemText>
        </CustomerItem>
      )
    },
    [navigation],
  )

  const keyExtractor = useCallback(({ [CUSTOMER_DOC.ID]: id }) => id, [])

  const onNavigateToCustomerRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.CUSTOMER_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="customerList" />

      <Fab
        iconComponent={<FabIcon name="plus" />}
        onPress={onNavigateToCustomerRegistration}
      />

      <FlatList
        contentContainerStyle={Styles.list}
        ListHeaderComponentStyle={Styles.listHeader}
        data={itemsToShow}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            text={t('anyCustomerFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="users" />}
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

export default CustomerList
