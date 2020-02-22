import { SESSION_ACTION_TYPES } from '../actionTypes'

const { SET_SESSION_DATA, REMOVE_SESSION_DATA } = SESSION_ACTION_TYPES

const initialState = null

const SessionReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_SESSION_DATA:
      return state ? { ...state, ...payload } : { ...payload }
    case REMOVE_SESSION_DATA:
      return initialState
    default:
      return state
  }
}

export default SessionReducer
