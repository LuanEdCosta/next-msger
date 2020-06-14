import styled from 'styled-components/native'

import StatisticCard from '@/components/StatisticCard'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})`
  flex: 1;
`

export const DashboardCard = styled(StatisticCard)`
  margin: 4px;
  flex: 1 0 47%;
`
