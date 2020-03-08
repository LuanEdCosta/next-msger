import React from 'react'
import Header from '@/components/Header'
import { ScrollView } from 'react-native'
import Button from '@/components/Button'
import { firebase } from '@react-native-firebase/auth'
import { APP_SWITCH_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Container } from './styles'

const Home = ({ navigation }) => {
  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <ScrollView>
        {/* THIS IS A PROVISORY SIGN OUT */}
        <Button
          style={{ margin: 16 }}
          text="Sign Out"
          onPress={async () => {
            await firebase.auth().signOut()
            navigation.navigate(APP_SWITCH_ROUTES.LOGIN)
          }}
        />
        {/* THIS IS A PROVISORY SIGN OUT */}
      </ScrollView>
    </Container>
  )
}

export default Home
