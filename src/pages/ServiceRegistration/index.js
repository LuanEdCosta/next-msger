import React, { useState } from 'react'

import Header from '@/components/Header'

import ServiceRegistrationContext from './context'
import SelectCustomer from './SelectCustomer'
import SelectServiceEndDate from './SelectServiceEndDate'
import SelectServiceStartDate from './SelectServiceStartDate'
import SelectServiceType from './SelectServiceType'
import SaveButton from './SaveButton'
import { Container, Scroll } from './styles'

const ServiceRegistration = () => {
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerList, setCustomerList] = useState([])

  const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(true)
  const [selectedServiceType, setSelectedServiceType] = useState(null)
  const [serviceTypeList, setServiceTypeList] = useState([])

  return (
    <ServiceRegistrationContext.Provider
      value={{
        selectedCustomer,
        setSelectedCustomer,
        customerList,
        setCustomerList,
        isLoadingCustomers,
        setIsLoadingCustomers,

        selectedServiceType,
        setSelectedServiceType,
        serviceTypeList,
        setServiceTypeList,
        isLoadingServiceTypes,
        setIsLoadingServiceTypes,
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
          <SaveButton />
        </Scroll>
      </Container>
    </ServiceRegistrationContext.Provider>
  )
}

export default ServiceRegistration
