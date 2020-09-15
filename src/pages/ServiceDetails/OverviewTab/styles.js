import styled from 'styled-components/native'

import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'
import { UppercaseBoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})`
  flex: 1;
  background-color: white;
`

export const DataGroup = styled.View`
  background-color: white;
  overflow: hidden;
  border-radius: 5px;
  border-color: ${MAIN_COLORS.snow};
  border-width: 2px;
  margin-bottom: 16px;
`

export const DataGroupTitle = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.primaryText};
  font-size: 16px;
  padding: 16px;
  background-color: ${MAIN_COLORS.snow};
  margin-bottom: 8px;
`

export const DataItem = styled(ListItem)`
  border-width: 0px;
  margin-bottom: 4px;
`

export const DataItemTitle = styled(ListItemText).attrs({
  isTitle: true,
})``

export const DataItemText = styled(ListItemText)`
  margin-top: 4px;
`
