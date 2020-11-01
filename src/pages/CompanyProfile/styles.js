import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'
import Button from '@/components/Button'
import { PrimaryText, WhiteText } from '@/components/Text'

export const Container = styled.View`
  background: ${MAIN_COLORS.white};
  flex: 1;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const Content = styled.View`
  padding: 16px;
`

export const ImportantInformation = styled.View`
  background: ${MAIN_COLORS.accent};
  padding: 16px 16px 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
`

export const ImportantData = styled.View`
  margin-bottom: 16px;
`

export const ImportantDataLabel = styled(WhiteText)`
  font-size: 11px;
`

export const ImportantDataText = styled(WhiteText)`
  font-weight: bold;
  font-size: 18px;
`

export const GroupTitle = styled(PrimaryText)`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`

export const DataGroup = styled.View`
  margin-bottom: 24px;
`

export const DataItem = styled(ListItem)`
  margin-bottom: 8px;
`

export const DataItemTitle = styled(ListItemText).attrs({
  isTitle: true,
})``

export const DataItemValue = styled(ListItemText)`
  margin-top: 6px;
`

export const EditButton = styled(Button)`
  margin-bottom: 16px;
`
