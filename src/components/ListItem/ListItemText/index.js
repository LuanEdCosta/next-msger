import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text, Title } from './styles'

const ListItemText = (props) => {
  const { style, children, text, isTitle, numberOfLines } = props

  return (
    <Container style={style}>
      {children}
      <Text
        as={isTitle ? Title : Text}
        hasIcon={!!children}
        numberOfLines={numberOfLines}
      >
        {text}
      </Text>
    </Container>
  )
}

ListItemText.defaultProps = {
  children: null,
  isTitle: false,
  numberOfLines: undefined,
  style: null,
  text: null,
}

ListItemText.propTypes = {
  children: PropTypes.element,
  isTitle: PropTypes.bool,
  numberOfLines: PropTypes.number,
  style: ViewPropTypes.style,
  text: PropTypes.string,
}

export default ListItemText
