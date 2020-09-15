import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import {
  CUSTOMER_RETURN_DOC,
  SERVICE_DOC,
  RETURN_REASON_DOC,
} from '@/config/database'
import { CUSTOMER_RETURN_REGISTRATION_PARAMS } from '@/config/navigation/RouteParams'
import { useErrorAlert } from '@/hooks'

import CustomerReturnContext from './context'

export default (WrappedComponent) => (props) => {
  const { navigation } = props

  const serviceId = navigation.getParam(SERVICE_DOC.ID)
  const returnIdParam = navigation.getParam(CUSTOMER_RETURN_DOC.ID, undefined)
  const reasonParam = navigation.getParam(CUSTOMER_RETURN_DOC.REASON, null)

  const isEditing = navigation.getParam(
    CUSTOMER_RETURN_REGISTRATION_PARAMS.IS_EDITING,
    false,
  )

  const observationsParam = navigation.getParam(
    CUSTOMER_RETURN_DOC.OBSERVATIONS,
    '',
  )

  const returnDateParam = navigation.getParam(
    CUSTOMER_RETURN_DOC.RETURN_DATE,
    moment(),
  )

  const returnHourParam = navigation.getParam(
    CUSTOMER_RETURN_DOC.RETURN_HOUR,
    moment(),
  )

  // ---------------------------------------------------------------------------

  const { t } = useTranslation(['CustomerReturnRegistration', 'Error'])
  const showAlert = useErrorAlert()

  const [selectedReason, setSelectedReason] = useState(
    reasonParam
      ? {
          [RETURN_REASON_DOC.ID]: reasonParam[RETURN_REASON_DOC.ID],
          [RETURN_REASON_DOC.NAME]: reasonParam[RETURN_REASON_DOC.NAME],
        }
      : null,
  )

  const [observations, setObservations] = useState(observationsParam)
  const [returnDate, setReturnDate] = useState(returnDateParam)
  const [returnHour, setReturnHour] = useState(returnHourParam)
  const [reasonList, setReasonList] = useState([])

  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false)
  const [isShowingHourPicker, setIsShowingHourPicker] = useState(false)
  const [isLoadingReasons, setIsLoadingReasons] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // ---------------------------------------------------------------------------

  const onChangeDate = useCallback(
    (_, date) => {
      setIsShowingDatePicker(false)
      if (date) setReturnDate(date)
    },
    [setReturnDate],
  )

  const onChangeHour = useCallback(
    (_, date) => {
      setIsShowingHourPicker(false)
      if (date) setReturnHour(date)
    },
    [setReturnHour],
  )

  // ---------------------------------------------------------------------------
  return (
    <CustomerReturnContext.Provider
      value={{
        navigation,
        showAlert,
        t,

        serviceId,
        returnIdParam,
        isEditing,
        observationsParam,
        returnDateParam,
        returnHourParam,

        observations,
        setObservations,
        returnDate,
        setReturnDate,
        returnHour,
        setReturnHour,
        isShowingDatePicker,
        setIsShowingDatePicker,
        isShowingHourPicker,
        setIsShowingHourPicker,
        isShowingErrors,
        setIsShowingErrors,
        isSaving,
        setIsSaving,
        selectedReason,
        setSelectedReason,
        reasonList,
        setReasonList,
        isLoadingReasons,
        setIsLoadingReasons,

        onChangeDate,
        onChangeHour,
      }}
    >
      <WrappedComponent {...props} />
    </CustomerReturnContext.Provider>
  )
}
