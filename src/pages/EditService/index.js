import React, { useState, useMemo, useCallback, useEffect } from 'react'
import moment from 'moment'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { EDIT_SERVICE_PARAMS } from '@/config/navigation/RouteParams'
import { SERVICE_DOC } from '@/config/database'
import { firebaseTimestampToMoment } from '@/utils'

import EditServiceContext from './context'
import SelectServiceEndDate from './SelectServiceEndDate'
import SelectServiceStartDate from './SelectServiceStartDate'
import SelectServiceType from './SelectServiceType'
import EditButton from './EditButton'
import { Container, Scroll, Content } from './styles'

const EditService = ({ navigation }) => {
  const serviceData = navigation.getParam(EDIT_SERVICE_PARAMS.SERVICE_DATA)

  const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState(null)
  const [serviceTypeList, setServiceTypeList] = useState([])

  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())

  const [isEditing, setIsEditing] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)

  useEffect(() => {
    if (serviceData) {
      const momentStartDate = firebaseTimestampToMoment(
        serviceData[SERVICE_DOC.START_DATE],
      )

      const momentEndDate = firebaseTimestampToMoment(
        serviceData[SERVICE_DOC.END_DATE],
      )

      const serviceType = serviceData[SERVICE_DOC.SERVICE_TYPE]

      setSelectedServiceType(serviceType)
      setStartDate(momentStartDate)
      setEndDate(momentEndDate)
    } else {
      navigation.goBack()
    }
  }, [navigation, serviceData])

  const serviceId = useMemo(() => {
    if (!serviceData) return ''
    return serviceData[SERVICE_DOC.ID]
  }, [serviceData])

  const isAbleToEdit = useMemo(() => {
    return selectedServiceType && startDate && endDate
  }, [endDate, selectedServiceType, startDate])

  const onEditSuccess = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <EditServiceContext.Provider
      value={{
        serviceId,
        isAbleToEdit,
        onEditSuccess,

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

        isEditing,
        setIsEditing,
        isShowingErrors,
        setIsShowingErrors,
      }}
    >
      <Container>
        <Header i18Namespace="EditService" i18Title="pageTitle" />

        <Scroll>
          <BannerAd
            unitId={ADMOB_BANNER_ID}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />

          <Content>
            <SelectServiceType />
            <SelectServiceStartDate />
            <SelectServiceEndDate />
            <EditButton />
          </Content>
        </Scroll>
      </Container>
    </EditServiceContext.Provider>
  )
}

EditService.navigationOptions = () => ({
  headerShown: false,
})

export default EditService
