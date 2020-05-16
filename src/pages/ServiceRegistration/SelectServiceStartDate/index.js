import React, { useContext, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Select from '@/components/Select'
import Label from '@/components/Label'
import { Fw5IconAccent } from '@/components/Fw5Icon'
import DateTimePicker from '@/components/DateTimePicker/index.android'

import context from '../context'

import { Container } from './styles'

const SelectServiceStartDate = () => {
  const { startDate, setStartDate } = useContext(context)

  const { t } = useTranslation('ServiceRegistration')
  const [isShowingPicker, setIsShowingPicker] = useState(false)

  const onChangeDate = useCallback(
    (_, date) => {
      setIsShowingPicker(false)
      if (date) setStartDate(date)
    },
    [setStartDate],
  )

  return (
    <Container>
      <Select
        value={startDate ? moment(startDate).format('L') : null}
        setValue={setStartDate}
        placeholder={t('startDatePh')}
        onSelect={() => setIsShowingPicker(true)}
        labelComponent={
          <Label
            label={t('startDate')}
            iconComponent={<Fw5IconAccent name="calendar-day" solid />}
            isRequired
          />
        }
      />

      <DateTimePicker
        isShowing={isShowingPicker}
        maximumDate={moment().toDate()}
        value={moment(startDate || undefined).toDate()}
        onChange={onChangeDate}
        mode="date"
      />
    </Container>
  )
}

export default SelectServiceStartDate
