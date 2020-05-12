import styled from 'styled-components/native'

import { DefaultText, UppercaseBoldText } from '@/components/Text'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Text = styled(DefaultText)`
  margin-left: ${({ hasIcon }) => (hasIcon ? 12 : 0)}px;
`

export const Title = styled(UppercaseBoldText)``
