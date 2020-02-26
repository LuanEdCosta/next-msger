import styled from 'styled-components/native'
import { FONT_SIZES } from '@/styles'
import { UppercaseBoldText } from '@/components/Text'
import { getColor } from '@/helpers/StylesHelper'

export const Container = styled.View`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  border-width: ${({ borderWidth }) => borderWidth}px;
  border-color: ${({ borderColor }) => getColor(borderColor)};
  overflow: hidden;
  border-radius: 5px;
  justify-content: center;
  height: 50px;
`

export const ButtonTouchable = styled.View`
  padding: 0 16px;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === 'left' ? 'row-reverse' : 'row'};
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled(UppercaseBoldText)`
  margin: ${({ hasIcon, iconPosition }) => {
    if (!hasIcon) return 0
    return iconPosition === 'left' ? '0 0 0 16px' : '16px'
  }};
  font-size: ${FONT_SIZES.FONT_SIZE_4}px;
  color: ${({ textColor }) => getColor(textColor)};
  ${({ textStyle }) => textStyle}
`