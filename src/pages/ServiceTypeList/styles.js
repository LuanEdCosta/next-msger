import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import SearchBar from '@/components/SearchBar'
import MessagePanel from '@/components/MessagePanel'
import TouchableIcon from '@/components/TouchableIcon'
import ListItemText from '@/components/ListItem/ListItemText'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const ServiceTypeItem = styled(ListItem)`
  flex: 1;
`

export const ServiceTypeItemText = styled(ListItemText)`
  margin: 2px 0;
  padding-right: 16px;
`

export const ServiceTypeItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 16px 8px 16px;
`

export const DeleteButton = styled(TouchableIcon)`
  margin-left: 8px;
`

export const Search = styled(SearchBar)`
  margin: 16px;
`

export const EmptyMessage = styled(MessagePanel)`
  margin: 0 16px;
`
