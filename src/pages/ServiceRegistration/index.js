import React, { useState } from 'react'
import Header from '@/components/Header'
import { Container, Scroll } from './styles'
import ServiceRegistrationContext from './context'
import SelectCustomer from './SelectCustomer'
import SelectServiceType from './SelectServiceType'
import SelectServiceStartDate from './SelectServiceStartDate'
import SelectServiceEndDate from './SelectServiceEndDate'

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
