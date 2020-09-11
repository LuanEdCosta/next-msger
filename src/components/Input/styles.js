import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

const inputHeight = '48px'

export const InputContainer = styled.View`
  border: 1px ${MAIN_COLORS.darkGrey};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  min-height: ${inputHeight};
  overflow: hidden;
  margin-top: ${({ hasLabel }) => (hasLabel ? 8 : 0)}px;
  margin-bottom: ${({ hasError }) => (hasError ? 8 : 0)}px;
`

export const TextInputComponent = styled.View`
  flex: 1;
`

export const InputIconContainer = styled.View`
  padding-left: 16px;
  min-height: ${inputHeight};
  justify-content: center;
`

export const ActionContainer = styled.View``

export const ActionIconTouchable = styled.View`
  min-height: ${inputHeight};
  justify-content: center;
  padding: 0 16px;
`
