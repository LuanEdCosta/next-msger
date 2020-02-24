import React from 'react'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { getBlackRgba } from '@/styles'

const Touchable = (props) => {
  const { borderless, onPress, disabled, children } = props

  if (!onPress || disabled) return children

  const background = TouchableNativeFeedback.Ripple(
    getBlackRgba(0.1),
    borderless,
  )

  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      delayPressOut={0}
      background={background}
      {...props}
    />
  )
}

Touchable.defaultProps = {
  borderless: true,
}

Touchable.propTypes = {
  ...TouchableNativeFeedback.propTypes,
  borderless: PropTypes.bool,
}

export default Touchable
