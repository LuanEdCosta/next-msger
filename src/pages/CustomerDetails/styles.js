import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'
import Button from '@/components/Button'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView``

export const Content = styled.View`
  padding: 16px;
`

export const DataItem = styled(ListItem)`
  margin-bottom: 16px;
`

export const DataItemTitle = styled(ListItemText).attrs({
  isTitle: true,
})``

export const DataItemValue = styled(ListItemText)`
  margin-top: 6px;
`

export const DeleteButton = styled(Button)`
  margin-bottom: 16px;
`
