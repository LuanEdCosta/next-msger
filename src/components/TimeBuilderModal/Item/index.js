import React from 'react'
import { ViewPropTypes, View } from 'react-native'
import PropTypes from 'prop-types'

import { Container, ItemTouchable, Text } from './styles'

const TimeBuilderItem = (props) => {
  const { style, onPress, disabled, text } = props

  return (
    <Container style={style}>
      <ItemTouchable onPress={onPress} disabled={disabled}>
        <View>
          <Text numberOfLines={1}>{text}</Text>
        </View>
      </ItemTouchable>
    </Container>
  )
}

TimeBuilderItem.defaultProps = {
  style: null,
  onPress: null,
  disabled: false,
  text: null,
}

TimeBuilderItem.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
}

export default TimeBuilderItem
