import { SET_COMPANY_DATA, DELETE_COMPANY_DATA } from '../actionTypes'

const initialState = {}

const CompanyReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_COMPANY_DATA: {
      if (!payload) return state
      if (!state) return { ...payload }
      return { ...state, ...payload }
    }

    case DELETE_COMPANY_DATA:
      return initialState

    default:
      return state
  }
}

export default CompanyReducer
