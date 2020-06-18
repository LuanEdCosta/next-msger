import React from 'react'

import Header from '@/components/Header'

import { Container, Scroll } from './styles'

const ChangePassword = () => {
  return (
    <Container>
      <Header i18Namespace="ChangePassword" i18Title="pageTitle" isStackPage />
      <Scroll>{null}</Scroll>
    </Container>
  )
}

ChangePassword.navigationOptions = () => ({
  headerShown: false,
})

export default ChangePassword
