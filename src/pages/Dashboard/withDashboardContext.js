import React, { useState } from 'react'
import moment from 'moment'

import DashboardContext from './context'

export default (DefaultNavigator) => {
  const CustomNavigator = (props) => {
    const [filterDate, setFilterDate] = useState(() => {
      return moment().startOf('month')
    })

    return (
      <DashboardContext.Provider value={{ filterDate, setFilterDate }}>
        <DefaultNavigator {...props} />
      </DashboardContext.Provider>
    )
  }

  CustomNavigator.router = DefaultNavigator.router

  return CustomNavigator
}
