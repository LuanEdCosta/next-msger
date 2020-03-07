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
  LabelContainer,
  ErrorContainer,
  TextInputComponent,
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
    showInputIcon,
    showAction,
  } = props

  const onLeftIconPressed = useCallback(() => {
    if (onLeftIconPress) onLeftIconPress()
  }, [onLeftIconPress])

  return (
    <View style={style}>
      {labelComponent && <LabelContainer>{labelComponent}</LabelContainer>}

      <InputContainer>
        {showInputIcon && !!inputIconComponent && (
          <TouchableWithoutFeedback onPress={onLeftIconPressed}>
            <InputIconContainer>{inputIconComponent}</InputIconContainer>
          </TouchableWithoutFeedback>
        )}

        <TextInputComponent>{inputComponent}</TextInputComponent>

        {showAction && !!actionIconComponent && (
          <AcionContainer>
            <Touchable onPress={onActionPress} disabled={actionDisabled}>
              <ActionIconTouchable>{actionIconComponent}</ActionIconTouchable>
            </Touchable>
          </AcionContainer>
        )}
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
  showAction: true,
  showInputIcon: true,
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
  showAction: PropTypes.bool,
  showInputIcon: PropTypes.bool,
  style: ViewPropTypes.style,
}

export default Input
