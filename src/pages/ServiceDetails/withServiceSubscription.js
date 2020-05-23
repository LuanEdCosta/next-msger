import React, { useEffect, useState, useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

import ServiceDetailsHeader from './ServiceDetailsHeader'
import ServiceDetailsContext from './ServiceDetailsContext'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const { navigation } = props
    const serviceId = navigation.getParam(SERVICE_DOC.ID)

    const showAlert = useErrorAlert()

    const [serviceData, setServiceData] = useState({})

    const onSubscribeToServiceDocument = useCallback(() => {
      const unsubscribe = firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .onSnapshot({
          error: showAlert,
          next(doc) {
            setServiceData({
              ...doc.data(),
              [SERVICE_DOC.ID]: doc.id,
            })
          },
        })

      return unsubscribe
    }, [serviceId, showAlert])

    useEffect(onSubscribeToServiceDocument, [])

    return (
      <ServiceDetailsContext.Provider value={{ serviceData }}>
        <DefaultNavigator {...props} />
      </ServiceDetailsContext.Provider>
    )
  }

  CustomNavigator.router = DefaultNavigator.router
  CustomNavigator.navigationOptions = ServiceDetailsHeader

  return CustomNavigator
}
