import ReactNativeModal from 'react-native-modal'
import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import Button from '@/components/Button'
import { PrimaryText } from '@/components/Text'
import TouchableIcon from '@/components/TouchableIcon'

export const Modal = styled(ReactNativeModal)`
  align-items: center;
`

export const Container = styled.View`
  background: ${MAIN_COLORS.white};
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
`

export const Header = styled.View`
  background: ${MAIN_COLORS.snow};
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
`

export const Title = styled(PrimaryText)`
  flex: 1;
  font-size: 18px;
`

export const CloseButton = styled(TouchableIcon)`
  background: rgba(0, 0, 0, 0.1);
`

export const Body = styled.View`
  padding: 16px;
`

export const TimeValue = styled(PrimaryText)`
  padding: 0 4px;
  margin-bottom: 16px;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`

export const ItemsContainer = styled.View``

export const Footer = styled.View`
  padding: 12px 16px;
  border-top-width: 1px;
  border-top-color: ${MAIN_COLORS.snow};
`

export const ConfirmButton = styled(Button)`
  align-self: flex-end;
  height: 48px;
  min-width: 150px;
`

export const ClearButton = styled(Button).attrs({
  textStyle: {
    fontSize: 14,
  },
})`
  align-self: flex-end;
  height: 40px;
  margin: 0 4px 16px 4px;
`
