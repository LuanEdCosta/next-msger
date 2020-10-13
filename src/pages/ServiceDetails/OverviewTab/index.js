import React, { useMemo, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CUSTOMER_DOC, SERVICE_DOC, SERVICE_TYPE_DOC } from '@/config/database'
import { ButtonIcon, Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'
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
  ServiceStatusIndicator,
  FinalizedStatusExplanation,
  EditServiceButton,
  OpenCustomerDetailsButton,
} from './styles'

const OverviewTab = ({ navigation }) => {
  const { t } = useTranslation('ServiceDetailsOverviewTab')
  const { serviceData, isFinalized, onShowFinalizedWarning } = useContext(
    ServiceDetailsContext,
  )

  const customer = useMemo(() => serviceData[SERVICE_DOC.CUSTOMER] || {}, [
    serviceData,
  ])

  const serviceType = useMemo(
    () => serviceData[SERVICE_DOC.SERVICE_TYPE] || {},
    [serviceData],
  )

  const onNavigateToEditService = useCallback(() => {
    if (isFinalized) {
      onShowFinalizedWarning()
      return
    }

    navigation.navigate(MAIN_ROUTES.EDIT_SERVICE, {
      [EDIT_SERVICE_PARAMS.SERVICE_DATA]: serviceData,
    })
  }, [isFinalized, navigation, onShowFinalizedWarning, serviceData])

  const onOpenCustomerDetails = useCallback(() => {
    if (!customer) return
    const customerId = customer[CUSTOMER_DOC.ID]
    if (!customerId) return
    navigation.navigate(MAIN_ROUTES.CUSTOMER_DETAILS, {
      [CUSTOMER_DOC.ID]: customerId,
    })
  }, [customer, navigation])

  return (
    <Container>
      <ServiceStatusIndicator isFinalized={isFinalized}>
        {t(isFinalized ? 'serviceFinalized' : 'serviceNotFinalized')}
      </ServiceStatusIndicator>

      {isFinalized && (
        <FinalizedStatusExplanation>
          {t('finalizedExplanation')}
        </FinalizedStatusExplanation>
      )}

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

        <OpenCustomerDetailsButton
          text={t('openCustomerDetails')}
          onPress={onOpenCustomerDetails}
          iconComponent={<Fw5IconAccent name="external-link-alt" />}
          borderWidth={2}
          borderColor="accent"
          backgroundColor="white"
          textColor="accent"
        />
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
