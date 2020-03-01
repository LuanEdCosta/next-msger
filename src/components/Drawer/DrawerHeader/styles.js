import styled from 'styled-components/native'
import { DefaultText, UppercaseBoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  background-color: ${MAIN_COLORS.snowLight};
  justify-content: space-around;
  padding: 24px 16px;
  margin-bottom: 8px;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.snow};
`

export const Title = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.primaryText};
  padding: 4px 0;
`

export const Subtitle = styled(DefaultText)``
