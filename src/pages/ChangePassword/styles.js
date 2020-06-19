import styled from 'styled-components/native'

import { DefaultTextInput } from '@/components/TextInput'
import Inp from '@/components/Input'
import Button from '@/components/Button'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})`
  flex: 1;
`

export const Input = styled(Inp)`
  margin-bottom: 16px;
`

export const TextInput = styled(DefaultTextInput)``

export const ChangePasswordButton = styled(Button)`
  margin-bottom: 24px;
`
