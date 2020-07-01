import styled from 'styled-components/native'

import Button from '@/components/Button'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
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

export const FilterButton = styled(Button)`
  border-radius: 0;
`

export const FilterLabel = styled(Label)`
  margin-bottom: 16px;
`

export const FilterCheckbox = styled(Checkbox)`
  margin-bottom: 16px;
`

export const CheckboxText = styled(DefaultText)`
  margin-left: 16px;
`
