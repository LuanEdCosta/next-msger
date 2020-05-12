import React from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'

import Header from '@/components/Header'
import MessagePanel from '@/components/MessagePanel'
import { MessagePanelIcon } from '@/components/Fw5Icon'

import { Container, HomePageContent } from './styles'
import HomeActionButtons from './HomeActionButtons'

const Home = () => {
  const { t } = useTranslation('Home')

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <ScrollView>
        <HomeActionButtons />
        <HomePageContent>
          <MessagePanel
            iconComponent={<MessagePanelIcon name="exclamation-circle" />}
            text={t('nothingToShow')}
          />
        </HomePageContent>
      </ScrollView>
    </Container>
  )
}

export default Home
