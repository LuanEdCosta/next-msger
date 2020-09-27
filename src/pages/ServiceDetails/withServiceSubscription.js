import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from './ServiceDetailsContext'
import useServiceSubscription from './useServiceSubscription'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const { navigation } = props
    const serviceId = navigation.getParam(SERVICE_DOC.ID)

    const { t } = useTranslation(['ServiceDetails', 'Glossary'])
    const [serviceData, setServiceData] = useState({})

    const customerData = useMemo(() => {
      const customer = serviceData[SERVICE_DOC.CUSTOMER] || {}
      return customer
    }, [serviceData])

    const isFinalized = useMemo(() => {
      const finalized = !!serviceData[SERVICE_DOC.FINALIZED] || false
      return finalized
    }, [serviceData])

    const onShowFinalizedWarning = useCallback(() => {
      Alert.alert(
        t('Glossary:warning'),
        t('serviceFinalizedWarning'),
        [{ text: t('Glossary:ok') }],
        { cancelable: true },
      )
    }, [t])

    const onSubscribeToServiceDocument = useServiceSubscription(
      serviceId,
      setServiceData,
    )

    useEffect(onSubscribeToServiceDocument, [])

    return (
      <ServiceDetailsContext.Provider
        value={{
          serviceData,
          customerData,
          isFinalized,
          onShowFinalizedWarning,
        }}
      >
        <DefaultNavigator {...props} />
      </ServiceDetailsContext.Provider>
    )
  }

  CustomNavigator.router = DefaultNavigator.router
  CustomNavigator.navigationOptions = () => ({
    headerShown: false,
  })

  return CustomNavigator
}
