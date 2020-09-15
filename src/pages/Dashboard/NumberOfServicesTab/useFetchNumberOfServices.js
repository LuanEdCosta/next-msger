import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { COLLECTIONS, SERVICE_DOC, SERVICE_TYPE_DOC } from '@/config/database'
import { useUserData } from '@/hooks'

export default (setChartData, setIsFetchingChartData, filterDate) => {
  const { companyId } = useUserData()

  const onFetchNumberOfServices = useCallback(async () => {
    try {
      setIsFetchingChartData(true)

      const filterTimestamp = moment(filterDate).utc().toDate()

      // -----------------------------------------------------------------------

      const services = await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .where(SERVICE_DOC.CREATED_AT, '>=', filterTimestamp)
        .get()

      const serviceTypes = await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICE_TYPES)
        .get()

      // -----------------------------------------------------------------------

      const labels = serviceTypes.docs.map((documentSnapshot) => {
        const serviceType = documentSnapshot.data() || {}
        return serviceType[SERVICE_TYPE_DOC.NAME]
      })

      const data = serviceTypes.docs.map((serviceTypeDocument) => {
        const servicesOfThisType = services.docs.filter((serviceDocument) => {
          const service = serviceDocument.data() || {}
          const type = service[SERVICE_DOC.SERVICE_TYPE]
          const typeId = type[SERVICE_TYPE_DOC.ID]
          return typeId === serviceTypeDocument.id
        })

        return servicesOfThisType.length
      }, [])

      // -----------------------------------------------------------------------

      setChartData({
        labels,
        datasets: [{ data }],
      })
    } catch (e) {
      setChartData(null)
    } finally {
      setIsFetchingChartData(false)
    }
  }, [companyId, filterDate, setChartData, setIsFetchingChartData])

  return onFetchNumberOfServices
}
