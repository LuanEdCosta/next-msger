import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

import { WhiteText } from '../Text'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${MAIN_COLORS.success};
  padding: 4px 16px;
`

export const Message = styled(WhiteText)`
  margin-left: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
  padding-right: 16px;
`
