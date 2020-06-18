import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Container, Content, Touchable, Icon, Text } from './styles'

const NavigationOption = (props) => {
  const {
    style,
    onPress,
    fw5IconName,
    fw5IconRightName,
    text,
    iconComponent,
    rightIconComponent,
  } = props

  return (
    <Container style={style}>
      <Touchable onPress={onPress}>
        <Content>
          {iconComponent || <Icon name={fw5IconName} solid />}
          <Text>{text}</Text>
          {rightIconComponent || <Icon name={fw5IconRightName} small solid />}
        </Content>
      </Touchable>
    </Container>
  )
}

NavigationOption.defaultProps = {
  fw5IconRightName: 'chevron-right',
  iconComponent: null,
  rightIconComponent: null,
  style: null,
}

NavigationOption.propTypes = {
  fw5IconName: PropTypes.string.isRequired,
  fw5IconRightName: PropTypes.string,
  iconComponent: PropTypes.element,
  onPress: PropTypes.func.isRequired,
  rightIconComponent: PropTypes.element,
  style: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
}

export default NavigationOption
