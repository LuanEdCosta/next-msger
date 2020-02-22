/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable import/no-mutable-exports */

import { createStore, combineReducers } from 'redux'
import session from './reducers/Session'

const reducers = combineReducers({
  session,
})

let store = null

if (__DEV__) {
  const Reactotron = require('../../reactotron-config').default
  store = createStore(reducers, Reactotron.createEnhancer())
} else {
  store = createStore(reducers)
}

export default store
