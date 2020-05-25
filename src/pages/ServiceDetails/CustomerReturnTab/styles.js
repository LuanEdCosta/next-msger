import styled from 'styled-components/native'
import { FlatList } from 'react-native'

import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'

export const Container = styled.View`
  background-color: white;
  flex: 1;
`

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})`
  flex: 1;
`

export const ReturnListItemContainer = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`

export const ReturnListItem = styled(ListItem)`
  flex: 1;
  margin-right: 8px;
`

export const ReturnListItemText = styled(ListItemText)`
  margin: 2px 0;
  padding-right: 8px;
`
