import React from 'react'

import Header from '@/components/Header'

import { Container, Scroll } from './styles'

const DashboardFilters = () => {
  return (
    <Container>
      <Header
        i18Namespace="DashboardFilters"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>{null}</Scroll>
    </Container>
  )
}

DashboardFilters.navigationOptions = () => ({
  headerShown: false,
})

export default DashboardFilters
