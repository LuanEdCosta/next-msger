import { SET_USER_DATA, DELETE_USER_DATA } from '../actionTypes'

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
})

export const deleteUserData = () => ({
  type: DELETE_USER_DATA,
})
