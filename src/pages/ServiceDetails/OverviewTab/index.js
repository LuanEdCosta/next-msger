import React, { useMemo, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CUSTOMER_DOC, SERVICE_DOC, SERVICE_TYPE_DOC } from '@/config/database'
import { ButtonIcon, Fw5Icon } from '@/components/Fw5Icon'
import { firebaseTimestampToMoment } from '@/utils'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { EDIT_SERVICE_PARAMS } from '@/config/navigation/RouteParams'

import ServiceDetailsContext from '../ServiceDetailsContext'

import {
  Container,
  DataGroup,
  DataGroupTitle,
  DataItem,
  DataItemTitle,
  DataItemText,
  EditServiceButton,
} from './styles'

const OverviewTab = ({ navigation }) => {
  const { t } = useTranslation('ServiceDetailsOverviewTab')
  const { serviceData } = useContext(ServiceDetailsContext)

  const customer = useMemo(() => serviceData[SERVICE_DOC.CUSTOMER] || {}, [
    serviceData,
  ])

  const serviceType = useMemo(
    () => serviceData[SERVICE_DOC.SERVICE_TYPE] || {},
    [serviceData],
  )

  const onNavigateToEditService = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_SERVICE, {
      [EDIT_SERVICE_PARAMS.SERVICE_DATA]: serviceData,
    })
  }, [navigation, serviceData])

  return (
    <Container>
      <DataGroup>
        <DataGroupTitle>{t('serviceDataGroupTitle')}</DataGroupTitle>

        <DataItem>
          <DataItemTitle text={t('startDate')}>
            <Fw5Icon name="calendar-day" solid />
          </DataItemTitle>
          <DataItemText
            text={
              serviceData[SERVICE_DOC.START_DATE]
                ? firebaseTimestampToMoment(
                    serviceData[SERVICE_DOC.START_DATE],
                  ).format('LL')
                : ''
            }
          />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('endDate')}>
            <Fw5Icon name="calendar-week" solid />
          </DataItemTitle>
          <DataItemText
            text={
              serviceData[SERVICE_DOC.END_DATE]
                ? firebaseTimestampToMoment(
                    serviceData[SERVICE_DOC.END_DATE],
                  ).format('LL')
                : ''
            }
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
        <DataGroupTitle>{t('customerDataGroupTitle')}</DataGroupTitle>

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

      <EditServiceButton
        text={t('editService')}
        onPress={onNavigateToEditService}
        iconComponent={<ButtonIcon name="pen" />}
      />
    </Container>
  )
}

export default OverviewTab
