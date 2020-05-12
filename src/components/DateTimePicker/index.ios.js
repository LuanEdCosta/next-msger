import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Picker from '@react-native-community/datetimepicker'
import Modal from 'react-native-modal'

import { Container } from './styles'

/**
 * Wrapper para o DateTimePicker da comunidade
 * @param {import('@react-native-community/datetimepicker').DatePickerOptions} props
 */
const DateTimePicker = ({ isShowing, ...props }) => {
  const { onChange, value } = props || {}

  const onCloseModal = useCallback(
    (e) => {
      if (onChange) onChange(e, value)
    },
    [onChange, value],
  )

  return (
    <Modal
      isVisible={isShowing}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.9}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      animationInTiming={200}
      animationOutTiming={200}
      useNativeDriver
    >
      <Container>
        <Picker value={new Date()} {...props} />
      </Container>
    </Modal>
  )
}

DateTimePicker.defaultProps = {
  isShowing: false,
}

DateTimePicker.propTypes = {
  isShowing: PropTypes.bool,
}

export default DateTimePicker
