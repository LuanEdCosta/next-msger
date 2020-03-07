import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import ListItem from '@/components/ListItem'
import ListItemText from '@/components/ListItem/ListItemText'
import TouchableIcon from '@/components/TouchableIcon'

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
  margin-bottom: 8px;
`

export const DeleteButton = styled(TouchableIcon)`
  margin-left: 8px;
`
