import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import SearchBar from '@/components/SearchBar'
import MessagePanel from '@/components/MessagePanel'
import ListItemText from '@/components/ListItem/ListItemText'
import TouchableIcon from '@/components/TouchableIcon'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const ReturnReasonItem = styled(ListItem)`
  flex: 1;
`

export const ReturnReasonItemText = styled(ListItemText)`
  margin: 2px 0;
`

export const Search = styled(SearchBar)`
  margin: 16px;
`

export const EmptyMessage = styled(MessagePanel)`
  margin: 0 16px;
`

export const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 16px 8px 16px;
`

export const DeleteButton = styled(TouchableIcon)`
  margin-left: 8px;
`
