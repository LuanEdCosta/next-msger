import React from 'react'

import Header from '@/components/Header'

import { Container } from './styles'

const ServiceDetails = () => {
  return <Container>{}</Container>
}

ServiceDetails.navigationOptions = () => ({
  header() {
    return (
      <Header
        i18Namespace="ServiceDetails"
        i18Title="pageHeaderTitle"
        isStackPage
      />
    )
  },
})

export default ServiceDetails
