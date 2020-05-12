import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { useColorGetter } from '@/hooks'
import { MAIN_COLORS } from '@/styles'

import Touchable from '../Touchable'

import { Styles, Container, TouchableContent } from './styles'

const Fab = (props) => {
  const { style, iconComponent, onPress, disabled, hidden, bgColor } = props

  const onGetColor = useColorGetter(MAIN_COLORS.accent)
  if (hidden) return null

  return (
    <Container style={[Styles.fabShadow, style]} bgColor={onGetColor(bgColor)}>
      <Touchable onPress={onPress} disabled={disabled}>
        <TouchableContent>{iconComponent}</TouchableContent>
      </Touchable>
    </Container>
  )
}

Fab.defaultProps = {
  bgColor: null,
  disabled: null,
  hidden: null,
  iconComponent: null,
  onPress: null,
  style: null,
}

Fab.propTypes = {
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  iconComponent: PropTypes.element,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
}

export default Fab
