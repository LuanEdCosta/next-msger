import styled from 'styled-components/native'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${MAIN_COLORS.accent};
  justify-content: center;
  align-items: center;
`

export const Image = styled.Image`
  height: 170px;
  width: 170px;
`
