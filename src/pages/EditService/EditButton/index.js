import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { ButtonIcon } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'
import { useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

import EditServiceContext from '../context'

import { EditServiceButton } from './styles'

const EditButton = () => {
  const {
    serviceId,
    isEditing,
    setIsEditing,
    setIsShowingErrors,
    isAbleToEdit,
    onEditSuccess,
    selectedServiceType,
    startDate,
    endDate,
  } = useContext(EditServiceContext)

  const { t } = useTranslation('EditService')
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onEdit = useCallback(async () => {
    setIsShowingErrors(true)
    if (!isAbleToEdit) return
    setIsEditing(true)

    try {
      const startUtcTimestamp = firestore.Timestamp.fromDate(
        moment(startDate).toDate(),
      )

      const endUtcTimestamp = firestore.Timestamp.fromDate(
        moment(endDate).toDate(),
      )

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.START_DATE]: startUtcTimestamp,
          [SERVICE_DOC.END_DATE]: endUtcTimestamp,
          [SERVICE_DOC.SERVICE_TYPE]: selectedServiceType,
        })

      onEditSuccess()
    } catch (e) {
      showErrorAlert()
    } finally {
      setIsEditing(false)
    }
  }, [
    companyId,
    endDate,
    isAbleToEdit,
    onEditSuccess,
    selectedServiceType,
    serviceId,
    setIsEditing,
    setIsShowingErrors,
    showErrorAlert,
    startDate,
  ])

  return (
    <EditServiceButton
      onPress={onEdit}
      text={t('editButton')}
      disabled={isEditing}
      iconComponent={isEditing ? <WhiteSpinner /> : <ButtonIcon name="pen" />}
    />
  )
}

export default EditButton
