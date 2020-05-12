import { FlatList } from 'react-native-gesture-handler'
import styled from 'styled-components'

import { MAIN_COLORS } from '@/styles'

import Input from '../Input'
import ListItem from '../ListItem'
import ListItemText from '../ListItem/ListItemText'
import MessagePanel from '../MessagePanel'
import { UppercaseBoldText } from '../Text'
import { DefaultTextInput } from '../TextInput'
import TouchableIcon from '../TouchableIcon'

export const Container = styled.View`
  background-color: white;
  flex: 1;
  border-radius: 5;
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
  margin-bottom: 8px;
`

export const ItemText = styled(ListItemText)``
