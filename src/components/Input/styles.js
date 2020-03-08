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
  padding-left: 16px;
  height: ${inputHeight};
  justify-content: center;
`

export const AcionContainer = styled.View`
  height: 100%;
`

export const ActionIconTouchable = styled.View`
  height: 100%;
  justify-content: center;
  padding: 0 16px;
`

export const LabelContainer = styled.View`
  margin-bottom: 8px;
`
