import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Touchable = (props) => {
  return <TouchableOpacity activeOpacity={0.7} {...props} />
}

export default Touchable
