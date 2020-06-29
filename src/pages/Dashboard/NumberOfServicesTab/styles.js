import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import { MAIN_COLORS } from '@/styles'

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: MAIN_COLORS.snow,
    padding: 16,
  },
})`
  flex: 1;
`

export const Content = styled.View`
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
`

export const Styles = StyleSheet.create({
  chart: {
    padding: 16,
  },
})
