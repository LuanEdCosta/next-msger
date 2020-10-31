import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import { ButtonIcon, Fw5Icon } from '@/components/Fw5Icon'
import { getTimePartsFromMilliseconds } from '@/utils'

import {
  Modal,
  Container,
  Header,
  Body,
  Footer,
  CloseButton,
  ConfirmButton,
  Title,
  ItemsContainer,
  TimeValue,
  ClearButton,
} from './styles'

const TimeBuilderModal = (props) => {
  const {
    style,
    containerStyle,
    isVisible,
    setIsVisible,
    onModalHide,
    onConfirm,
    title,
    milliseconds,
    setMilliseconds,
    renderItems,
  } = props

  const { t } = useTranslation(['Common', 'Glossary', 'TimeBuilder'])
  const { width, height } = Dimensions.get('window')

  const handleCloseModal = () => {
    if (setIsVisible) setIsVisible(false)
  }

  const onAddMilliseconds = (numberToAdd) => {
    if (setMilliseconds && numberToAdd) {
      setMilliseconds((currentMilliseconds) => {
        return currentMilliseconds + numberToAdd
      })
    }
  }

  const handleClearValue = () => {
    if (setMilliseconds) setMilliseconds(0)
  }

  const builtTimeText = useMemo(() => {
    if (!milliseconds) return t('Glossary:always')
    const timeParts = getTimePartsFromMilliseconds(milliseconds)
    return t('TimeBuilder:timeTextVerbose', timeParts)
  }, [milliseconds, t])

  return (
    <Modal
      style={style}
      isVisible={isVisible}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      backdropOpacity={0.9}
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
      onModalHide={onModalHide}
      animationInTiming={200}
      animationOutTiming={200}
      deviceHeight={height}
      deviceWidth={width}
      coverScreen
      useNativeDriver
    >
      <Container style={containerStyle}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onPress={handleCloseModal}>
            <Fw5Icon name="times" />
          </CloseButton>
        </Header>

        <Body>
          <ClearButton
            text={t('Glossary:clear')}
            onPress={handleClearValue}
            backgroundColor="snow"
            textColor="secondaryText"
            iconComponent={<Fw5Icon name="eraser" />}
          />

          <TimeValue>{builtTimeText}</TimeValue>

          <ItemsContainer>
            {renderItems ? renderItems(onAddMilliseconds) : null}
          </ItemsContainer>
        </Body>

        <Footer>
          <ConfirmButton
            text={t('ok')}
            onPress={onConfirm}
            iconComponent={<ButtonIcon name="check-circle" />}
          />
        </Footer>
      </Container>
    </Modal>
  )
}

TimeBuilderModal.defaultProps = {
  style: null,
  containerStyle: null,
  isVisible: false,
  setIsVisible: null,
  onModalHide: undefined,
  onConfirm: null,
  milliseconds: 0,
  setMilliseconds: null,
  renderItems: null,
}

TimeBuilderModal.propTypes = {
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  onModalHide: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string.isRequired,
  milliseconds: PropTypes.number,
  setMilliseconds: PropTypes.func,
  renderItems: PropTypes.func,
}

export default TimeBuilderModal
