import React, { Suspense, lazy } from 'react'
import { StatusBar, View } from 'react-native'
import { MAIN_COLORS } from '@/styles'
import Splash from '@/components/Splash'
import '@/locales'
import styles from './styles'

const Navigation = lazy(() => import('@/config/navigation'))

const App = () => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor={MAIN_COLORS.accent}
      barStyle="light-content"
      animated
    />

    <Suspense fallback={<Splash />}>
      <Navigation theme="light" />
    </Suspense>
  </View>
)

export default App
