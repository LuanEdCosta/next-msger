import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'

import { Title, Description, RateButton } from './styles'

const UnratedService = () => {
  const { t } = useTranslation('ServiceDetailsRatingTab')
  const { height } = Dimensions.get('window')

  const onRateService = useCallback(() => {}, [])

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
