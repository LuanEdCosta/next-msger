import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { MAIN_COLORS, FONT_SIZES } from '@/styles'
import TouchableIcon from '../TouchableIcon'
import { DefaultText, UppercaseBoldText } from '../Text'

export const Styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  },
})

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background-color: white;
`

export const Action = styled(TouchableIcon)`
  margin-right: 16px;
`

export const TextsContainer = styled.View`
  flex: 1;
`

export const Title = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.primaryText};
  font-size: ${FONT_SIZES.FONT_SIZE_3}px;
`

export const Subtitle = styled(DefaultText)``
