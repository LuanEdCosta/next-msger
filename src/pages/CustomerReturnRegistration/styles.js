import styled from 'styled-components/native'

import Button from '@/components/Button'
import Input from '@/components/Input'

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

export const ObservationsInput = styled(Input)`
  margin-top: 16px;
`

export const SaveButton = styled(Button)`
  margin-top: 24px;
`
