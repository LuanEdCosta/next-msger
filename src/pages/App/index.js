import React from 'react'
import { Provider } from 'react-redux'
import StatusBar from '@/components/StatusBar'
import Navigation from '@/config/navigation'
import store from '@/store'
import '@/locales'
import { Container } from './styles'

const App = () => (
  <Provider store={store}>
    <Container>
      <StatusBar />
      <Navigation theme="light" />
    </Container>
  </Provider>
)

export default App
