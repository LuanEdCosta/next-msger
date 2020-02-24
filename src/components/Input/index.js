import React, { useCallback } from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Touchable from '@/components/Touchable'
import {
  InputContainer,
  AcionContainer,
  InputIconContainer,
  ActionIconTouchable,
} from './styles'

const Input = (props) => {
  const {
    style,
    labelComponent,
    errorComponent,
    inputComponent,
    actionIconComponent,
    inputIconComponent,
    onActionPress,
    actionDisabled,
    onLeftIconPress,
  } = props

  const onLeftIconPressed = useCallback(() => {
    if (onLeftIconPress) onLeftIconPress()
  }, [])

  return (
    <View style={style}>
      {labelComponent}

      <InputContainer>
        <InputIconContainer>
          <TouchableWithoutFeedback onPress={onLeftIconPressed}>
            {inputIconComponent}
          </TouchableWithoutFeedback>
        </InputIconContainer>

        {inputComponent}

        <AcionContainer>
          <Touchable onPress={onActionPress} disabled={actionDisabled}>
            <ActionIconTouchable>{actionIconComponent}</ActionIconTouchable>
          </Touchable>
        </AcionContainer>
      </InputContainer>

      {errorComponent}
    </View>
  )
}

Input.defaultProps = {
  actionDisabled: false,
  actionIconComponent: null,
  errorComponent: null,
  inputComponent: null,
  inputIconComponent: null,
  labelComponent: null,
  onActionPress: null,
  onLeftIconPress: null,
  style: null,
}

Input.propTypes = {
  actionDisabled: PropTypes.bool,
  actionIconComponent: PropTypes.element,
  errorComponent: PropTypes.element,
  inputComponent: PropTypes.element,
  inputIconComponent: PropTypes.element,
  labelComponent: PropTypes.element,
  onActionPress: PropTypes.func,
  onLeftIconPress: PropTypes.func,
  style: ViewPropTypes.style,
}

export default Input
