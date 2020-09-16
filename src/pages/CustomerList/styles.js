import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import SearchBar from '@/components/SearchBar'
import ListItemText from '@/components/ListItem/ListItemText'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const CustomerItem = styled(ListItem)`
  margin: 0 16px 8px 16px;
`

export const CustomerItemText = styled(ListItemText)`
  margin: 2px 0;
`

export const Search = styled(SearchBar)`
  margin: 16px;
`
