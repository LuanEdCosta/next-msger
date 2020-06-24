import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '@/components/Touchable'

import {
  Container,
  Title,
  TitleContainer,
  Text,
  TouchableContent,
  Content,
} from './styles'

const DetailItem = (props) => {
  const {
    style,
    title,
    text,
    titleIconComponent,
    rightIconComponent,
    onPress,
    disabled,
  } = props

  return (
    <Container style={style}>
      <Touchable onPress={onPress} disabled={disabled}>
        <TouchableContent>
          <Content hasIcon={rightIconComponent}>
            <TitleContainer>
              {titleIconComponent}
              <Title hasIcon={!!titleIconComponent}>{title}</Title>
            </TitleContainer>

            {!!text && <Text>{text}</Text>}
          </Content>

          {rightIconComponent}
        </TouchableContent>
      </Touchable>
    </Container>
  )
}

DetailItem.defaultProps = {
  disabled: false,
  onPress: null,
  rightIconComponent: null,
  style: null,
  text: null,
  title: null,
  titleIconComponent: null,
}

DetailItem.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  rightIconComponent: PropTypes.element,
  style: ViewPropTypes.style,
  text: PropTypes.string,
  title: PropTypes.string,
  titleIconComponent: PropTypes.element,
}

export default DetailItem
