import styled from 'styled-components/native'

import StatisticCard from '@/components/StatisticCard'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})`
  flex: 1;
`

export const DashboardCardContainer = styled.View`
  padding: 4px;
  width: 50%;
`

export const DashboardCard = styled(StatisticCard)``
