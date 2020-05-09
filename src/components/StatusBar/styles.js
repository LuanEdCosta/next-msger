import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { MAIN_COLORS } from '@/styles'

export default styled.StatusBar.attrs({
  backgroundColor: MAIN_COLORS.accent,
  barStyle: Platform.OS === 'ios' ? 'dark-content' : 'light-content',
  translucent: false,
  animated: true,
})``
