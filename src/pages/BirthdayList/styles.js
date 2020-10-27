import styled from 'styled-components/native'

import Badge from '@/components/Badge'
import ListItem from '@/components/ListItem'
import MessagePanel from '@/components/MessagePanel'
import { AccentSpinner } from '@/components/Spinner'
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

export const FooterSpinner = styled(AccentSpinner)`
  margin: 8px 0 16px 0;
`

export const BadgeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 4px;
`

export const ItemBadge = styled(Badge).attrs({
  textStyle: {
    fontSize: 11,
  },
})`
  margin: 0 4px 4px 0;
`
