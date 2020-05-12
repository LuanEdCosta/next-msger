import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

import { UppercaseText } from '../Text'

export const Container = styled.View`
  border-radius: 5px;
  background-color: ${MAIN_COLORS.snow};
  padding: 16px;
`

export const Content = styled.View`
  align-items: center;
`

export const Text = styled(UppercaseText)`
  padding: 8px;
`
