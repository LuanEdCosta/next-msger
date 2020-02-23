import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export default (actionCreator) => {
  const dispatch = useDispatch()

  return useCallback((payload) => dispatch(actionCreator(payload)), [
    dispatch,
    actionCreator,
  ])
}
