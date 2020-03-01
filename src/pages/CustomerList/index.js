import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import Header from '@/components/Header'
import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'
import MessagePanel from '@/components/MessagePanel'
import { Fw5Icon, MessagePanelIcon } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Container, CustomerItem, CustomerItemText, Styles } from './styles'

const CustomerList = ({ navigation }) => {
  const { t } = useTranslation('CustomerList')
  const [customerList, setCustomerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  const keyExtractor = useCallback(({ id }) => id, [])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="customerList" />
      <FlatList
        contentContainerStyle={Styles.list}
        data={customerList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            text={t('anyCustomerFound')}
            isLoading={isLoading}
            iconComponent={<MessagePanelIcon name="users" />}
          />
        }
      />
    </Container>
  )
}

export default CustomerList
