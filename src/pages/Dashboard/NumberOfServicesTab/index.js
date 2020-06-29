import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

import { MAIN_COLORS } from '@/styles'
import { useEffectWhenMount } from '@/hooks'
import { DefaultRefreshControl } from '@/components/RefreshControl'

import { Scroll, Content, Styles } from './styles'
import useFetchNumberOfServices from './useFetchNumberOfServices'

const NumberOfServicesTab = () => {
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
      <Content>
        {!!chartData && (
          <BarChart
            style={Styles.chart}
            data={chartData}
            width={width - 64}
            height={350}
            fromZero
            showValuesOnTopOfBars
            showBarTops={false}
            chartConfig={{
              backgroundGradientFrom: MAIN_COLORS.white,
              backgroundGradientTo: MAIN_COLORS.white,
              color: () => MAIN_COLORS.accent,
              labelColor: () => MAIN_COLORS.primaryText,
              fillShadowGradientOpacity: 1,
              backgroundGradientFromOpacity: 1,
              backgroundGradientToOpacity: 1,
              propsForLabels: {
                fontSize: 12,
              },
            }}
          />
        )}
      </Content>
    </Scroll>
  )
}

export default NumberOfServicesTab
