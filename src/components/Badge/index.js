import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Container, Text } from './styles'

const Badge = (props) => {
  const { style, textStyle, text, iconComponent } = props

  return (
    <Container style={style}>
      {iconComponent}
      <Text style={textStyle} hasIcon={!!iconComponent}>
        {text}
      </Text>
    </Container>
  )
}

Badge.defaultProps = {
  style: null,
  textStyle: null,
}

Badge.propTypes = {
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
}

export default Badge
