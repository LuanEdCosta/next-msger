import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { useErrorAlert } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'
import { Fw5Icon } from '@/components/Fw5Icon'

import {
  Container,
  DataGroup,
  DataGroupTitle,
  DataItem,
  DataItemTitle,
  DataItemText,
} from './styles'

const OverviewTab = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID, '')

  const { t } = useTranslation('ServiceDetailsOverviewTab')
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

  const customer = useMemo(() => serviceData[SERVICE_DOC.CUSTOMER_KEY] || {}, [
    serviceData,
  ])

  const serviceType = useMemo(
    () => serviceData[SERVICE_DOC.SERVICE_TYPE_KEY] || {},
    [serviceData],
  )

  return (
    <Container>
      <DataGroup>
        <DataGroupTitle>{t('serviceDataGroupTtitle')}</DataGroupTitle>

        <DataItem>
          <DataItemTitle text={t('startDate')}>
            <Fw5Icon name="calendar-day" solid />
          </DataItemTitle>
          <DataItemText
            text={moment(serviceData[SERVICE_DOC.START_DATE]).format('LL')}
          />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('endDate')}>
            <Fw5Icon name="calendar-week" solid />
          </DataItemTitle>
          <DataItemText
            text={moment(serviceData[SERVICE_DOC.END_DATE]).format('LL')}
          />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('serviceTypeName')}>
            <Fw5Icon name="file-alt" solid />
          </DataItemTitle>
          <DataItemText text={serviceType[SERVICE_DOC.SERVICE_TYPE.NAME]} />
        </DataItem>
      </DataGroup>

      <DataGroup>
        <DataGroupTitle>{t('customerDataGroupTtitle')}</DataGroupTitle>

        <DataItem>
          <DataItemTitle text={t('customerName')}>
            <Fw5Icon name="user" solid />
          </DataItemTitle>
          <DataItemText text={customer[SERVICE_DOC.CUSTOMER.NAME]} />
        </DataItem>
      </DataGroup>
    </Container>
  )
}

export default OverviewTab
