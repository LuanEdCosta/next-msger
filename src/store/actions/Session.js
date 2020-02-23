import { SESSION_ACTION_TYPES } from '../actionTypes'

const { SET_SESSION_DATA, REMOVE_SESSION_DATA } = SESSION_ACTION_TYPES

export const setSessionData = (payload) => ({
  type: SET_SESSION_DATA,
  payload,
})

export const removeSessionData = () => ({
  type: REMOVE_SESSION_DATA,
})
