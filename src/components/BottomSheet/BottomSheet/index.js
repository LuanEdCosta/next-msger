import React, { useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import RawBottomSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet'
import PropTypes from 'prop-types'

/**
 * @param {RBSheetProps} props
 * @param {Object} ref
 */
const BottomSheet = (props) => {
  const { isShowing, ...bottomSheetProps } = props
  const bottomSheet = useRef(null)

  useEffect(() => {
    if (bottomSheet.current) {
      if (isShowing) bottomSheet.current.open()
      else bottomSheet.current.close()
    }
  }, [isShowing])

  return (
    <RawBottomSheet
      ref={(ref) => {
        bottomSheet.current = ref
      }}
      {...bottomSheetProps}
    >
      {bottomSheetProps.children}
    </RawBottomSheet>
  )
}

BottomSheet.defaultProps = {
  isShowing: false,
}

BottomSheet.propTypes = {
  isShowing: PropTypes.bool,
}

export default BottomSheet
