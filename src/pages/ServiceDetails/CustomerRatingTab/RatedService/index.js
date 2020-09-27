import React, { useContext, useCallback, useMemo, useState } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'

import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { RATE_SERVICE_PARAMS } from '@/config/navigation/RouteParams'
import { Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'
import { SERVICE_DOC, SERVICE_RATING } from '@/config/database'
import { MAIN_COLORS } from '@/styles'

import ServiceDetailsContext from '../../ServiceDetailsContext'
import useDeleteServiceRating from '../useDeleteServiceRating'

import {
  Title,
  Comment,
  RatingStars,
  EditButton,
  Subtitle,
  RatingData,
  ActionsContainer,
  DeleteButton,
} from './styles'

const RatedService = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)

  const { t } = useTranslation(['ServiceDetailsRatingTab', 'Glossary'])
  const { serviceData, isFinalized, onShowFinalizedWarning } = useContext(
    ServiceDetailsContext,
  )

  const [isDeleting, setIsDeleting] = useState(false)
  const onDeleteRating = useDeleteServiceRating(serviceId, setIsDeleting)

  const {
    [SERVICE_RATING.NOTE]: note,
    [SERVICE_RATING.COMMENT]: comment,
  } = useMemo(() => {
    return serviceData[SERVICE_DOC.RATING] || {}
  }, [serviceData])

  const onEditRating = useCallback(() => {
    if (isFinalized) {
      onShowFinalizedWarning()
      return
    }

    navigation.navigate(MAIN_ROUTES.RATE_SERVICE, {
      [SERVICE_DOC.ID]: serviceId,
      [RATE_SERVICE_PARAMS.IS_EDITING]: true,
      [RATE_SERVICE_PARAMS.CURRENT_NOTE]: note,
      [RATE_SERVICE_PARAMS.CURRENT_COMMENT]: comment,
    })
  }, [
    comment,
    isFinalized,
    navigation,
    note,
    onShowFinalizedWarning,
    serviceId,
  ])

  const onDeleteRatingButtonPressed = useCallback(() => {
    if (isFinalized) {
      onShowFinalizedWarning()
      return
    }

    Alert.alert(
      t('deleteAlertTitle'),
      t('deleteAlertMessage'),
      [
        { text: t('Glossary:cancel') },
        { text: t('Glossary:delete'), onPress: onDeleteRating },
      ],
      { cancelable: true },
    )
  }, [isFinalized, onDeleteRating, onShowFinalizedWarning, t])

  return (
    <>
      <Title>{t('ratedTitle')}</Title>
      <Subtitle>{t('ratedSubtitle')}</Subtitle>

      <RatingData>
        <RatingStars
          note={note}
          disabled
          onRenderIcon={({ isSelected }) => {
            return isSelected ? (
              <Fw5IconAccent name="star" size={40} solid />
            ) : (
              <Fw5Icon name="star" solid={false} size={40} />
            )
          }}
        />

        {!!comment && <Comment>{comment}</Comment>}
      </RatingData>

      <ActionsContainer>
        <EditButton
          text={t('editRatingButton')}
          onPress={onEditRating}
          borderWidth={2}
          borderColor="accent"
          backgroundColor="white"
          textColor="accent"
          iconComponent={<Fw5IconAccent name="pen" size={18} />}
        />

        <DeleteButton onPress={onDeleteRatingButtonPressed} size={50}>
          {isDeleting ? (
            <ActivityIndicator color={MAIN_COLORS.secondaryText} />
          ) : (
            <Fw5Icon name="trash" size={18} />
          )}
        </DeleteButton>
      </ActionsContainer>
    </>
  )
}

export default RatedService
