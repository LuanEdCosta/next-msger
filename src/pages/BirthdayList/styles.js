import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import MessagePanel from '@/components/MessagePanel'
import ListItemText from '@/components/ListItem/ListItemText'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const EmptyMessage = styled(MessagePanel)`
  margin: 0 16px;
`

export const BirthdayItem = styled(ListItem)`
  margin: 0 16px 8px 16px;
`

export const BirthdayItemText = styled(ListItemText)`
  margin: 2px 0;
`
