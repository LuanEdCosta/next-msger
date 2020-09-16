import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { CUSTOMER_DOC, COLLECTIONS } from '@/config/database'
import { Fw5Icon, ButtonIcon } from '@/components/Fw5Icon'
import { useErrorAlert, useUserData } from '@/hooks'
import { WhiteSpinner } from '@/components/Spinner'
import { FONT_SIZES } from '@/styles'
import { ADMOB_BANNER_ID } from '@/config/ads'

import {
  Container,
  DataItem,
  DataItemTitle,
  DataItemValue,
  DeleteButton,
  Scroll,
  Content,
} from './styles'

const CustomerDetails = ({ navigation }) => {
  const customerId = navigation.getParam(CUSTOMER_DOC.ID)
  const { companyId } = useUserData()

  const { t } = useTranslation('CustomerDetails')
  const showAlert = useErrorAlert()

  const [customerData, setCustomerData] = useState({})
  const [isDeleting, setIsDeleting] = useState(false)

  const onSubscribeToCustomerDocument = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.CUSTOMERS)
      .doc(customerId)
      .onSnapshot({
        error() {
          showAlert()
          navigation.goBack()
        },
        next(doc) {
          setCustomerData({
            ...doc.data(),
            [CUSTOMER_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [companyId, customerId, navigation, showAlert])

  useEffect(onSubscribeToCustomerDocument, [])

  const onDeleteCustomer = useCallback(async () => {
    try {
      setIsDeleting(true)

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.CUSTOMERS)
        .doc(customerId)
        .delete()

      navigation.goBack()
    } catch (e) {
      showAlert()
    } finally {
      setIsDeleting(false)
    }
  }, [companyId, customerId, navigation, showAlert])

  return (
    <Container>
      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <DataItem>
            <DataItemTitle text={t('customerName')}>
              <Fw5Icon name="user" solid />
            </DataItemTitle>
            <DataItemValue text={customerData[CUSTOMER_DOC.NAME]} />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('customerEmail')}>
              <Fw5Icon name="envelope" solid />
            </DataItemTitle>
            <DataItemValue text={customerData[CUSTOMER_DOC.EMAIL]} />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('customerWhatsapp')}>
              <Fw5Icon name="whatsapp" solid />
            </DataItemTitle>
            <DataItemValue text={customerData[CUSTOMER_DOC.WHATSAPP]} />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('customerPhone')}>
              <Fw5Icon name="phone" solid />
            </DataItemTitle>
            <DataItemValue text={customerData[CUSTOMER_DOC.PHONE]} />
          </DataItem>

          <DeleteButton
            text={t('deleteButton')}
            backgroundColor="danger"
            onPress={onDeleteCustomer}
            disabled={isDeleting}
            iconComponent={
              isDeleting ? (
                <WhiteSpinner size={FONT_SIZES.FONT_SIZE_4} />
              ) : (
                <ButtonIcon name="trash" />
              )
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

CustomerDetails.navigationOptions = ({ navigation }) => {
  const subtitle = navigation.getParam(CUSTOMER_DOC.NAME)

  return {
    header() {
      return (
        <Header
          i18Namespace="CustomerDetails"
          i18Title="pageTitle"
          subtitle={subtitle}
          isStackPage
        />
      )
    },
  }
}

export default CustomerDetails
