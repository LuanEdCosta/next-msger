import React, { useEffect, useState } from 'react'

import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsHeader from './ServiceDetailsHeader'
import ServiceDetailsContext from './ServiceDetailsContext'
import useServiceSubscription from './useServiceSubscription'
import useFetchCustomerData from './useFetchCustomerData'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const { navigation } = props
    const serviceId = navigation.getParam(SERVICE_DOC.ID)

    const [serviceData, setServiceData] = useState({})
    const [customerData, setCustomerData] = useState({})

    const onSubscribeToServiceDocument = useServiceSubscription(
      serviceId,
      setServiceData,
    )

    const onFetchCustomerData = useFetchCustomerData(
      serviceData,
      setCustomerData,
    )

    useEffect(onSubscribeToServiceDocument, [])

    useEffect(() => {
      onFetchCustomerData()
    }, [onFetchCustomerData])

    return (
      <ServiceDetailsContext.Provider value={{ serviceData, customerData }}>
        <DefaultNavigator {...props} />
      </ServiceDetailsContext.Provider>
    )
  }

  CustomNavigator.router = DefaultNavigator.router
  CustomNavigator.navigationOptions = ServiceDetailsHeader

  return CustomNavigator
}
