import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '@/components/Touchable'

import { Container, ButtonTouchable, ButtonText } from './styles'

const Button = (props) => {
  const {
    style,
    textStyle,
    text,
    disabled,
    onPress,
    iconComponent,
    backgroundColor,
    textColor,
    borderColor,
    borderWidth,
    iconPosition,
  } = props

  return (
    <Container
      style={style}
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
    >
      <Touchable onPress={onPress} disabled={disabled}>
        <ButtonTouchable iconPosition={iconPosition}>
          <ButtonText
            iconPosition={iconPosition}
            textStyle={textStyle}
            textColor={textColor}
            hasIcon={!!iconComponent}
          >
            {text}
          </ButtonText>
          {iconComponent}
        </ButtonTouchable>
      </Touchable>
    </Container>
  )
}

Button.defaultProps = {
  style: null,
  textStyle: null,
  text: null,
  disabled: false,
  onPress: null,
  iconComponent: null,
  backgroundColor: 'accent',
  textColor: 'white',
  borderColor: 'accent',
  borderWidth: 0,
  iconPosition: 'right',
}

Button.propTypes = {
  style: ViewPropTypes.style,
  textStyle: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  iconComponent: PropTypes.element,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  iconPosition: PropTypes.oneOf(['left', 'right']),
}

export default Button
