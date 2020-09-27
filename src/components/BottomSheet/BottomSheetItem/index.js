import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '@/components/Touchable'

import { Container, Text, TouchableContainer } from './styles'

const BottomSheetItem = (props) => {
  const { onPress, text, children, style, textStyle } = props

  return (
    <Container style={style}>
      <Touchable onPress={onPress} borderless={false}>
        <TouchableContainer>
          {children}
          <Text style={textStyle} hasIcon={!!children}>
            {text}
          </Text>
        </TouchableContainer>
      </Touchable>
    </Container>
  )
}

BottomSheetItem.defaultProps = {
  style: null,
  textStyle: null,
  children: null,
}

BottomSheetItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
}

export default BottomSheetItem
