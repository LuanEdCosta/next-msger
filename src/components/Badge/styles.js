import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  background: ${MAIN_COLORS.snow};
  border-radius: 100px;
  padding: 4px 12px;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  margin-left: ${(props) => (props.hasIcon ? 16 : 0)}px;
  font-size: 12px;
`
