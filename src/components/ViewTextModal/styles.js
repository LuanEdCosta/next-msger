import styled from 'styled-components/native'

import { DefaultText, PrimaryText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'
import TouchableIcon from '@/components/TouchableIcon'

export const Container = styled.View`
  background: ${MAIN_COLORS.white};
  overflow: hidden;
  border-radius: 5px;
  margin: 32px 0;
`

export const Scroll = styled.ScrollView``

export const Text = styled(DefaultText)`
  padding: 24px 16px;
  line-height: 24px;
`

export const Header = styled.View`
  background: ${MAIN_COLORS.snow};
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
`

export const Title = styled(PrimaryText)`
  flex: 1;
  font-size: 18px;
`

export const CloseButton = styled(TouchableIcon)`
  background: rgba(0, 0, 0, 0.1);
`
