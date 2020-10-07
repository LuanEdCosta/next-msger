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
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { EDIT_CUSTOMER_PARAMS } from '@/config/navigation/RouteParams'

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

  const { t } = useTranslation(['CustomerDetails', 'Customer'])
  const { companyId } = useUserData()
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

  const onEditCustomer = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_CUSTOMER, {
      [EDIT_CUSTOMER_PARAMS.IS_EDITING]: true,
      [EDIT_CUSTOMER_PARAMS.CUSTOMER_DATA]: customerData,
    })
  }, [customerData, navigation])

  const getValue = useCallback((key) => customerData[key], [customerData])

  return (
    <Container>
      <Header
        i18Namespace="CustomerDetails"
        i18Title="pageTitle"
        subtitle={getValue(CUSTOMER_DOC.NAME)}
        isStackPage
      />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          {!!getValue(CUSTOMER_DOC.NAME) && (
            <DataItem>
              <DataItemTitle text={t('Customer:nameLabel')}>
                <Fw5Icon name="user" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.NAME)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.EMAIL) && (
            <DataItem>
              <DataItemTitle text={t('Customer:emailLabel')}>
                <Fw5Icon name="envelope" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.EMAIL)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.WHATSAPP) && (
            <DataItem>
              <DataItemTitle text={t('Customer:whatsappLabel')}>
                <Fw5Icon name="whatsapp" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.WHATSAPP)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.PHONE) && (
            <DataItem>
              <DataItemTitle text={t('Customer:phoneLabel')}>
                <Fw5Icon name="phone" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.PHONE)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.BIRTH_DATE) && (
            <DataItem>
              <DataItemTitle text={t('Customer:birthDateLabel')}>
                <Fw5Icon name="birthday-cake" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.BIRTH_DATE)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.CEP) && (
            <DataItem>
              <DataItemTitle text={t('Customer:cepLabel')}>
                <Fw5Icon name="map-marker-alt" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.CEP)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.ADDRESS) && (
            <DataItem>
              <DataItemTitle text={t('Customer:addressLabel')}>
                <Fw5Icon name="road" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.ADDRESS)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.NUMBER) && (
            <DataItem>
              <DataItemTitle text={t('Customer:numberLabel')}>
                <Fw5Icon name="home" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.NUMBER)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.DISTRICT) && (
            <DataItem>
              <DataItemTitle text={t('Customer:districtLabel')}>
                <Fw5Icon name="map-pin" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.DISTRICT)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.CITY) && (
            <DataItem>
              <DataItemTitle text={t('Customer:cityLabel')}>
                <Fw5Icon name="map" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.CITY)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.STATE) && (
            <DataItem>
              <DataItemTitle text={t('Customer:stateLabel')}>
                <Fw5Icon name="map-marked-alt" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.STATE)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.COMPLEMENT) && (
            <DataItem>
              <DataItemTitle text={t('Customer:complementLabel')}>
                <Fw5Icon name="comment" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(CUSTOMER_DOC.COMPLEMENT)} />
            </DataItem>
          )}

          {!!getValue(CUSTOMER_DOC.CAN_RECEIVE_MESSAGES) && (
            <DataItem>
              <DataItemTitle text={t('Customer:canReceiveMessagesLabel')}>
                <Fw5Icon name="check" solid />
              </DataItemTitle>
              <DataItemValue
                text={t(
                  getValue(CUSTOMER_DOC.CAN_RECEIVE_MESSAGES)
                    ? 'Glossary:yes'
                    : 'Glossary:no',
                )}
              />
            </DataItem>
          )}

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

          <DeleteButton
            text={t('editButton')}
            onPress={onEditCustomer}
            iconComponent={<ButtonIcon name="pen" />}
          />
        </Content>
      </Scroll>
    </Container>
  )
}

CustomerDetails.navigationOptions = () => ({
  headerShown: false,
})

export default CustomerDetails
