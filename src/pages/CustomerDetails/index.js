import React from 'react'
import Header from '@/components/Header'
import { CUSTOMER_DOC } from '@/config/database'
import { Container } from './styles'

const CustomerDetails = () => {
  return <Container>{}</Container>
}

CustomerDetails.navigationOptions = ({ navigation }) => {
  const subtitle = navigation.getParam(CUSTOMER_DOC.NAME)

  return {
    header() {
      return (
        <Header
          i18Namespace="CustomerDetails"
          i18Title="pageTitle"
          subtitle={subtitle}
          isStackPage
        />
      )
    },
  }
}

export default CustomerDetails
