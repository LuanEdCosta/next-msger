import React from 'react'
import { Provider } from 'react-redux'
import StatusBar from '@/components/StatusBar'
import Navigation from '@/config/navigation'
import Store from '@/store'
import '@/locales'
import Global from './Global'
import { Container } from './styles'

const App = () => (
  <Provider store={Store}>
    <Container>
      <Global />
      <StatusBar />
      <Navigation theme="light" />
    </Container>
  </Provider>
)

export default App
