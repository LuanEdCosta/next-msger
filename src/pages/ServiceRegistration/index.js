import React, { useState, useMemo, useCallback } from 'react'
import moment from 'moment'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'

import ServiceRegistrationContext from './context'
import SelectCustomer from './SelectCustomer'
import SelectServiceEndDate from './SelectServiceEndDate'
import SelectServiceStartDate from './SelectServiceStartDate'
import SelectServiceType from './SelectServiceType'
import SaveButton from './SaveButton'
import { Container, Scroll, Content } from './styles'

const ServiceRegistration = () => {
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerList, setCustomerList] = useState([])

  const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(true)
  const [selectedServiceType, setSelectedServiceType] = useState(null)
  const [serviceTypeList, setServiceTypeList] = useState([])

  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())

  const [isSaving, setIsSaving] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)

  const isAbleToSave = useMemo(() => {
    return selectedCustomer && selectedServiceType && startDate && endDate
  }, [endDate, selectedCustomer, selectedServiceType, startDate])

  const onClearForm = useCallback(() => {
    setIsShowingErrors(false)
    setSelectedCustomer(null)
    setSelectedServiceType(null)
    setStartDate(moment())
    setEndDate(moment())
  }, [])

  return (
    <ServiceRegistrationContext.Provider
      value={{
        isAbleToSave,
        onClearForm,

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

        startDate,
        setStartDate,
        endDate,
        setEndDate,

        isSaving,
        setIsSaving,
        isShowingErrors,
        setIsShowingErrors,
      }}
    >
      <Container>
        <Header
          i18Namespace="NavigationDrawer"
          i18Title="serviceRegistration"
        />

        <Scroll>
          <BannerAd
            unitId={ADMOB_BANNER_ID}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />

          <Content>
            <SelectCustomer />
            <SelectServiceType />
            <SelectServiceStartDate />
            <SelectServiceEndDate />
            <SaveButton />
          </Content>
        </Scroll>
      </Container>
    </ServiceRegistrationContext.Provider>
  )
}

export default ServiceRegistration
