import styled from 'styled-components/native'

export const Container = styled.View`
  overflow: hidden;
  border-radius: ${({ size }) => size}px;
`
export const TouchableContainer = styled.View`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  align-items: center;
  justify-content: center;
`
