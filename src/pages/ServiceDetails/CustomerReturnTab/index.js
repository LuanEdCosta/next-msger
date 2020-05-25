import React, { useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { SERVICE_DOC, CUSTOMER_RETURN_DOC } from '@/config/database'
import { MessagePanelIcon, FabIcon, Fw5Icon } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import MessagePanel from '@/components/MessagePanel'
import Fab from '@/components/Fab'
import TouchableIcon from '@/components/TouchableIcon'

import useSubscribeToReturnCollection from './useSubscribeToReturnCollection'
import {
  Container,
  List,
  ReturnListItem,
  ReturnListItemText,
  ReturnListItemContainer,
} from './styles'

const CustomerReturnTab = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)

  const { t } = useTranslation('ServiceDetailsReturnTab')
  const [returnList, setReturnList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onSubscribeToReturnCollection = useSubscribeToReturnCollection(
    setReturnList,
    setIsLoading,
    serviceId,
  )

  useEffect(onSubscribeToReturnCollection, [])

  const onRenderItem = useCallback(
    ({ item }) => {
      const {
        [CUSTOMER_RETURN_DOC.RETURN_DATE]: returnDate,
        [CUSTOMER_RETURN_DOC.OBSERVATIONS]: observations,
      } = item

      const onDeleteReturn = () => {}

      return (
        <ReturnListItemContainer>
          <ReturnListItem>
            <ReturnListItemText text={observations} isTitle>
              <Fw5Icon name="comment" solid />
            </ReturnListItemText>

            <ReturnListItemText
              text={t('returnDate', { date: moment(returnDate) })}
            >
              <Fw5Icon name="calendar-alt" />
            </ReturnListItemText>
          </ReturnListItem>

          <TouchableIcon onPress={onDeleteReturn}>
            <Fw5Icon name="trash" />
          </TouchableIcon>
        </ReturnListItemContainer>
      )
    },
    [t],
  )

  const keyExtractor = useCallback((item) => {
    return item[CUSTOMER_RETURN_DOC.ID]
  }, [])

  const onAddNewCustomerReturn = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.CUSTOMER_RETURN_REGISTRATION, {
      [SERVICE_DOC.ID]: serviceId,
    })
  }, [navigation, serviceId])

  return (
    <Container>
      <Fab
        onPress={onAddNewCustomerReturn}
        iconComponent={<FabIcon name="plus" />}
      />

      <List
        data={returnList}
        renderItem={onRenderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <MessagePanel
            isLoading={isLoading}
            text={t('anyReturnFound')}
            iconComponent={<MessagePanelIcon name="reply" />}
          />
        }
      />
    </Container>
  )
}

export default CustomerReturnTab
