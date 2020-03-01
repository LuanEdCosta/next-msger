import React, { useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import { ScrollView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useTranslation } from 'react-i18next'
import { Container } from './styles'

const NAV_PARAMS = {
  DRAWER_LABEL: 'DRAWER_LABEL',
}

const Home = ({ navigation }) => {
  const { t } = useTranslation('NavigationDrawer')

  const onSeParams = useCallback(() => {
    navigation.setParams({ [NAV_PARAMS.DRAWER_LABEL]: t('home') })
  }, [navigation, t])

  useEffect(onSeParams, [])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <ScrollView>{}</ScrollView>
    </Container>
  )
}

Home.navigationOptions = ({ navigation }) => {
  const drawerLabel = navigation.getParam(NAV_PARAMS.DRAWER_LABEL)

  return {
    drawerLabel,
    drawerIcon({ tintColor }) {
      return <FontAwesome5Icon name="home" color={tintColor} size={20} />
    },
  }
}

export default Home
