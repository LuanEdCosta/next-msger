import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import {
  MARKETING_STEP_DOC,
  SERVICE_DOC,
  SERVICE_SENT_MSGS,
} from '@/config/database'

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

  const onGetSentMessagesObject = useCallback(
    (marketingStepId) => {
      const defaultSentMessagesObject = {
        [SERVICE_SENT_MSGS.EMAIL]: false,
        [SERVICE_SENT_MSGS.WHATSAPP]: false,
        [SERVICE_SENT_MSGS.SMS]: false,
        [SERVICE_SENT_MSGS.CALL]: false,
      }

      if (!serviceData || !marketingStepId) return defaultSentMessagesObject
      const marketingStepSentMsgs = serviceData[SERVICE_DOC.SENT_MESSAGES]
      if (!marketingStepSentMsgs) return defaultSentMessagesObject
      const sentMessagesObject = marketingStepSentMsgs[marketingStepId]
      if (!sentMessagesObject) return defaultSentMessagesObject

      return sentMessagesObject
    },
    [serviceData],
  )

  const renderItem = useCallback(
    ({ item: marketingStep }) => {
      const {
        [MARKETING_STEP_DOC.ID]: marketingStepId,
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: numOfDays,
      } = marketingStep

      const isMarketingStepEnabled = daysAfterServiceEnds >= numOfDays
      const {
        [SERVICE_SENT_MSGS.EMAIL]: wasSentEmail,
        [SERVICE_SENT_MSGS.WHATSAPP]: wasSentWhats,
        [SERVICE_SENT_MSGS.SMS]: wasSentSms,
        [SERVICE_SENT_MSGS.CALL]: wasCalled,
      } = onGetSentMessagesObject(marketingStepId)

      const onSendWhatsMessage = () => onSendWhatsAppToCustomer(marketingStep)
      const onSendEmail = () => onSendEmailToCustomer(marketingStep)
      const onSendSms = () => onSendSmsToCustomer(marketingStep)
      const onCall = () => onCallCustomer(marketingStep)

      return (
        <ItemContainer>
          {!isMarketingStepEnabled && (
            <ItemStatus>
              {t('notReadyToSendMessages', { numOfDays: daysAfterServiceEnds })}
            </ItemStatus>
          )}

          <ItemHeader>
            <MarketingStepName>{t('itemStepName', { name })}</MarketingStepName>

            <MarketingStepDays>
              {t('itemNumOfDays', { numOfDays })}
            </MarketingStepDays>
          </ItemHeader>

          <ItemContent isMarketingStepEnabled={isMarketingStepEnabled}>
            <SendMessageButton
              onPress={onSendWhatsMessage}
              isMarked={wasSentWhats}
            >
              <SendMessageIcon name="whatsapp" isMarked={wasSentWhats} />
            </SendMessageButton>

            <SendMessageButton onPress={onSendEmail} isMarked={wasSentEmail}>
              <SendMessageIcon name="envelope" isMarked={wasSentEmail} />
            </SendMessageButton>

            <SendMessageButton onPress={onSendSms} isMarked={wasSentSms}>
              <SendMessageIcon name="sms" isMarked={wasSentSms} />
            </SendMessageButton>

            <SendMessageButton onPress={onCall} isMarked={wasCalled}>
              <SendMessageIcon name="phone-volume" isMarked={wasCalled} />
            </SendMessageButton>
          </ItemContent>
        </ItemContainer>
      )
    },
    [
      daysAfterServiceEnds,
      onCallCustomer,
      onGetSentMessagesObject,
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
