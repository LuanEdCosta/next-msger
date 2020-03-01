import styled from 'styled-components/native'
import { MAIN_COLORS } from '@/styles'
import { DefaultText } from '../Text'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ErrorText = styled(DefaultText)`
  color: ${MAIN_COLORS.danger};
  margin-left: ${({ hasIcon }) => (hasIcon ? 8 : 0)}px;
`
