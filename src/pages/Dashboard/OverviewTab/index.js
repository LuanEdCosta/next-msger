import React, { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Fw5Icon } from '@/components/Fw5Icon'

import DashboardContext from '../context'

import { Container, DashboardCard, DashboardCardContainer } from './styles'
import useFetchStatistics from './useFetchStatistics'

const OverviewTab = () => {
  const { t } = useTranslation('DashboardOverviewTab')
  const { filterDate } = useContext(DashboardContext)
  const onFetchStatistics = useFetchStatistics()

  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true)
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    const onFetchStatisticsOnMount = async () => {
      try {
        setIsLoadingStatistics(true)
        const fetchedStatistics = await onFetchStatistics(filterDate)
        setStatistics(fetchedStatistics)
      } catch (e) {
        setStatistics({})
      } finally {
        setIsLoadingStatistics(false)
      }
    }

    onFetchStatisticsOnMount()
  }, [filterDate, onFetchStatistics])

  return (
    <Container>
      <DashboardCardContainer>
        <DashboardCard
          title={t('numberOfCustomers')}
          isLoading={isLoadingStatistics}
          value={statistics.numberOfCustomers || 0}
          iconComponent={<Fw5Icon name="user-circle" solid />}
        />
      </DashboardCardContainer>

      <DashboardCardContainer>
        <DashboardCard
          title={t('numberOfServices')}
          isLoading={isLoadingStatistics}
          value={statistics.numberOfServices || 0}
          iconComponent={<Fw5Icon name="file-alt" solid />}
        />
      </DashboardCardContainer>

      <DashboardCardContainer>
        <DashboardCard
          title={t('ratedServices')}
          isLoading={isLoadingStatistics}
          value={statistics.ratedServices || 0}
          iconComponent={<Fw5Icon name="star" solid />}
        />
      </DashboardCardContainer>

      <DashboardCardContainer>
        <DashboardCard
          title={t('servicesWithReturn')}
          isLoading={isLoadingStatistics}
          value={statistics.servicesWithReturn || 0}
          iconComponent={<Fw5Icon name="reply" solid />}
        />
      </DashboardCardContainer>
    </Container>
  )
}

export default OverviewTab
