import styled from 'styled-components/native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import { MAIN_COLORS, FONT_SIZES } from '@/styles'

export const Fw5Icon = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.secondaryText,
  size: FONT_SIZES.FONT_SIZE_2,
  ...props,
}))``

export const Fw5IconPrimary = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.primaryText,
  size: FONT_SIZES.FONT_SIZE_2,
  ...props,
}))``

export const Fw5IconAccent = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.accent,
  size: FONT_SIZES.FONT_SIZE_2,
  ...props,
}))``

export const Fw5IconWhite = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.white,
  size: FONT_SIZES.FONT_SIZE_2,
  ...props,
}))``

export const MessagePanelIcon = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.darkGrey,
  size: 50,
  ...props,
}))``

export const ButtonIcon = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.white,
  size: FONT_SIZES.FONT_SIZE_4,
  ...props,
}))``

export const FabIcon = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.white,
  size: FONT_SIZES.FONT_SIZE_5,
  ...props,
}))``

export const CheckboxIcon = styled(FontAwesome5Icon).attrs((props) => ({
  color: MAIN_COLORS.white,
  size: FONT_SIZES.FONT_SIZE_0,
  ...props,
}))``
