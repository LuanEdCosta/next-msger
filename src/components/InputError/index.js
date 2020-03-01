import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MAIN_COLORS } from '@/styles'
import { Container, ErrorText } from './styles'
import { Fw5Icon } from '../Fw5Icon'

const InputError = (props) => {
  const { style, text, show, iconComponent } = props
  const { t } = useTranslation('Error')

  if (!show) return null

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
  show: false,
  style: null,
  text: null,
}

InputError.propTypes = {
  iconComponent: PropTypes.element,
  show: PropTypes.bool,
  style: ViewPropTypes.style,
  text: PropTypes.string,
}

export default InputError
