import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import MessagePanel from '@/components/MessagePanel'
import ListItemText from '@/components/ListItem/ListItemText'
import { AccentSpinner } from '@/components/Spinner'

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

export const FooterSpinner = styled(AccentSpinner)`
  margin: 8px 0 16px 0;
`
