import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import { UppercaseText } from '@/components/Text'

export const Container = styled.View`
  overflow: hidden;
  border-radius: 5px;
  margin-right: 8px;

  background: ${(props) =>
    props.isSelected ? MAIN_COLORS.accent : MAIN_COLORS.white};

  border: 1px
    ${(props) =>
      props.isSelected ? MAIN_COLORS.accent : MAIN_COLORS.lightGrey};
`

export const Content = styled.View`
  padding: 10px 16px;
`

export const Text = styled(UppercaseText)`
  color: ${(props) =>
    props.isSelected ? MAIN_COLORS.white : MAIN_COLORS.secondaryText};
`
