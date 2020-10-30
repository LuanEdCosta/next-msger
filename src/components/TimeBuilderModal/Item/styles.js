import styled from 'styled-components/native'

import Touchable from '@/components/Touchable'
import { MAIN_COLORS } from '@/styles'
import { DefaultText } from '@/components/Text'

export const Container = styled.View`
  border-radius: 5px;
  overflow: hidden;
  border: 1px ${MAIN_COLORS.lightGrey};
  background: ${MAIN_COLORS.white};
  margin: 4px;
  flex: 1;
`

export const ItemTouchable = styled(Touchable)``

export const Text = styled(DefaultText)`
  padding: 8px 16px;
  font-size: 12px;
`
