import styled from 'styled-components/native'

import { DefaultText } from '@/components/Text'
import { Fw5Icon } from '@/components/Fw5Icon'
import DefTouchable from '@/components/Touchable'
import { MAIN_COLORS } from '@/styles'

export const Touchable = styled(DefTouchable).attrs({
  borderless: false,
})``

export const Container = styled.View`
  overflow: hidden;
  border-bottom-width: 1px;
  border-color: ${MAIN_COLORS.snow};
`

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`

export const Icon = styled(Fw5Icon).attrs(({ small }) => ({
  size: small ? 14 : 20,
}))``

export const Text = styled(DefaultText).attrs({
  numberOfLines: 1,
})`
  padding: 0 24px;
  font-size: 16px;
  flex: 1;
`
