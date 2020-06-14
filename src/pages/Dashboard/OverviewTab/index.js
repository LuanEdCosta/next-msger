import React from 'react'

import { Fw5Icon } from '@/components/Fw5Icon'

import { Container, DashboardCard } from './styles'

const OverviewTab = () => {
  return (
    <Container>
      <DashboardCard
        iconComponent={<Fw5Icon name="user-circle" />}
        title="Title"
        value="R$ 10,00"
      />

      <DashboardCard
        iconComponent={<Fw5Icon name="user-circle" />}
        title="Title"
        value="R$ 10,00"
      />

      <DashboardCard
        iconComponent={<Fw5Icon name="user-circle" />}
        title="Title"
        value="R$ 10,00"
      />

      <DashboardCard
        iconComponent={<Fw5Icon name="user-circle" />}
        title="Title"
        value="R$ 10,00"
      />
    </Container>
  )
}

export default OverviewTab
