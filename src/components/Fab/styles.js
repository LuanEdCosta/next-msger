import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

const fabSize = 56

export const Styles = StyleSheet.create({
  fabShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: fabSize,
    elevation: 8,
    shadowOffset: {
      height: 8,
      width: 8,
    },
  },
})

export const Container = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
  border-radius: ${fabSize}px;
  background-color: ${({ bgColor }) => bgColor};
  z-index: 999;
  overflow: hidden;
`

export const TouchableContent = styled.View`
  height: ${fabSize}px;
  width: ${fabSize}px;
  justify-content: center;
  align-items: center;
`
