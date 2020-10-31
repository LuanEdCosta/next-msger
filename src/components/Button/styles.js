import styled from 'styled-components/native'

import { getColor } from '@/utils'
import { FONT_SIZES } from '@/styles'
import { UppercaseBoldText } from '@/components/Text'

export const Container = styled.View`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  border-width: ${({ borderWidth }) => borderWidth}px;
  border-color: ${({ borderColor }) => getColor(borderColor)};
  overflow: hidden;
  border-radius: 5px;
  justify-content: center;
`

export const ButtonTouchable = styled.View`
  height: 58px;
  padding: 0 24px;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === 'left' ? 'row-reverse' : 'row'};
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled(UppercaseBoldText)`
  margin: ${({ hasIcon, iconPosition }) => {
    if (!hasIcon) return '0'
    return iconPosition === 'left' ? '0 0 0 16px' : '0 16px 0 0'
  }};
  font-size: ${FONT_SIZES.FONT_SIZE_4}px;
  color: ${({ textColor }) => getColor(textColor)};
  ${({ textStyle }) => textStyle}
`
