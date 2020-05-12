import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  RequiredText,
  LabelText,
  DescriptionText,
  IconContainer,
} from './styles'

const Label = (props) => {
  const { requiredText, iconComponent, label, description, isRequired } = props

  return (
    <Container>
      {!!isRequired && !!requiredText && (
        <RequiredText numberOfLines={1}>{requiredText}</RequiredText>
      )}

      {!!iconComponent && <IconContainer>{iconComponent}</IconContainer>}
      <LabelText numberOfLines={1}>{label}</LabelText>
      <DescriptionText numberOfLines={1}>{description}</DescriptionText>
    </Container>
  )
}

Label.defaultProps = {
  description: null,
  iconComponent: null,
  isRequired: false,
  label: null,
  requiredText: '*',
}

Label.propTypes = {
  description: PropTypes.string,
  iconComponent: PropTypes.element,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  requiredText: PropTypes.string,
}

export default Label
