import React, { useCallback } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '../Touchable'
import { Fw5Icon } from '../Fw5Icon'

import {
  Container,
  SelectComponent,
  SelectContainer,
  SelectTouchable,
  SelectText,
  ClearButton,
} from './styles'

const Select = (props) => {
  const {
    style,
    initialValue,
    value,
    placeholder,
    onSelect,
    setValue,
    selectDisabled,
    clearButtonDisabled,
    iconComponent,
    labelComponent,
    errorComponent,
    showErrorComponent,
    showLabelComponent,
  } = props

  const onClearData = useCallback(() => {
    setValue(initialValue)
  }, [initialValue, setValue])

  return (
    <Container style={style}>
      {!!showLabelComponent && labelComponent}

      <SelectContainer
        hasLabel={!!showLabelComponent && !!labelComponent}
        hasError={!!showErrorComponent && !!errorComponent}
      >
        <SelectComponent>
          <Touchable onPress={onSelect} disabled={selectDisabled}>
            <SelectTouchable>
              <Fw5Icon name="chevron-circle-right" />
              <SelectText numberOfLines={1}>{value || placeholder}</SelectText>
            </SelectTouchable>
          </Touchable>
        </SelectComponent>

        <ClearButton onPress={onClearData} disabled={clearButtonDisabled}>
          {iconComponent || <Fw5Icon name="trash" />}
        </ClearButton>
      </SelectContainer>

      {!!showErrorComponent && errorComponent}
    </Container>
  )
}

Select.defaultProps = {
  clearButtonDisabled: false,
  errorComponent: null,
  iconComponent: null,
  initialValue: null,
  labelComponent: null,
  onSelect: null,
  placeholder: null,
  selectDisabled: false,
  setValue: null,
  style: null,
  value: null,
  showErrorComponent: false,
  showLabelComponent: true,
}

Select.propTypes = {
  clearButtonDisabled: PropTypes.bool,
  errorComponent: PropTypes.element,
  iconComponent: PropTypes.element,
  // eslint-disable-next-line react/forbid-prop-types
  initialValue: PropTypes.any,
  labelComponent: PropTypes.element,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  selectDisabled: PropTypes.bool,
  setValue: PropTypes.func,
  style: ViewPropTypes.style,
  value: PropTypes.string,
  showErrorComponent: PropTypes.bool,
  showLabelComponent: PropTypes.bool,
}

export default Select
