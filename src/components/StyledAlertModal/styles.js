import styled from 'styled-components/native'
import ReactNativeModal from 'react-native-modal'

import { getColor } from '@/helpers'
import { MAIN_COLORS } from '@/styles'

import { DefaultText, UppercaseBoldText } from '../Text'

export const Modal = styled(ReactNativeModal)`
  align-items: center;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    maxWidth: '100%',
    justifyContent: 'center',
    flexGrow: 1,
  },
})`
  flex: 1;
`

export const Dialog = styled.View`
  padding: 24px;
  elevation: 16;
  border-radius: 5px;
  width: 100%;
  background-color: ${({ bgColor }) => getColor(bgColor)};
`

export const IconContainer = styled.View`
  margin-bottom: 24px;
`

export const ModalTitle = styled(UppercaseBoldText)`
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.7);
  align-self: center;
`

export const DialogTitle = styled(UppercaseBoldText)`
  font-size: 24px;
  margin-bottom: 8px;
  color: ${MAIN_COLORS.primaryText};
`

export const DialogMessage = styled(DefaultText)`
  color: ${MAIN_COLORS.secondaryText};
`

export const ActionContainer = styled.View`
  margin-top: 16px;
`
