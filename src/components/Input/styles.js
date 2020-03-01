import styled from 'styled-components/native'
import { MAIN_COLORS } from '@/styles'

const inputHeight = '48px'

export const InputContainer = styled.View`
  border: 1px ${MAIN_COLORS.darkGrey};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  height: ${inputHeight};
  overflow: hidden;
`

export const TextInputComponent = styled.View`
  flex: 1;
`

export const InputIconContainer = styled.View`
  padding-left: 12px;
  height: ${inputHeight};
  justify-content: center;
`

export const AcionContainer = styled.View`
  overflow: hidden;
  border-radius: 1000px;
  margin-right: 4px;
`

export const ActionIconTouchable = styled.View`
  padding: 8px;
`

export const LabelContainer = styled.View`
  margin-bottom: 8px;
`

export const ErrorContainer = styled.View`
  margin-top: 8px;
`
