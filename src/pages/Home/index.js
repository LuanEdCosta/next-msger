import React from 'react'
import Header from '@/components/Header'
import { ScrollView } from 'react-native'
import { Container } from './styles'

const Home = () => {
  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <ScrollView>{}</ScrollView>
    </Container>
  )
}

export default Home
