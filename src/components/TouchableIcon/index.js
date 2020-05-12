import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '../Touchable'

import { Container, TouchableContainer } from './styles'

const TouchableIcon = (props) => {
  const { style, children, onPress, disabled, size } = props

  return (
    <Container style={style} size={size}>
      <Touchable onPress={onPress} disabled={disabled || !onPress}>
        <TouchableContainer size={size}>{children}</TouchableContainer>
      </Touchable>
    </Container>
  )
}

TouchableIcon.defaultProps = {
  children: null,
  disabled: false,
  onPress: null,
  size: 40,
  style: null,
}

TouchableIcon.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: ViewPropTypes.style,
}

export default TouchableIcon
