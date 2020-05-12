import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '../Touchable'

import { Container, Content, TextsContainer } from './styles'

const ListItem = (props) => {
  const { style, children, iconComponent, onPress, disabled } = props

  return (
    <Container style={style}>
      <Touchable onPress={onPress} disabled={disabled}>
        <Content>
          <TextsContainer hasIcon={!!iconComponent}>{children}</TextsContainer>
          {iconComponent}
        </Content>
      </Touchable>
    </Container>
  )
}

ListItem.defaultProps = {
  children: null,
  iconComponent: null,
  style: null,
  onPress: null,
  disabled: false,
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  iconComponent: PropTypes.element,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
}

export default ListItem
