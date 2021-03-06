/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable import/no-mutable-exports */

import { createStore, combineReducers } from 'redux'

import User from './reducers/User'
import Company from './reducers/Company'

const Reducers = combineReducers({
  User,
  Company,
})

let Store = null

if (__DEV__) {
  const Reactotron = require('../../reactotron-config').default
  Store = createStore(Reducers, Reactotron.createEnhancer())
} else {
  Store = createStore(Reducers)
}

export default Store
