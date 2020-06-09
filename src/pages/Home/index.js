import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'

import Header from '@/components/Header'
import MessagePanel from '@/components/MessagePanel'
import { MessagePanelIcon, Fw5Icon } from '@/components/Fw5Icon'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'

import HomeActionButtons from './HomeActionButtons'
import useFetchStatistics from './useFetchStatistics'
import {
  Container,
  HomePageContent,
  ActionsTitle,
  StatisticsTitle,
  StatisticsContainer,
  StatisticsItemTextContainer,
  StatisticsItemText,
  StatisticsItemValue,
  StatisticsItemIcon,
  NavigateToDashboardButton,
} from './styles'

const Home = ({ navigation }) => {
  const { t } = useTranslation('Home')
  const onFetchStatistics = useFetchStatistics()

  const [statistics, setStatistics] = useState(null)
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true)

  const onNavigateToDashboard = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.DASHBOARD)
  }, [navigation])

  useEffect(() => {
    const onFetchStatisticsOnMount = async () => {
      try {
        setIsLoadingStatistics(true)
        const fetchedStatistics = await onFetchStatistics()
        setStatistics(fetchedStatistics)
      } catch (e) {
        setStatistics(null)
      } finally {
        setIsLoadingStatistics(false)
      }
    }

    onFetchStatisticsOnMount()
  }, [onFetchStatistics])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="home" />
      <ScrollView>
        <ActionsTitle>{t('homeActionsTitle')}</ActionsTitle>
        <HomeActionButtons />

        <HomePageContent>
          {statistics && !isLoadingStatistics ? (
            <>
              <StatisticsTitle>{t('statisticsTitle')}</StatisticsTitle>

              <StatisticsContainer>
                <StatisticsItemTextContainer>
                  <StatisticsItemIcon name="clipboard-list" />
                  <StatisticsItemText>
                    {t('numOfServicesThisMonth')}
                  </StatisticsItemText>
                </StatisticsItemTextContainer>
                <StatisticsItemValue>
                  {statistics.numberOfServices}
                </StatisticsItemValue>
              </StatisticsContainer>

              <StatisticsContainer>
                <StatisticsItemTextContainer>
                  <StatisticsItemIcon name="users" />
                  <StatisticsItemText>
                    {t('numOfCustomersThisMonth')}
                  </StatisticsItemText>
                </StatisticsItemTextContainer>
                <StatisticsItemValue>
                  {statistics.numberOfCustomers}
                </StatisticsItemValue>
              </StatisticsContainer>

              <NavigateToDashboardButton
                iconComponent={<Fw5Icon name="chart-pie" size={18} />}
                onPress={onNavigateToDashboard}
                text={t('goToDashboard')}
                backgroundColor="white"
                borderColor="secondaryText"
                textColor="secondaryText"
                borderWidth={2}
              />
            </>
          ) : (
            <MessagePanel
              iconComponent={<MessagePanelIcon name="wind" />}
              isLoading={isLoadingStatistics}
              text={t('nothingToShow')}
            />
          )}
        </HomePageContent>
      </ScrollView>
    </Container>
  )
}

export default Home
