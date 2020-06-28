import styled from 'styled-components/native'

import { MAIN_COLORS, FONT_SIZES } from '@/styles'
import { DefaultText, UppercaseBoldText } from '@/components/Text'
import { AccentSpinner } from '@/components/Spinner'

export const Container = styled.View`
  border: 1px ${MAIN_COLORS.lightGrey};
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  height: 100px;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${MAIN_COLORS.snowLight};
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.lightGrey};
  padding: 10px;
`

export const Title = styled(DefaultText)`
  margin-left: ${({ hasIcon }) => (hasIcon ? 12 : 0)}px;
`

export const Value = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.accent};
  font-size: ${FONT_SIZES.FONT_SIZE_4}px;
  text-align: center;
  text-align-vertical: center;
  flex: 1;
  padding: 0 10px;
`

export const Spinner = styled(AccentSpinner)`
  flex: 1;
`
