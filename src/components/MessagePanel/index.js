import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { AccentSpinner } from '../Spinner'

import { Container, Content, Text } from './styles'

const MessagePanel = (props) => {
  const { style, text, iconComponent, isLoading } = props

  return (
    <Container style={style}>
      {isLoading ? (
        <AccentSpinner />
      ) : (
        <Content>
          {iconComponent}
          <Text>{text}</Text>
        </Content>
      )}
    </Container>
  )
}

MessagePanel.defaultProps = {
  iconComponent: null,
  isLoading: false,
  style: null,
  text: null,
}

MessagePanel.propTypes = {
  iconComponent: PropTypes.element,
  isLoading: PropTypes.bool,
  style: ViewPropTypes.style,
  text: PropTypes.string,
}

export default MessagePanel
