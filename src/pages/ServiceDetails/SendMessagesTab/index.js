import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { MARKETING_STEP_DOC, CUSTOMER_DOC } from '@/config/database'
import { useSendWhatsAppMessage, useErrorAlert } from '@/hooks'

import ServiceDetailsContext from '../ServiceDetailsContext'

import useMarketingStepSubscription from './useMarketingStepSubscription'
import EmptyComponent from './EmptyComponent'
import {
  List,
  ListHint,
  ItemContainer,
  ItemHeader,
  MarketingStepName,
  MarketingStepDays,
  ItemContent,
  SendMessageButton,
  SendMessageIcon,
} from './styles'

const SendMessagesTab = ({ navigation }) => {
  const { t } = useTranslation('ServiceDetailsSendMessagesTab')
  const { serviceData } = useContext(ServiceDetailsContext)

  const [isLoadingMarketingSteps, setIsLoadingMarketingSteps] = useState(true)
  const [marketingStepList, setMarketingStepList] = useState([])

  const showAlert = useErrorAlert()
  const onSendWhatsAppMessage = useSendWhatsAppMessage()
  const onSubscribeToMarketingStep = useMarketingStepSubscription(
    setIsLoadingMarketingSteps,
    setMarketingStepList,
  )

  useEffect(onSubscribeToMarketingStep, [])

  const renderItem = useCallback(
    ({ item }) => {
      const {
        [MARKETING_STEP_DOC.NAME]: name,
        [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: numOfDays,
        [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: whatsMessage,
      } = item

      const { [CUSTOMER_DOC.WHATSAPP]: whatsNumber } = serviceData

      const onSendWhats = async () => {
        try {
          await onSendWhatsAppMessage(whatsNumber, whatsMessage)
        } catch (e) {
          showAlert()
        }
      }

      return (
        <ItemContainer>
          <ItemHeader>
            <MarketingStepName>{name}</MarketingStepName>
            <MarketingStepDays>
              {t('itemNumOfDays', { numOfDays })}
            </MarketingStepDays>
          </ItemHeader>

          <ItemContent>
            <SendMessageButton onPress={onSendWhats} wasSent={false}>
              <SendMessageIcon name="whatsapp" wasSent={false} />
            </SendMessageButton>

            <SendMessageButton onPress={() => {}}>
              <SendMessageIcon name="envelope" />
            </SendMessageButton>

            <SendMessageButton onPress={() => {}}>
              <SendMessageIcon name="sms" />
            </SendMessageButton>
          </ItemContent>
        </ItemContainer>
      )
    },
    [onSendWhatsAppMessage, serviceData, showAlert, t],
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
