import React, { useCallback } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { getColor } from '@/helpers'

import { Container, CheckMark, Touchable } from './styles'

const Checkbox = (props) => {
  const {
    style,
    isChecked,
    setIsChecked,
    children,
    disabled,
    checkmarkCheckedColor,
    checkmarkUncheckedColor,
    hasRoundCorners,
    checkmarkIconComponent,
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
          checkmarkCheckedColor={getColor(checkmarkCheckedColor)}
          checkmarkUncheckedColor={getColor(checkmarkUncheckedColor)}
        >
          {!!isChecked && checkmarkIconComponent}
        </CheckMark>

        {children}
      </Touchable>
    </Container>
  )
}

Checkbox.defaultProps = {
  isChecked: false,
  checkmarkCheckedColor: 'accent',
  checkmarkUncheckedColor: 'lightGrey',
  checkmarkIconComponent: null,
  disabled: false,
  children: null,
  hasRoundCorners: false,
  setIsChecked: null,
  style: null,
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  checkmarkCheckedColor: PropTypes.string,
  checkmarkUncheckedColor: PropTypes.string,
  checkmarkIconComponent: PropTypes.element,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  hasRoundCorners: PropTypes.bool,
  setIsChecked: PropTypes.func,
  style: ViewPropTypes.style,
}

export default Checkbox
