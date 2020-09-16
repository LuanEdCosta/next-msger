import React from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'

import HomeActionButtons from './HomeActionButtons'
import {
  Container,
  Scroll,
  Content,
  WelcomeTitle,
  WelcomeMessage,
  AdContainer,
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

        <AdContainer>
          <BannerAd
            unitId={ADMOB_BANNER_ID}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </AdContainer>
      </Scroll>
    </Container>
  )
}

export default Home
