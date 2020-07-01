import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import { MAIN_COLORS } from '@/styles'
import { UppercaseBoldText } from '@/components/Text'

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
  border: 1px ${MAIN_COLORS.lightGrey};
`

export const TitleContainer = styled.View`
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.lightGrey};
  flex-direction: row;
  align-items: center;
  padding: 16px;
`

export const Title = styled(UppercaseBoldText)`
  margin-left: 16px;
`

export const Styles = StyleSheet.create({
  chart: {
    padding: 16,
  },
})
