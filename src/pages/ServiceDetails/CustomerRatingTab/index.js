import React, { useContext, useMemo } from 'react'

import { SERVICE_DOC } from '@/config/database'

import ServiceDetailsContext from '../ServiceDetailsContext'

import { Container } from './styles'
import UnratedService from './UnratedService'
import RatedService from './RatedService'

const CustomerRatingTab = ({ navigation }) => {
  const { serviceData } = useContext(ServiceDetailsContext)

  const hasRating = useMemo(() => {
    return serviceData && serviceData[SERVICE_DOC.RATING_KEY]
  }, [serviceData])

  return (
    <Container>
      {hasRating ? (
        <RatedService navigation={navigation} />
      ) : (
        <UnratedService navigation={navigation} />
      )}
    </Container>
  )
}

export default CustomerRatingTab
