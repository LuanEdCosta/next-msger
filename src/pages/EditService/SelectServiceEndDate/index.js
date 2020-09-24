import React, { useContext, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Select from '@/components/Select'
import Label from '@/components/Label'
import { Fw5IconAccent } from '@/components/Fw5Icon'
import DateTimePicker from '@/components/DateTimePicker/index.android'
import InputError from '@/components/InputError'

import EditServiceContext from '../context'

import { Container } from './styles'

const SelectServiceEndDate = () => {
  const { endDate, setEndDate, isShowingErrors } = useContext(
    EditServiceContext,
  )

  const { t } = useTranslation('EditService')
  const [isShowingPicker, setIsShowingPicker] = useState(false)

  const onChangeDate = useCallback(
    (_, date) => {
      setIsShowingPicker(false)
      if (date) setEndDate(date)
    },
    [setEndDate],
  )

  return (
    <Container>
      <Select
        value={endDate ? moment(endDate).format('L') : null}
        setValue={setEndDate}
        placeholder={t('endDatePh')}
        onSelect={() => setIsShowingPicker(true)}
        labelComponent={
          <Label
            label={t('endDate')}
            iconComponent={<Fw5IconAccent name="calendar-week" solid />}
            isRequired
          />
        }
        showErrorComponent={isShowingErrors && !endDate}
        errorComponent={<InputError />}
      />

      <DateTimePicker
        isShowing={isShowingPicker}
        maximumDate={moment().toDate()}
        value={moment(endDate || undefined).toDate()}
        onChange={onChangeDate}
        mode="date"
      />
    </Container>
  )
}

export default SelectServiceEndDate
