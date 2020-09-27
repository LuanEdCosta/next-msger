import styled from 'styled-components'

import { PrimaryText } from '@/components/Text'

export const Container = styled.View`
  overflow: hidden;
`

export const TouchableContainer = styled.View`
  height: 56px;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
`

export const Text = styled(PrimaryText)`
  margin-left: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
`
