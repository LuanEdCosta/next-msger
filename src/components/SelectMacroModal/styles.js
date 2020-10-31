import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'

import { MAIN_COLORS } from '@/styles'
import Input from '@/components/Input'
import Button from '@/components/Button'
import ListItem from '@/components/ListItem'
import MessagePanel from '@/components/MessagePanel'
import { UppercaseBoldText } from '@/components/Text'
import TouchableIcon from '@/components/TouchableIcon'
import { DefaultTextInput } from '@/components/TextInput'
import ListItemText from '@/components/ListItem/ListItemText'

export const Container = styled.View`
  background-color: white;
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px;
  border-color: ${MAIN_COLORS.snow};
  padding: 10px;
`

export const SearchInput = styled(Input)`
  flex: 1;
`

export const TextInput = styled(DefaultTextInput)``

export const CloseButton = styled(TouchableIcon)`
  margin-left: 8px;
`

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingVertical: 16,
  },
})``

export const EmptyMessagePanel = styled(MessagePanel)`
  margin: 0 16px;
`

export const ModalTitle = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.accent};
`

export const Item = styled(ListItem)`
  margin: 0 16px 8px 16px;
`

export const ItemText = styled(ListItemText)``

export const ConfirmButton = styled(Button)`
  border-radius: 0;
`
