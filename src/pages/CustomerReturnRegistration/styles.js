import styled from 'styled-components/native'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
})`
  flex: 1;
`

export const SelectHour = styled(Select)`
  margin-top: 16px;
`

export const ObservationsInput = styled(Input)`
  margin-top: 24px;
`

export const SaveButton = styled(Button)`
  margin-top: 24px;
`
