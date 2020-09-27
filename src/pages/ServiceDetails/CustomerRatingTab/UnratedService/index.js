import React, { useCallback, useContext } from 'react'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from '../../ServiceDetailsContext'

import { Container, Title, Description, RateButton } from './styles'

const UnratedService = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID, '')
  const { t } = useTranslation('ServiceDetailsRatingTab')
  const { height } = Dimensions.get('window')

  const { isFinalized, onShowFinalizedWarning } = useContext(
    ServiceDetailsContext,
  )

  const onRateService = useCallback(() => {
    if (isFinalized) {
      onShowFinalizedWarning()
      return
    }

    navigation.navigate(MAIN_ROUTES.RATE_SERVICE, {
      [SERVICE_DOC.ID]: serviceId,
    })
  }, [isFinalized, navigation, onShowFinalizedWarning, serviceId])

  return (
    <Container>
      <Fw5IconAccent name="grin-stars" size={height / 5} solid />
      <Title>{t('unratedTitle')}</Title>
      <Description>{t('unratedDescription')}</Description>

      <RateButton
        text={t('rate')}
        onPress={onRateService}
        iconComponent={<ButtonIcon name="star" />}
      />
    </Container>
  )
}

export default UnratedService
