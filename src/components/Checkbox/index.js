import React, { useCallback } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { getColor } from '@/utils'

import { Container, CheckMark, Touchable } from './styles'

const Checkbox = (props) => {
  const {
    style,
    isChecked,
    setIsChecked,
    children,
    disabled,
    checkMarkCheckedColor,
    checkMarkUncheckedColor,
    hasRoundCorners,
    checkMarkIconComponent,
  } = props

  const onCheck = useCallback(() => {
    if (setIsChecked) setIsChecked(!isChecked)
  }, [isChecked, setIsChecked])

  return (
    <Container style={style}>
      <Touchable activeOpacity={0.7} onPress={onCheck} disabled={!!disabled}>
        <CheckMark
          isChecked={!!isChecked}
          hasRoundCorners={!!hasRoundCorners}
          checkMarkCheckedColor={getColor(checkMarkCheckedColor)}
          checkMarkUncheckedColor={getColor(checkMarkUncheckedColor)}
        >
          {!!isChecked && checkMarkIconComponent}
        </CheckMark>

        {children}
      </Touchable>
    </Container>
  )
}

Checkbox.defaultProps = {
  isChecked: false,
  checkMarkCheckedColor: 'accent',
  checkMarkUncheckedColor: 'lightGrey',
  checkMarkIconComponent: null,
  disabled: false,
  children: null,
  hasRoundCorners: false,
  setIsChecked: null,
  style: null,
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  checkMarkCheckedColor: PropTypes.string,
  checkMarkUncheckedColor: PropTypes.string,
  checkMarkIconComponent: PropTypes.element,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  hasRoundCorners: PropTypes.bool,
  setIsChecked: PropTypes.func,
  style: ViewPropTypes.style,
}

export default Checkbox
