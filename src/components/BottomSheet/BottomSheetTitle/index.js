import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Container, Text } from './styles'

const BottomSheetTitle = (props) => {
  const { style, text, children } = props

  return (
    <Container style={style}>
      {children}
      <Text hasIcon={!!children}>{text}</Text>
    </Container>
  )
}

BottomSheetTitle.defaultProps = {
  style: null,
  text: null,
  children: null,
}

BottomSheetTitle.propTypes = {
  style: ViewPropTypes.style,
  text: PropTypes.string,
  children: PropTypes.node,
}

export default BottomSheetTitle
