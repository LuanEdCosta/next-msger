import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { ButtonIcon } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'
import { useErrorAlert, useUserData } from '@/hooks'
import { COLLECTIONS, SERVICE_DOC } from '@/config/database'

import context from '../context'

import { SaveServiceButton } from './styles'

const SaveButton = () => {
  const {
    isSaving,
    setIsSaving,
    setIsShowingErrors,
    isAbleToSave,
    onClearForm,
    selectedCustomer,
    selectedServiceType,
    startDate,
    endDate,
  } = useContext(context)

  const { t } = useTranslation('ServiceRegistration')
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const onSave = useCallback(async () => {
    setIsShowingErrors(true)
    if (!isAbleToSave) return
    setIsSaving(true)

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
        .add({
          [SERVICE_DOC.START_DATE]: startUtcTimestamp,
          [SERVICE_DOC.END_DATE]: endUtcTimestamp,
          [SERVICE_DOC.CREATED_AT]: firestore.FieldValue.serverTimestamp(),
          [SERVICE_DOC.CUSTOMER]: selectedCustomer,
          [SERVICE_DOC.SERVICE_TYPE]: selectedServiceType,
        })

      onClearForm()
    } catch (e) {
      showErrorAlert()
    } finally {
      setIsSaving(false)
    }
  }, [
    companyId,
    endDate,
    isAbleToSave,
    onClearForm,
    selectedCustomer,
    selectedServiceType,
    setIsSaving,
    setIsShowingErrors,
    showErrorAlert,
    startDate,
  ])

  return (
    <SaveServiceButton
      onPress={onSave}
      text={t('saveButton')}
      disabled={isSaving}
      iconComponent={
        isSaving ? <WhiteSpinner /> : <ButtonIcon name="plus-circle" />
      }
    />
  )
}

export default SaveButton
