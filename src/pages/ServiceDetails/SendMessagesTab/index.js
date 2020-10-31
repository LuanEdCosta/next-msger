import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import {
  MARKETING_STEP_DOC,
  SERVICE_DOC,
  SERVICE_SENT_MSGS,
} from '@/config/database'
import { Fw5Icon } from '@/components/Fw5Icon'
import {
  firebaseTimestampToMoment,
  getTimePartsFromMilliseconds,
} from '@/utils'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useMarketingStepSubscription from './useMarketingStepSubscription'
import useSendWhatsAppToCustomer from './useSendWhatsAppToCustomer'
import ItemActionsBottomSheet from './ItemActionsBottomSheet'
import useSendEmailToCustomer from './useSendEmailToCustomer'
import useSendSmsToCustomer from './useSendSmsToCustomer'
import useCallCustomer from './useCallCustomer'
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
  ItemHeaderTexts,
  ItemHeaderActions,
} from './styles'

const SendMessagesTab = ({ navigation }) => {
  const { t } = useTranslation([
    'ServiceDetailsSendMessagesTab',
    'TimeBuilder',
    'Glossary',
  ])

  const {
    serviceData,
    isFinalized,
    canSendMessages,
    onShowFinalizedWarning,
    canCustomerReceiveMessages,
    onShowCanNotSendMessageWarning,
  } = useContext(ServiceDetailsContext)

  const [isLoadingMarketingSteps, setIsLoadingMarketingSteps] = useState(true)
  const [selectedMarketingStep, setSelectedMarketingStep] = useState(null)
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

  const getMillisecondsAfterServiceEnds = useCallback(() => {
    const { [SERVICE_DOC.END_DATE]: endDateTimestamp } = serviceData
    const momentEndDate = firebaseTimestampToMoment(endDateTimestamp)
    const today = moment()
    const differenceInMilliseconds = today.diff(momentEndDate, 'milliseconds')
    return differenceInMilliseconds
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

  const onDisplayWarningAlert = useCallback(() => {
    if (isFinalized) onShowFinalizedWarning()
    else if (!canCustomerReceiveMessages) onShowCanNotSendMessageWarning()
  }, [
    canCustomerReceiveMessages,
    isFinalized,
    onShowCanNotSendMessageWarning,
    onShowFinalizedWarning,
  ])

  const renderItem = useCallback(
    ({ item: marketingStep }) => {
      const {
        [MARKETING_STEP_DOC.ID]: marketingStepId,
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.MILLISECONDS]: milliseconds,
      } = marketingStep

      const millisecondsAfterServiceEnds = getMillisecondsAfterServiceEnds()
      const isStepEnabled = millisecondsAfterServiceEnds >= milliseconds
      const stepTimeParts = getTimePartsFromMilliseconds(milliseconds)
      const remainingTimeParts = getTimePartsFromMilliseconds(
        milliseconds - millisecondsAfterServiceEnds,
      )

      const {
        [SERVICE_SENT_MSGS.EMAIL]: wasSentEmail,
        [SERVICE_SENT_MSGS.WHATSAPP]: wasSentWhats,
        [SERVICE_SENT_MSGS.SMS]: wasSentSms,
        [SERVICE_SENT_MSGS.CALL]: wasCalled,
      } = onGetSentMessagesObject(marketingStepId)

      const onSendWhatsMessage = () => {
        if (!canSendMessages) onDisplayWarningAlert()
        else onSendWhatsAppToCustomer(marketingStep)
      }

      const onSendEmail = () => {
        if (!canSendMessages) onDisplayWarningAlert()
        else onSendEmailToCustomer(marketingStep)
      }

      const onSendSms = () => {
        if (!canSendMessages) onDisplayWarningAlert()
        else onSendSmsToCustomer(marketingStep)
      }

      const onCall = () => {
        if (!canSendMessages) onDisplayWarningAlert()
        else onCallCustomer(marketingStep)
      }

      const onSelectMarketingStep = () => {
        setSelectedMarketingStep(marketingStepId)
      }

      return (
        <ItemContainer>
          {!isStepEnabled && (
            <ItemStatus>
              {t('notReadyToSendMessages', {
                timeText: t('TimeBuilder:timeText', remainingTimeParts),
              })}
            </ItemStatus>
          )}

          <ItemHeader>
            <ItemHeaderTexts>
              <MarketingStepName>
                {t('itemStepName', { name })}
              </MarketingStepName>

              <MarketingStepDays>
                {milliseconds
                  ? t('TimeBuilder:afterTimeText', stepTimeParts)
                  : t('stepAlwaysActive')}
              </MarketingStepDays>
            </ItemHeaderTexts>

            <ItemHeaderActions onPress={onSelectMarketingStep}>
              <Fw5Icon name="ellipsis-v" />
            </ItemHeaderActions>
          </ItemHeader>

          <ItemContent isMarketingStepEnabled={isStepEnabled}>
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
      canSendMessages,
      getMillisecondsAfterServiceEnds,
      onCallCustomer,
      onDisplayWarningAlert,
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
    <>
      <ItemActionsBottomSheet
        navigation={navigation}
        isShowing={!!selectedMarketingStep}
        marketingStepId={selectedMarketingStep}
        handleClose={() => {
          setSelectedMarketingStep(null)
        }}
      />

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
    </>
  )
}

export default SendMessagesTab
