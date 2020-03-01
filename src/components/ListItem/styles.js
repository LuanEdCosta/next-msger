import styled from 'styled-components/native'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  overflow: hidden;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
  background-color: white;
`

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`

export const TextsContainer = styled.View`
  flex: 1;
  padding-right: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
`

export const IconContainer = styled.View`
  padding-left: 16px;
  align-items: center;
  justify-content: center;
`
