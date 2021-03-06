import React, { useCallback } from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Touchable from '@/components/Touchable'

import {
  InputContainer,
  ActionContainer,
  InputIconContainer,
  ActionIconTouchable,
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
    showErrorComponent,
    showLabelComponent,
  } = props

  const onLeftIconPressed = useCallback(() => {
    if (onLeftIconPress) onLeftIconPress()
  }, [onLeftIconPress])

  return (
    <View style={style}>
      {!!showLabelComponent && labelComponent}

      <InputContainer
        hasLabel={!!showLabelComponent && !!labelComponent}
        hasError={!!showErrorComponent && !!errorComponent}
      >
        {!!showInputIcon && !!inputIconComponent && (
          <TouchableWithoutFeedback onPress={onLeftIconPressed}>
            <InputIconContainer>{inputIconComponent}</InputIconContainer>
          </TouchableWithoutFeedback>
        )}

        <TextInputComponent>{inputComponent}</TextInputComponent>

        {!!showAction && !!actionIconComponent && (
          <ActionContainer>
            <Touchable onPress={onActionPress} disabled={actionDisabled}>
              <ActionIconTouchable>{actionIconComponent}</ActionIconTouchable>
            </Touchable>
          </ActionContainer>
        )}
      </InputContainer>

      {!!showErrorComponent && errorComponent}
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
  showErrorComponent: false,
  showLabelComponent: true,
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
  showErrorComponent: PropTypes.bool,
  showLabelComponent: PropTypes.bool,
}

export default Input
