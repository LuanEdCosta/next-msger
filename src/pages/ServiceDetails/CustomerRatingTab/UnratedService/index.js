import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { SERVICE_DOC } from '@/config/database'

import { Title, Description, RateButton } from './styles'

const UnratedService = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID, '')
  const { t } = useTranslation('ServiceDetailsRatingTab')
  const { height } = Dimensions.get('window')

  const onRateService = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.RATE_SERVICE, {
      [SERVICE_DOC.ID]: serviceId,
    })
  }, [navigation, serviceId])

  return (
    <>
      <Fw5IconAccent name="grin-stars" size={height / 5} solid />
      <Title>{t('unratedTitle')}</Title>
      <Description>{t('unratedDescription')}</Description>

      <RateButton
        text={t('rate')}
        onPress={onRateService}
        iconComponent={<ButtonIcon name="star" />}
      />
    </>
  )
}

export default UnratedService