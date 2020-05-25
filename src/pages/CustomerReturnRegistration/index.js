import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'

import { Fw5IconAccent, ButtonIcon } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import DateTimePicker from '@/components/DateTimePicker'
import { WhiteSpinner } from '@/components/Spinner'
import InputError from '@/components/InputError'
import Select from '@/components/Select'
import Header from '@/components/Header'
import { useErrorAlert } from '@/hooks'
import Label from '@/components/Label'
import {
  SERVICE_DOC,
  COLLECTIONS,
  CUSTOMER_RETURN_DOC,
} from '@/config/database'

import {
  Container,
  Scroll,
  SelectHour,
  ObservationsInput,
  SaveButton,
} from './styles'

const CustomerReturnRegistration = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)
  const { t } = useTranslation(['CustomerReturnRegistration', 'Error'])
  const showAlert = useErrorAlert()

  const [observations, setObservations] = useState('')
  const [returnDate, setReturnDate] = useState(moment())
  const [returnHour, setReturnHour] = useState(moment())

  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false)
  const [isShowingHourPicker, setIsShowingHourPicker] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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

  const onSaveCustomerReturn = useCallback(async () => {
    setIsShowingErrors(true)
    if (!returnDate) return
    setIsSaving(true)

    try {
      const now = firestore.FieldValue.serverTimestamp()

      const returnDateTimestamp = moment(returnDate)
        .utc()
        .valueOf()

      const returnHourTimestamp = moment(returnHour)
        .utc()
        .valueOf()

      await firestore()
        .collection(COLLECTIONS.CUSTOMER_RETURNS)
        .add({
          [CUSTOMER_RETURN_DOC.REASON]: '',
          [CUSTOMER_RETURN_DOC.CREATED_AT]: now,
          [CUSTOMER_RETURN_DOC.SERVICE_ID]: serviceId,
          [CUSTOMER_RETURN_DOC.OBSERVATIONS]: observations,
          [CUSTOMER_RETURN_DOC.RETURN_DATE]: returnDateTimestamp,
          [CUSTOMER_RETURN_DOC.RETURN_HOUR]: returnHourTimestamp,
        })

      setIsSaving(false)
      navigation.goBack()
    } catch (e) {
      setIsSaving(false)
      showAlert()
    }
  }, [navigation, observations, returnDate, returnHour, serviceId, showAlert])

  return (
    <Container>
      <Header
        i18Namespace="CustomerReturnRegistration"
        i18Title="pageTitle"
        isStackPage
      />

      <DateTimePicker
        isShowing={isShowingDatePicker}
        value={moment(returnDate || undefined).toDate()}
        onChange={onChangeDate}
        mode="date"
      />

      <DateTimePicker
        isShowing={isShowingHourPicker}
        value={moment(returnHour || undefined).toDate()}
        onChange={onChangeHour}
        mode="time"
      />

      <Scroll>
        <Select
          value={returnDate ? moment(returnDate).format('L') : null}
          onSelect={() => setIsShowingDatePicker(true)}
          placeholder={t('returnDatePh')}
          setValue={setReturnDate}
          labelComponent={
            <Label
              label={t('returnDate')}
              iconComponent={<Fw5IconAccent name="calendar-day" solid />}
              isRequired
            />
          }
          errorComponent={
            <InputError
              show={isShowingErrors && !returnDate}
              text={t('Error:emptyField')}
            />
          }
        />

        <SelectHour
          value={returnHour ? moment(returnHour).format('HH:mm') : null}
          onSelect={() => setIsShowingHourPicker(true)}
          placeholder={t('returnHourPh')}
          setValue={setReturnHour}
          labelComponent={
            <Label
              label={t('returnHour')}
              iconComponent={<Fw5IconAccent name="clock" />}
            />
          }
        />

        <ObservationsInput
          labelComponent={
            <Label
              label={t('observationsLabel')}
              iconComponent={<Fw5IconAccent name="envelope" solid />}
              description={t('observationsLength', {
                length: observations.length,
              })}
            />
          }
          inputComponent={
            <DefaultTextInput
              style={{ textAlignVertical: 'top' }}
              placeholder={t('observationsPh')}
              autoCapitalize="sentences"
              onChangeText={setObservations}
              value={observations}
              maxLength={500}
              numberOfLines={5}
              multiline
              autoCorrect
            />
          }
        />

        <SaveButton
          text={t('saveButton')}
          onPress={onSaveCustomerReturn}
          iconComponent={
            isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
          }
        />
      </Scroll>
    </Container>
  )
}

CustomerReturnRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default CustomerReturnRegistration
