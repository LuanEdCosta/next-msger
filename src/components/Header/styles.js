import styled from 'styled-components/native'

import { MAIN_COLORS, FONT_SIZES } from '@/styles'

import TouchableIcon from '../TouchableIcon'
import { DefaultText, UppercaseBoldText } from '../Text'

export const Container = styled.View.attrs(({ hasShadow }) => {
  const shadowStyle = {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  }

  return hasShadow ? shadowStyle : null
})`
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
