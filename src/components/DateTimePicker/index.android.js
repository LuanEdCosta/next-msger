import React from 'react'
import PropTypes from 'prop-types'
import Picker from '@react-native-community/datetimepicker'
import moment from 'moment'

/**
 * @param {import('@react-native-community/datetimepicker').DatePickerOptions} props
 */
const DateTimePicker = ({ isShowing, ...props }) => {
  if (!isShowing) return null
  return <Picker value={moment().toDate()} {...props} />
}

DateTimePicker.defaultProps = {
  isShowing: false,
}

DateTimePicker.propTypes = {
  isShowing: PropTypes.bool,
}

export default DateTimePicker
