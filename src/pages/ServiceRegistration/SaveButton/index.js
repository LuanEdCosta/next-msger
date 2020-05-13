import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonIcon } from '@/components/Fw5Icon'

import { SaveServiceButton } from './styles'

const SaveButton = () => {
  const { t } = useTranslation('ServiceRegistration')

  const onSave = useCallback(() => {}, [])

  return (
    <SaveServiceButton
      onPress={onSave}
      text={t('saveButton')}
      iconComponent={<ButtonIcon name="plus-circle" />}
    />
  )
}

export default SaveButton
