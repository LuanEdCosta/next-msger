import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

import DayPickerItem from './DayPickerItem'

export const AnotherDay = styled(DayPickerItem)`
  background: ${(props) =>
    props.isSelected ? MAIN_COLORS.accent : MAIN_COLORS.white};
`
