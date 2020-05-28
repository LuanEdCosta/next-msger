import React, { useContext } from 'react'
import moment from 'moment'

import { Fw5IconAccent, ButtonIcon } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import DateTimePicker from '@/components/DateTimePicker'
import { WhiteSpinner } from '@/components/Spinner'
import InputError from '@/components/InputError'
import Select from '@/components/Select'
import Header from '@/components/Header'
import Label from '@/components/Label'

import {
  Container,
  Scroll,
  SelectHour,
  ObservationsInput,
  SaveButton,
} from './styles'
import withCustomerReturnProvider from './withCustomerReturnProvider'
import CustomerReturnContext from './context'
import useSaveCustomerReturn from './useSaveCustomerReturn'
import SelectReason from './SelectReason'

const CustomerReturnRegistration = withCustomerReturnProvider(() => {
  const {
    isEditing,
    t,

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
    isSaving,

    onChangeDate,
    onChangeHour,
  } = useContext(CustomerReturnContext)

  const onSaveCustomerReturn = useSaveCustomerReturn()

  return (
    <Container>
      <Header
        i18Namespace="CustomerReturnRegistration"
        i18Title={isEditing ? 'pageTitleWhenEditing' : 'pageTitle'}
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
        <SelectReason />

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
              iconComponent={<Fw5IconAccent name="clock" solid />}
            />
          }
        />

        <ObservationsInput
          labelComponent={
            <Label
              label={t('observationsLabel')}
              iconComponent={<Fw5IconAccent name="comment" solid />}
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
          text={t(isEditing ? 'saveButtonWhenEditing' : 'saveButton')}
          onPress={onSaveCustomerReturn}
          iconComponent={
            isSaving ? (
              <WhiteSpinner />
            ) : (
              <ButtonIcon name={isEditing ? 'pen' : 'check'} />
            )
          }
        />
      </Scroll>
    </Container>
  )
})

CustomerReturnRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default CustomerReturnRegistration
