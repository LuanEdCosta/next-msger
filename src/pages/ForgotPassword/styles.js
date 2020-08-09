import styled from 'styled-components/native'

import Input from '@/components/Input'
import Button from '@/components/Button'
import { DefaultText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.View`
  flex: 1;
  background: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const Explanation = styled(DefaultText)`
  margin-bottom: 16px;
  line-height: 20px;
  background: ${MAIN_COLORS.snow};
  padding: 16px;
`

export const EmailInput = styled(Input)`
  margin: 0 16px 16px 16px;
`

export const SendButton = styled(Button)`
  margin: 0 16px 16px 16px;
`
