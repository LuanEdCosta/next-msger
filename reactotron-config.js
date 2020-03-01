/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import AsyncStorage from '@react-native-community/async-storage'
import { reactotronRedux } from 'reactotron-redux'
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
} from 'reactotron-react-native'

console.tron = Reactotron

const Tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    host: '192.168.0.27',
    port: 9090,
  })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(reactotronRedux())
  .connect()

export default Tron
