import styled from 'styled-components/native'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'

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

export const EditButton = styled(Button)`
  margin-bottom: 8px;
`

export const EditInput = styled(Input)`
  margin-bottom: 8px;
`

export const Error = styled(InputError)`
  margin-bottom: 8px;
`
