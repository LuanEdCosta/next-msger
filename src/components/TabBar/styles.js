import { StyleSheet } from 'react-native'

import { DEFAULT_FONT_FAMILY, FONT_SIZES, MAIN_COLORS } from '@/styles'

export default StyleSheet.create({
  barStyle: {
    backgroundColor: MAIN_COLORS.white,
  },
  tabStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  labelStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: FONT_SIZES.DEFAULT_TEXT,
  },
  indicatorStyle: {
    backgroundColor: MAIN_COLORS.accent,
  },
  iconStyle: {
    justifyContent: 'center',
  },
})
