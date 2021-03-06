import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'
import Button from '@/components/Button'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

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

export const ActionsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`

export const EditButton = styled(Button)`
  flex: 1;
  margin-right: 8px;
`

export const DeleteButton = styled(Button)`
  flex: 1;
  margin-left: 8px;
`
