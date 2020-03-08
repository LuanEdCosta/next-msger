import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'

export const Styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  listHeader: {
    paddingBottom: 16,
  },
})

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const MarketingStepItem = styled(ListItem)`
  margin-bottom: 8px;
`

export const MarketingStepItemText = styled(ListItemText)`
  margin: 2px 0;
`
