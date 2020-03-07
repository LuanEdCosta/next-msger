import { SET_USER_DATA, DELETE_USER_DATA } from '../actionTypes'

const initialState = {}

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_DATA: {
      if (!payload) return state
      if (!state) return { ...payload }
      return { ...state, ...payload }
    }

    case DELETE_USER_DATA:
      return initialState

    default:
      return state
  }
}

export default UserReducer
