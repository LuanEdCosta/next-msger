import styled from 'styled-components/native'

import { DefaultText, UppercaseBoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  border-bottom-width: 1px;
  border-color: ${MAIN_COLORS.snow};
  overflow: hidden;
`

export const Title = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.primaryText};
  margin-left: ${({ hasIcon }) => (hasIcon ? 8 : 0)}px;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Text = styled(DefaultText)`
  margin-top: 8px;
`

export const TouchableContent = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`

export const Content = styled.View`
  flex: 1;
  margin-right: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
`
