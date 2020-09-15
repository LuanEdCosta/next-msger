import React, { useEffect, useMemo, useState } from 'react'

import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsHeader from './ServiceDetailsHeader'
import ServiceDetailsContext from './ServiceDetailsContext'
import useServiceSubscription from './useServiceSubscription'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const { navigation } = props
    const serviceId = navigation.getParam(SERVICE_DOC.ID)

    const [serviceData, setServiceData] = useState({})

    const customerData = useMemo(() => {
      const customer = serviceData[SERVICE_DOC.CUSTOMER] || {}
      return customer
    }, [serviceData])

    const onSubscribeToServiceDocument = useServiceSubscription(
      serviceId,
      setServiceData,
    )

    useEffect(onSubscribeToServiceDocument, [])

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
