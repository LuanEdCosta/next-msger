import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MAIN_COLORS } from '@/styles'

import { Fw5Icon } from '../Fw5Icon'

import { Container, ErrorText } from './styles'

const InputError = (props) => {
  const { style, text, iconComponent } = props
  const { t } = useTranslation('Error')

  return (
    <Container style={style}>
      {iconComponent}
      <ErrorText hasIcon={!!iconComponent}>{text || t('emptyField')}</ErrorText>
    </Container>
  )
}

InputError.defaultProps = {
  iconComponent: (
    <Fw5Icon name="exclamation-circle" color={MAIN_COLORS.danger} />
  ),
  style: null,
  text: null,
}

InputError.propTypes = {
  iconComponent: PropTypes.element,
  style: ViewPropTypes.style,
  text: PropTypes.string,
}

export default InputError
