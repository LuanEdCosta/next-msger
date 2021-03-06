import React, { useCallback, useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import {
  SERVICE_DOC,
  CUSTOMER_RETURN_DOC,
  RETURN_REASON_DOC,
} from '@/config/database'
import { MessagePanelIcon, FabIcon, Fw5Icon } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import MessagePanel from '@/components/MessagePanel'
import Fab from '@/components/Fab'
import TouchableIcon from '@/components/TouchableIcon'
import { CUSTOMER_RETURN_REGISTRATION_PARAMS } from '@/config/navigation/RouteParams'
import { firebaseTimestampToMoment } from '@/utils'

import ServiceDetailsContext from '../ServiceDetailsContext'

import {
  Container,
  List,
  ReturnListItem,
  ReturnListItemText,
  ReturnListItemContainer,
  HintTitle,
  HintText,
} from './styles'
import useDeleteCustomerReturn from './useDeleteCustomerReturn'
import useSubscribeToReturnCollection from './useSubscribeToReturnCollection'

const CustomerReturnTab = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)

  const { t } = useTranslation(['ServiceDetailsReturnTab', 'Glossary'])
  const [returnList, setReturnList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { isFinalized, onShowFinalizedWarning } = useContext(
    ServiceDetailsContext,
  )

  const onDeleteCustomerReturn = useDeleteCustomerReturn()

  const onSubscribeToReturnCollection = useSubscribeToReturnCollection(
    setReturnList,
    setIsLoading,
    serviceId,
  )

  useEffect(onSubscribeToReturnCollection, [])

  const onConfirmToDelete = useCallback(
    (id) => {
      if (isFinalized) {
        onShowFinalizedWarning()
        return
      }

      Alert.alert(
        t('deleteAlertTitle'),
        t('deleteAlertMessage'),
        [
          { text: t('Glossary:cancel') },
          {
            text: t('Glossary:delete'),
            onPress: () => onDeleteCustomerReturn(serviceId, id),
          },
        ],
        { cancelable: true },
      )
    },
    [isFinalized, onDeleteCustomerReturn, onShowFinalizedWarning, serviceId, t],
  )

  const onNavigateToEditReturn = useCallback(
    (item) => {
      if (isFinalized) {
        onShowFinalizedWarning()
        return
      }

      navigation.navigate(MAIN_ROUTES.CUSTOMER_RETURN_REGISTRATION, {
        [CUSTOMER_RETURN_REGISTRATION_PARAMS.IS_EDITING]: true,
        ...item, // Spread CUSTOMER_RETURN_DOC
      })
    },
    [isFinalized, navigation, onShowFinalizedWarning],
  )

  const onRenderItem = useCallback(
    ({ item }) => {
      const {
        [CUSTOMER_RETURN_DOC.ID]: id,
        [CUSTOMER_RETURN_DOC.REASON]: reason,
        [CUSTOMER_RETURN_DOC.RETURN_DATE]: returnDate,
        [CUSTOMER_RETURN_DOC.RETURN_HOUR]: returnHour,
        [CUSTOMER_RETURN_DOC.OBSERVATIONS]: observations,
      } = item

      const { [RETURN_REASON_DOC.NAME]: reasonName } = reason

      const onDeleteReturn = () => onConfirmToDelete(id)
      const onEditReturn = () => onNavigateToEditReturn(item)

      return (
        <ReturnListItemContainer>
          <ReturnListItem onPress={onEditReturn}>
            <ReturnListItemText text={t('reason', { reasonName })} isTitle>
              <Fw5Icon name="question-circle" solid />
            </ReturnListItemText>

            <ReturnListItemText
              text={t('returnDate', {
                date: firebaseTimestampToMoment(returnDate),
                interpolation: {
                  escapeValue: false,
                  format(str) {
                    return decodeURI(encodeURI(str))
                  },
                },
              })}
            >
              <Fw5Icon name="calendar-alt" />
            </ReturnListItemText>

            <ReturnListItemText
              text={t('returnHour', {
                hour: returnHour
                  ? firebaseTimestampToMoment(returnHour)
                  : t('withoutHour'),
              })}
            >
              <Fw5Icon name="clock" solid />
            </ReturnListItemText>

            {!!observations && (
              <ReturnListItemText text={observations} numOfLines={1}>
                <Fw5Icon name="comment" solid />
              </ReturnListItemText>
            )}
          </ReturnListItem>

          <TouchableIcon onPress={onDeleteReturn} size={48}>
            <Fw5Icon name="trash" size={20} />
          </TouchableIcon>
        </ReturnListItemContainer>
      )
    },
    [onConfirmToDelete, onNavigateToEditReturn, t],
  )

  const keyExtractor = useCallback((item) => {
    return item[CUSTOMER_RETURN_DOC.ID]
  }, [])

  const onAddNewCustomerReturn = useCallback(() => {
    if (isFinalized) {
      onShowFinalizedWarning()
      return
    }

    navigation.navigate(MAIN_ROUTES.CUSTOMER_RETURN_REGISTRATION, {
      [SERVICE_DOC.ID]: serviceId,
    })
  }, [isFinalized, navigation, onShowFinalizedWarning, serviceId])

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
          <>
            <MessagePanel
              isLoading={isLoading}
              text={t('anyReturnFound')}
              iconComponent={<MessagePanelIcon name="reply" />}
            />

            <HintTitle>{t('hintTitle')}</HintTitle>
            <HintText>{t('hintText')}</HintText>
          </>
        }
      />
    </Container>
  )
}

export default CustomerReturnTab
