import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import { Container, Title, Subtitle } from './styles'

const DrawerHeader = () => {
  const { email, uid } = firebase.auth().currentUser

  return (
    <Container>
      <Title numberOfLines={1}>{email}</Title>
      <Subtitle numberOfLines={1}>{uid}</Subtitle>
    </Container>
  )
}

export default DrawerHeader
