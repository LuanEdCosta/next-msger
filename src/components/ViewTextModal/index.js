import React from 'react'
import { Dimensions, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import ReactNativeModal from 'react-native-modal'

import { Fw5Icon } from '@/components/Fw5Icon'

import { Container, Text, Header, Title, CloseButton } from './styles'

const ViewTextModal = (props) => {
  const { style, text, isShowing, onCloseModal, title } = props

  const { width, height } = Dimensions.get('window')

  return (
    <ReactNativeModal
      isVisible={isShowing}
      deviceWidth={width}
      deviceHeight={height}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      backdropOpacity={0.7}
      backdropColor="black"
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen
      useNativeDriver
      hardwareAccelerated
    >
      <Container style={style}>
        <Header>
          <Title numberOfLines={1}>{title}</Title>
          <CloseButton onPress={onCloseModal}>
            <Fw5Icon name="times" />
          </CloseButton>
        </Header>
        <Text>{text}</Text>
      </Container>
    </ReactNativeModal>
  )
}

ViewTextModal.defaultProps = {
  style: null,
  text: '',
  isShowing: false,
  onCloseModal: null,
  title: null,
}

ViewTextModal.propTypes = {
  style: ViewPropTypes.style,
  text: PropTypes.string,
  isShowing: PropTypes.bool,
  onCloseModal: PropTypes.func,
  title: PropTypes.string,
}

export default ViewTextModal
