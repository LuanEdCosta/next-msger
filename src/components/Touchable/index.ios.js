import React from 'react'
import { TouchableOpacity } from 'react-native'

const Touchable = (props) => {
  return <TouchableOpacity activeOpacity={0.7} {...props} />
}

export default Touchable
