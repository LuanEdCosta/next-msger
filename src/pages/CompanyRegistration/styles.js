import styled from 'styled-components/native'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { DefaultText } from '@/components/Text'

export const Container = styled.View`
  flex: 1;
  background: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})``

export const CreateAccountInput = styled(Input)`
  margin-bottom: 16px;
`

export const Explanation = styled(DefaultText)`
  line-height: 20px;
`

export const SaveButton = styled(Button)`
  margin-top: 8px;
  margin-bottom: 16px;
`
