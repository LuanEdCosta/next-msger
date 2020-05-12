import styled, { css } from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import { DefaultText, UppercaseBoldText } from '@/components/Text'

const rightMargin = css`
  margin-right: 8px;
`

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RequiredText = styled(DefaultText)`
  ${rightMargin}
  color: ${MAIN_COLORS.darkGrey}
`

export const IconContainer = styled.View`
  ${rightMargin}
  min-width: 14px;
`

export const LabelText = styled(UppercaseBoldText)`
  ${rightMargin}
`

export const DescriptionText = styled(DefaultText)`
  color: ${MAIN_COLORS.darkGrey};
  flex: 1;
`
