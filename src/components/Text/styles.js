import styled from 'styled-components/native'
import { DEFAULT_FONT_FAMILY, MAIN_COLORS, FONT_SIZES } from '@/styles'

export const DefaultText = styled.Text`
  font-family: ${DEFAULT_FONT_FAMILY};
  color: ${MAIN_COLORS.secondaryText};
  font-size: ${FONT_SIZES.FONT_SIZE_2}px;
`
export const PrimaryText = styled(DefaultText)`
  color: ${MAIN_COLORS.primaryText};
`
export const AccentText = styled(DefaultText)`
  color: ${MAIN_COLORS.accent};
`
export const WhiteText = styled(DefaultText)`
  color: white;
`
export const BoldText = styled(DefaultText)`
  font-weight: bold;
`
export const UppercaseText = styled(DefaultText)`
  text-transform: uppercase;
`
export const UppercaseBoldText = styled(UppercaseText)`
  font-weight: bold;
`
