import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import { DEFAULT_FONT_FAMILY, FONT_SIZES } from '@/styles'

export const Styles = StyleSheet.create({
  labelStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    textTransform: 'capitalize',
    fontSize: FONT_SIZES.FONT_SIZE_3,
    fontWeight: 'normal',
  },
  activeLabelStyle: {
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 0,
  },
})

export const Container = styled.SafeAreaView`
  background-color: white;
`
