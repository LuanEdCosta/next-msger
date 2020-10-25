import styled from 'styled-components/native'

import Label from '@/components/Label'
import DayPicker from '@/components/DayPicker'
import { DefaultText } from '@/components/Text'

export const Container = styled.View`
  margin-bottom: 16px;
`

export const BirthDateLabel = styled(Label)`
  margin: 16px 16px 8px 16px;
`

export const BirthDayPicker = styled(DayPicker).attrs({
  scrollContainerStyle: {
    paddingHorizontal: 16,
  },
})``

export const SelectedBirthDay = styled(DefaultText)`
  margin: 8px 16px 0 16px;
`
