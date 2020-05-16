import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { ButtonIcon } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'
import {
  COLLECTIONS,
  SERVICE_DOC,
  CUSTOMER_DOC,
  SERVICE_TYPE_DOC,
} from '@/config/database'
import { useErrorAlert } from '@/hooks'

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

  const onSave = useCallback(async () => {
    setIsShowingErrors(true)
    if (!isAbleToSave) return
    setIsSaving(true)

    try {
      const { [CUSTOMER_DOC.ID]: customerId } = selectedCustomer
      const { [SERVICE_TYPE_DOC.ID]: serviceTypeId } = selectedServiceType

      const startUtcTimestamp = moment(startDate)
        .utc()
        .valueOf()

      const endUtcTimestamp = moment(endDate)
        .utc()
        .valueOf()

      await firestore()
        .collection(COLLECTIONS.SERVICES)
        .add({
          [SERVICE_DOC.CUSTOMER_ID]: customerId,
          [SERVICE_DOC.SERVICE_TYPE_ID]: serviceTypeId,
          [SERVICE_DOC.START_DATE]: startUtcTimestamp,
          [SERVICE_DOC.END_DATE]: endUtcTimestamp,
          [SERVICE_DOC.CREATED_AT]: firestore.FieldValue.serverTimestamp(),
        })

      onClearForm()
    } catch (e) {
      showErrorAlert()
    } finally {
      setIsSaving(false)
    }
  }, [
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
