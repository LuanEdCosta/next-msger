/* eslint-disable no-undef */
/* eslint-disable no-console */

import { AppRegistry } from 'react-native'
import App from '@/pages/App'
import { name as appName } from './app.json'

if (__DEV__) {
  console.disableYellowBox = true
}

AppRegistry.registerComponent(appName, () => App)
