import React, { useState } from 'react'
import moment from 'moment'

import DashboardContext from './context'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const [filterDateType, setFilterDateType] = useState(2)
    const [filterDate, setFilterDate] = useState(() => {
      return moment().startOf('month')
    })

    return (
      <DashboardContext.Provider
        value={{ filterDate, setFilterDate, filterDateType, setFilterDateType }}
      >
        <DefaultNavigator {...props} />
      </DashboardContext.Provider>
    )
  }

  CustomNavigator.router = DefaultNavigator.router

  return CustomNavigator
}
