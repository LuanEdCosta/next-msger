import React from 'react'

import Header from '@/components/Header'

import { Container, Scroll } from './styles'

const UserPersonalData = () => {
  return (
    <Container>
      <Header
        i18Namespace="UserPersonalData"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>{null}</Scroll>
    </Container>
  )
}

UserPersonalData.navigationOptions = () => ({
  headerShown: false,
})

export default UserPersonalData
