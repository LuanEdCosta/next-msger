import React, { Suspense, lazy } from 'react'
import StatusBar from '@/components/StatusBar'
import Splash from '@/components/Splash'
import '@/locales'
import { Container } from './styles'

const Navigation = lazy(() => import('@/config/navigation'))

const App = () => (
  <Container>
    <StatusBar />
    <Suspense fallback={<Splash />}>
      <Navigation theme="light" />
    </Suspense>
  </Container>
)

export default App
