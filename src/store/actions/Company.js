import { SET_COMPANY_DATA, DELETE_COMPANY_DATA } from '../actionTypes'

export const setCompanyData = (payload) => ({
  type: SET_COMPANY_DATA,
  payload,
})

export const deleteCompanyData = () => ({
  type: DELETE_COMPANY_DATA,
})
