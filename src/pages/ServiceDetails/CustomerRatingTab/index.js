import React from 'react'

import { Container } from './styles'
import UnratedService from './UnratedService'

const CustomerRatingTab = ({ navigation }) => {
  return (
    <Container>
      <UnratedService navigation={navigation} />
    </Container>
  )
}

export default CustomerRatingTab
