import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import { Container, Title, Subtitle } from './styles'

const DrawerHeader = () => {
  const { email, displayName } = firebase.auth().currentUser

  return (
    <Container>
      <Title numberOfLines={1}>{email}</Title>
      {!!displayName && <Subtitle numberOfLines={1}>{displayName}</Subtitle>}
    </Container>
  )
}

export default DrawerHeader
