/* eslint-disable no-undef */
/* eslint-disable no-console */

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from '@/pages/App'
import store from '@/store'
import { name as appName } from './app.json'

if (__DEV__) {
  console.disableYellowBox = true
}

const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
