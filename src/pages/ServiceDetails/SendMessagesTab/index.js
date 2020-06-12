import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { MARKETING_STEP_DOC, SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useMarketingStepSubscription from './useMarketingStepSubscription'
import EmptyComponent from './EmptyComponent'
import {
  List,
  ListHint,
  ItemContainer,
  ItemStatus,
  ItemHeader,
  MarketingStepName,
  MarketingStepDays,
  ItemContent,
  SendMessageButton,
  SendMessageIcon,
} from './styles'
import useSendWhatsAppToCustomer from './useSendWhatsAppToCustomer'
import useSendEmailToCustomer from './useSendEmailToCustomer'
import useSendSmsToCustomer from './useSendSmsToCustomer'
import useCallCustomer from './useCallCustomer'

const SendMessagesTab = ({ navigation }) => {
  const { t } = useTranslation('ServiceDetailsSendMessagesTab')
  const { serviceData } = useContext(ServiceDetailsContext)

  const [isLoadingMarketingSteps, setIsLoadingMarketingSteps] = useState(true)
  const [marketingStepList, setMarketingStepList] = useState([])

  const onSendWhatsAppToCustomer = useSendWhatsAppToCustomer()
  const onSendEmailToCustomer = useSendEmailToCustomer()
  const onSendSmsToCustomer = useSendSmsToCustomer()
  const onCallCustomer = useCallCustomer()

  const onSubscribeToMarketingStep = useMarketingStepSubscription(
    setIsLoadingMarketingSteps,
    setMarketingStepList,
  )

  useEffect(onSubscribeToMarketingStep, [])

  const daysAfterServiceEnds = useMemo(() => {
    const { [SERVICE_DOC.END_DATE]: endDateTimestamp } = serviceData
    const endDate = moment(endDateTimestamp)
    const today = moment()
    const differenceInDays = today.diff(endDate, 'days')
    return differenceInDays
  }, [serviceData])

  const renderItem = useCallback(
    ({ item: marketingStep }) => {
      const {
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: numOfDays,
      } = marketingStep

      const isMarketingStepEnabled = daysAfterServiceEnds >= numOfDays

      const onSendWhatsMessage = () => {
        onSendWhatsAppToCustomer(marketingStep, isMarketingStepEnabled)
      }

      const onSendEmail = () => {
        onSendEmailToCustomer(marketingStep, isMarketingStepEnabled)
      }

      const onSendSms = () => {
        onSendSmsToCustomer(marketingStep, isMarketingStepEnabled)
      }

      const onCall = () => onCallCustomer(isMarketingStepEnabled)

      return (
        <ItemContainer>
          {!isMarketingStepEnabled && (
            <ItemStatus>
              {t('notReadyToSendMessages', { numOfDays: daysAfterServiceEnds })}
            </ItemStatus>
          )}

          <ItemHeader>
            <MarketingStepName>
              {t('itemStepName', { stepName: name })}
            </MarketingStepName>

            <MarketingStepDays>
              {t('itemNumOfDays', { numOfDays })}
            </MarketingStepDays>
          </ItemHeader>

          <ItemContent isMarketingStepEnabled={isMarketingStepEnabled}>
            <SendMessageButton onPress={onSendWhatsMessage} wasSent={false}>
              <SendMessageIcon name="whatsapp" wasSent={false} />
            </SendMessageButton>

            <SendMessageButton onPress={onSendEmail}>
              <SendMessageIcon name="envelope" />
            </SendMessageButton>

            <SendMessageButton onPress={onSendSms}>
              <SendMessageIcon name="sms" />
            </SendMessageButton>

            <SendMessageButton onPress={onCall}>
              <SendMessageIcon name="phone-volume" />
            </SendMessageButton>
          </ItemContent>
        </ItemContainer>
      )
    },
    [
      daysAfterServiceEnds,
      onCallCustomer,
      onSendEmailToCustomer,
      onSendSmsToCustomer,
      onSendWhatsAppToCustomer,
      t,
    ],
  )

  const keyExtractor = useCallback((item) => {
    return item[MARKETING_STEP_DOC.ID]
  }, [])

  return (
    <List
      data={marketingStepList}
      extraData={serviceData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        <EmptyComponent
          navigation={navigation}
          isLoading={isLoadingMarketingSteps}
        />
      }
      ListHeaderComponent={
        marketingStepList.length !== 0 && <ListHint>{t('listHint')}</ListHint>
      }
    />
  )
}

export default SendMessagesTab
