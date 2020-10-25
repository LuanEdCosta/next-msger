import React, { memo } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '@/components/Touchable'

import { Container, Content, Text } from './styles'

const DayPickerItem = (props) => {
  const { style, dayName, onPress, isSelected } = props

  return (
    <Container style={style} isSelected={isSelected}>
      <Touchable onPress={onPress}>
        <Content>
          <Text isSelected={isSelected}>{dayName}</Text>
        </Content>
      </Touchable>
    </Container>
  )
}

DayPickerItem.defaultProps = {
  style: null,
}

DayPickerItem.propTypes = {
  dayName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
}

export default memo(DayPickerItem)
