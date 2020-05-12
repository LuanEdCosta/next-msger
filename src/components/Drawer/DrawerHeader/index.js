import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import { useSelector } from 'react-redux'

import { USER_DOC } from '@/config/database'

import { Container, Title, Subtitle } from './styles'

const DrawerHeader = () => {
  const { email } = firebase.auth().currentUser || {}
  const { [USER_DOC.NAME]: name } = useSelector(({ User }) => User)

  return (
    <Container>
      <Title numberOfLines={1}>{email}</Title>
      <Subtitle numberOfLines={1}>{name}</Subtitle>
    </Container>
  )
}

export default DrawerHeader
