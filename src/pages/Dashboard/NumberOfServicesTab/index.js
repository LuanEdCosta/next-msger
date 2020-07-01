import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useTranslation } from 'react-i18next'

import { MAIN_COLORS } from '@/styles'
import { useEffectWhenMount } from '@/hooks'
import { DefaultRefreshControl } from '@/components/RefreshControl'
import { Fw5IconAccent } from '@/components/Fw5Icon'

import { Scroll, Content, TitleContainer, Title, Styles } from './styles'
import useFetchNumberOfServices from './useFetchNumberOfServices'

const NumberOfServicesTab = () => {
  const { t } = useTranslation('DashboardNumberOfServicesTab')
  const { width } = Dimensions.get('window')

  const [isFetchingChartData, setIsFetchingChartData] = useState(false)
  const [chartData, setChartData] = useState(null)

  const onFetchNumberOfServices = useFetchNumberOfServices(
    setChartData,
    setIsFetchingChartData,
  )

  useEffectWhenMount(onFetchNumberOfServices)

  return (
    <Scroll
      refreshControl={
        <DefaultRefreshControl
          refreshing={isFetchingChartData}
          onRefresh={onFetchNumberOfServices}
        />
      }
    >
      {!!chartData && (
        <Content>
          <TitleContainer>
            <Fw5IconAccent name="clipboard-list" solid />
            <Title>{t('chartTitle')}</Title>
          </TitleContainer>

          <BarChart
            style={Styles.chart}
            data={chartData}
            width={width - 64}
            height={300}
            fromZero
            showBarTops={false}
            chartConfig={{
              backgroundGradientFrom: MAIN_COLORS.white,
              backgroundGradientTo: MAIN_COLORS.white,
              color: () => MAIN_COLORS.accent,
              labelColor: () => MAIN_COLORS.primaryText,
              fillShadowGradientOpacity: 1,
              propsForLabels: {
                fontSize: 12,
              },
            }}
          />
        </Content>
      )}
    </Scroll>
  )
}

export default NumberOfServicesTab
