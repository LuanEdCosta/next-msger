import styled, { css } from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import Select from '@/components/Select'
import Button from '@/components/Button'

export const Container = styled.View`
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.lightGrey};
  padding-bottom: 16px;
`

export const ReasonSelect = styled(Select)``

export const AddNewReturnReason = styled(Button).attrs({
  textStyle: css`
    font-size: 14px;
  `,
})`
  height: 40px;
  align-self: flex-end;
  margin-top: 16px;
`
