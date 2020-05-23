import styled from 'styled-components/native'

import { DefaultText, UppercaseBoldText } from '@/components/Text'
import Button from '@/components/Button'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const Title = styled(UppercaseBoldText)`
  margin: 24px 0 8px 0;
  font-size: 20px;
  color: ${MAIN_COLORS.primaryText};
`

export const Description = styled(DefaultText)`
  margin-bottom: 24px;
`

export const RateButton = styled(Button)`
  margin-bottom: 16px;
`
