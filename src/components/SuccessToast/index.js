import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Message } from './styles'

const SuccessToast = (props) => {
  const { style, message, iconComponent, isShowing } = props

  return isShowing ? (
    <Container style={style}>
      {iconComponent}
      <Message hasIcon={!!iconComponent} numberOfLines={1}>
        {message}
      </Message>
    </Container>
  ) : null
}

SuccessToast.defaultProps = {
  iconComponent: null,
  isShowing: false,
  message: null,
  style: null,
}

SuccessToast.propTypes = {
  iconComponent: PropTypes.element,
  isShowing: PropTypes.bool,
  message: PropTypes.string,
  style: ViewPropTypes.style,
}

export default SuccessToast
