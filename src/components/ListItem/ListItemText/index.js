import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text, Title } from './styles'

const ListItemText = (props) => {
  const { style, children, text, isTitle } = props

  return (
    <Container style={style}>
      {children}
      <Text as={isTitle ? Title : Text} hasIcon={!!children}>
        {text}
      </Text>
    </Container>
  )
}

ListItemText.defaultProps = {
  children: null,
  isTitle: false,
  style: null,
  text: null,
}

ListItemText.propTypes = {
  children: PropTypes.element,
  isTitle: PropTypes.bool,
  style: ViewPropTypes.style,
  text: PropTypes.string,
}

export default ListItemText
