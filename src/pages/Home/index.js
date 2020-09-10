import React from 'react'
import { useTranslation } from 'react-i18next'

import Header from '@/components/Header'

import HomeActionButtons from './HomeActionButtons'
import {
  Container,
  Scroll,
  Content,
  WelcomeTitle,
  WelcomeMessage,
} from './styles'

const Home = () => {
  const { t } = useTranslation('Home')

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <Scroll>
        <Content>
          <WelcomeTitle>{t('welcomeTitle')}</WelcomeTitle>
          <WelcomeMessage>{t('welcomeMessage')}</WelcomeMessage>
        </Content>
        <HomeActionButtons />
      </Scroll>
    </Container>
  )
}

export default Home
