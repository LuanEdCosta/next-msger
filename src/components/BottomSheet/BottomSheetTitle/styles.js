import styled from 'styled-components/native'

import { UppercaseBoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  height: 56px;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  background: ${MAIN_COLORS.snow};
`

export const Text = styled(UppercaseBoldText)`
  margin-left: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
`
