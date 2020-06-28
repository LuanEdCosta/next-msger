import React, { memo } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import DefaultStatusBar from '@/components/StatusBar'

import {
  Modal,
  Scroll,
  Dialog,
  IconContainer,
  ModalTitle,
  DialogTitle,
  DialogMessage,
  ActionContainer,
} from './styles'

const StyledAlertModal = (props) => {
  const {
    style,
    isVisible,
    iconComponent,
    modalTitle,
    dialogTitle,
    dialogMessage,
    children,
    onClose,
    onModalHide,
    dialogBgColor,
    dialogMessageNumOfLines,
  } = props

  return (
    <Modal
      style={style}
      isVisible={isVisible}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      backdropOpacity={0.9}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      animationInTiming={200}
      animationOutTiming={200}
      useNativeDriver
    >
      <Scroll showsVerticalScrollIndicator={false}>
        <DefaultStatusBar backgroundColor="black" barStyle="light-content" />
        <ModalTitle numberOfLines={1}>{modalTitle}</ModalTitle>

        <Dialog bgColor={dialogBgColor}>
          <IconContainer>{iconComponent}</IconContainer>
          <DialogTitle>{dialogTitle}</DialogTitle>

          <DialogMessage numberOfLines={dialogMessageNumOfLines}>
            {dialogMessage}
          </DialogMessage>

          <ActionContainer>{children}</ActionContainer>
        </Dialog>
      </Scroll>
    </Modal>
  )
}

StyledAlertModal.defaultProps = {
  style: null,
  children: null,
  iconComponent: null,
  isVisible: false,
  dialogMessage: null,
  onClose: null,
  onModalHide: undefined,
  modalTitle: null,
  dialogTitle: null,
  dialogBgColor: 'white',
  dialogMessageNumOfLines: 3,
}

StyledAlertModal.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node,
  iconComponent: PropTypes.element,
  isVisible: PropTypes.bool,
  dialogMessage: PropTypes.string,
  onClose: PropTypes.func,
  onModalHide: PropTypes.func,
  modalTitle: PropTypes.string,
  dialogTitle: PropTypes.string,
  dialogBgColor: PropTypes.string,
  dialogMessageNumOfLines: PropTypes.number,
}

export default memo(StyledAlertModal)
