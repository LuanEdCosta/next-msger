import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import TabBar from '@/components/TabBar'

export const Styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
    borderWidth: 0,
  },
})

export const DashboardTabs = styled(TabBar).attrs({
  barStyle: {
    elevation: 0,
  },
})``
