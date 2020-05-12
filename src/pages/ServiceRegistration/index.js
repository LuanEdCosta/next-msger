import React, { useState } from 'react'

import Header from '@/components/Header'

import ServiceRegistrationContext from './context'
import SelectCustomer from './SelectCustomer'
import SelectServiceEndDate from './SelectServiceEndDate'
import SelectServiceStartDate from './SelectServiceStartDate'
import SelectServiceType from './SelectServiceType'
import { Container, Scroll } from './styles'

const ServiceRegistration = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedServiceType, setSelectedServiceType] = useState(null)

  const [customerList, setCustomerList] = useState([])
  const [serviceTypeList, setServiceTypeList] = useState([])

  return (
    <ServiceRegistrationContext.Provider
      value={{
        selectedCustomer,
        setSelectedCustomer,
        selectedServiceType,
        setSelectedServiceType,

        customerList,
        setCustomerList,
        serviceTypeList,
        setServiceTypeList,
      }}
    >
      <Container>
        <Header
          i18Namespace="NavigationDrawer"
          i18Title="serviceRegistration"
        />

        <Scroll>
          <SelectCustomer />
          <SelectServiceType />
          <SelectServiceStartDate />
          <SelectServiceEndDate />
        </Scroll>
      </Container>
    </ServiceRegistrationContext.Provider>
  )
}

export default ServiceRegistration
