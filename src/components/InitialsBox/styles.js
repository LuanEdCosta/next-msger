import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

import { UppercaseBoldText } from '../Text'

const size = 64

export const Container = styled.View`
  background-color: ${({ color }) => color || MAIN_COLORS.accent};
  border-radius: ${size}px;
  height: ${size}px;
  width: ${size}px;
  border-width: 2px;
  border-color: white;
  justify-content: center;
  align-items: center;
`

export const Initials = styled(UppercaseBoldText)`
  color: ${({ color }) => color || MAIN_COLORS.white};
  font-size: ${({ fontSize }) => fontSize}px;
`
