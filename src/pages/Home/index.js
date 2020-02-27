import React from 'react'
import { View } from 'react-native'
import Button from '@/components/Button'
import { firebase } from '@react-native-firebase/auth'
import { APP_SWITCH_ROUTES } from '@/config/navigation/ScreenRoutes'
import styles from './styles'

const Home = ({ navigation }) => {
  const onLogout = async () => {
    await firebase.auth().signOut()
    navigation.navigate(APP_SWITCH_ROUTES.LOGIN)
  }

  return (
    <View style={{ margin: 16 }}>
      <Button onPress={onLogout} text="Logout" />
    </View>
  )
}

export default Home
