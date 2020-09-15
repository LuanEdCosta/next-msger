import React, { useMemo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { CUSTOMER_DOC, SERVICE_DOC, SERVICE_TYPE_DOC } from '@/config/database'
import { Fw5Icon } from '@/components/Fw5Icon'

import ServiceDetailsContext from '../ServiceDetailsContext'

import {
  Container,
  DataGroup,
  DataGroupTitle,
  DataItem,
  DataItemTitle,
  DataItemText,
} from './styles'

const OverviewTab = () => {
  const { t } = useTranslation('ServiceDetailsOverviewTab')
  const { serviceData } = useContext(ServiceDetailsContext)

  const customer = useMemo(() => serviceData[SERVICE_DOC.CUSTOMER] || {}, [
    serviceData,
  ])

  const serviceType = useMemo(
    () => serviceData[SERVICE_DOC.SERVICE_TYPE] || {},
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
          <DataItemText text={serviceType[SERVICE_TYPE_DOC.NAME]} />
        </DataItem>
      </DataGroup>

      <DataGroup>
        <DataGroupTitle>{t('customerDataGroupTtitle')}</DataGroupTitle>

        <DataItem>
          <DataItemTitle text={t('customerName')}>
            <Fw5Icon name="user" solid />
          </DataItemTitle>
          <DataItemText text={customer[CUSTOMER_DOC.NAME]} />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('customerEmail')}>
            <Fw5Icon name="envelope" solid />
          </DataItemTitle>
          <DataItemText text={customer[CUSTOMER_DOC.EMAIL]} />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('customerCellphone')}>
            <Fw5Icon name="mobile" solid />
          </DataItemTitle>
          <DataItemText text={customer[CUSTOMER_DOC.PHONE]} />
        </DataItem>
      </DataGroup>
    </Container>
  )
}

export default OverviewTab
