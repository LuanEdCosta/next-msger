import styled from 'styled-components/native'
import {
  DEFAULT_FONT_FAMILY,
  MAIN_COLORS,
  FONT_SIZES,
  getBlackRgba,
} from '@/styles'

export const DefaultTextInput = styled.TextInput.attrs({
  placeholderTextColor: getBlackRgba(0.4),
})`
  font-family: ${DEFAULT_FONT_FAMILY};
  color: ${MAIN_COLORS.primaryText};
  font-size: ${FONT_SIZES.FONT_SIZE_2}px;
  padding-left: 12px;
  padding-right: 12px;
`
