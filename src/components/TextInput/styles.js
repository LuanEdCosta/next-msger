import styled, { css } from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'

import {
  DEFAULT_FONT_FAMILY,
  MAIN_COLORS,
  FONT_SIZES,
  getBlackRgba,
} from '@/styles'

const inputCss = css`
  font-family: ${DEFAULT_FONT_FAMILY};
  color: ${MAIN_COLORS.primaryText};
  font-size: ${FONT_SIZES.FONT_SIZE_2}px;
  padding-left: 16px;
  padding-right: 16px;
`

export const DefaultTextInput = styled.TextInput.attrs({
  placeholderTextColor: getBlackRgba(0.4),
})`
  ${inputCss}
`

export const DefaultTextInputMask = styled(TextInputMask).attrs({
  placeholderTextColor: getBlackRgba(0.4),
})`
  ${inputCss}
`
