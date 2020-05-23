import React, { useContext, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { RATE_SERVICE_PARAMS } from '@/config/navigation/RouteParams'
import { SERVICE_DOC } from '@/config/database'
import { Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'

import ServiceDetailsContext from '../../ServiceDetailsContext'

import {
  Title,
  Comment,
  RatingStars,
  EditButton,
  Subtitle,
  RatingData,
} from './styles'

const RatedService = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)
  const { serviceData } = useContext(ServiceDetailsContext)
  const { t } = useTranslation('ServiceDetailsRatingTab')

  const {
    [SERVICE_DOC.RATING.NOTE]: note,
    [SERVICE_DOC.RATING.COMMENT]: comment,
  } = useMemo(() => {
    return serviceData[SERVICE_DOC.RATING_KEY] || {}
  }, [serviceData])

  const onEditRating = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.RATE_SERVICE, {
      [SERVICE_DOC.ID]: serviceId,
      [RATE_SERVICE_PARAMS.IS_EDITING]: true,
      [RATE_SERVICE_PARAMS.CURRENT_NOTE]: note,
      [RATE_SERVICE_PARAMS.CURRENT_COMMENT]: comment,
    })
  }, [comment, navigation, note, serviceId])

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

      <EditButton
        text={t('editRatingButton')}
        onPress={onEditRating}
        borderWidth={2}
        borderColor="accent"
        backgroundColor="white"
        textColor="accent"
        iconComponent={<Fw5IconAccent name="pen" size={18} />}
      />
    </>
  )
}

export default RatedService
